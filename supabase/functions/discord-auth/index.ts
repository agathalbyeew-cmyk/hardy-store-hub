// Discord OAuth callback handler
// Exchanges Discord auth code -> Discord user -> Supabase session
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface DiscordTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  scope: string;
}

interface DiscordUser {
  id: string;
  username: string;
  global_name?: string | null;
  email?: string | null;
  verified?: boolean;
  avatar?: string | null;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const DISCORD_CLIENT_ID = Deno.env.get("DISCORD_CLIENT_ID");
    const DISCORD_CLIENT_SECRET = Deno.env.get("DISCORD_CLIENT_SECRET");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    if (!DISCORD_CLIENT_ID || !DISCORD_CLIENT_SECRET) {
      return new Response(
        JSON.stringify({ error: "Discord credentials not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const body = await req.json().catch(() => ({}));
    const code: string | undefined = body.code;
    const redirectUri: string | undefined = body.redirect_uri;

    if (!code || !redirectUri) {
      return new Response(
        JSON.stringify({ error: "Missing code or redirect_uri" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // 1. Exchange code for Discord access token
    const tokenRes = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: DISCORD_CLIENT_ID,
        client_secret: DISCORD_CLIENT_SECRET,
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
      }),
    });

    if (!tokenRes.ok) {
      const errText = await tokenRes.text();
      console.error("Discord token exchange failed:", errText);
      return new Response(
        JSON.stringify({ error: "Discord token exchange failed", details: errText }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    const tokens = (await tokenRes.json()) as DiscordTokenResponse;

    // 2. Fetch Discord user
    const userRes = await fetch("https://discord.com/api/users/@me", {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });
    if (!userRes.ok) {
      return new Response(
        JSON.stringify({ error: "Failed to fetch Discord user" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    const dUser = (await userRes.json()) as DiscordUser;

    if (!dUser.email) {
      return new Response(
        JSON.stringify({
          error: "Discord account has no email. Please grant the email scope.",
        }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const admin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const avatarUrl = dUser.avatar
      ? `https://cdn.discordapp.com/avatars/${dUser.id}/${dUser.avatar}.png`
      : null;

    const userMeta = {
      username: dUser.username,
      display_name: dUser.global_name ?? dUser.username,
      avatar_url: avatarUrl,
      provider: "discord",
      discord_id: dUser.id,
    };

    // 3. Find existing Supabase user by email
    const { data: existing } = await admin.auth.admin.listUsers();
    let userId: string | undefined = existing?.users?.find(
      (u) => u.email?.toLowerCase() === dUser.email!.toLowerCase(),
    )?.id;

    // 4. Create user if not exists
    if (!userId) {
      const { data: created, error: createErr } = await admin.auth.admin.createUser({
        email: dUser.email,
        email_confirm: true,
        user_metadata: userMeta,
      });
      if (createErr || !created.user) {
        console.error("Create user error:", createErr);
        return new Response(
          JSON.stringify({ error: createErr?.message ?? "Failed to create user" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      userId = created.user.id;
    } else {
      // Update metadata so avatar/username refresh
      await admin.auth.admin.updateUserById(userId, { user_metadata: userMeta });
    }

    // 5. Generate magic link to extract a session for the client
    const { data: link, error: linkErr } = await admin.auth.admin.generateLink({
      type: "magiclink",
      email: dUser.email,
    });
    if (linkErr || !link) {
      console.error("Generate link error:", linkErr);
      return new Response(
        JSON.stringify({ error: linkErr?.message ?? "Failed to generate session" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // The action_link contains a hashed_token we can verify to get a session
    const hashedToken = link.properties?.hashed_token;
    if (!hashedToken) {
      return new Response(
        JSON.stringify({ error: "No hashed_token in generated link" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Verify the OTP server-side to get a real session pair
    const anon = createClient(SUPABASE_URL, Deno.env.get("SUPABASE_PUBLISHABLE_KEY") ?? Deno.env.get("SUPABASE_ANON_KEY") ?? "");
    const { data: verifyData, error: verifyErr } = await anon.auth.verifyOtp({
      type: "magiclink",
      token_hash: hashedToken,
    });
    if (verifyErr || !verifyData.session) {
      console.error("Verify OTP error:", verifyErr);
      return new Response(
        JSON.stringify({ error: verifyErr?.message ?? "Failed to verify session" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    return new Response(
      JSON.stringify({
        access_token: verifyData.session.access_token,
        refresh_token: verifyData.session.refresh_token,
        user: { id: userId, email: dUser.email, username: dUser.username },
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("discord-auth error:", err);
    const msg = err instanceof Error ? err.message : "Unknown error";
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
