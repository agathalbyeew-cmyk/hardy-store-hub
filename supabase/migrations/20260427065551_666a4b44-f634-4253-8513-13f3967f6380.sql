-- 1. UNIQUE username (case-insensitive)
CREATE UNIQUE INDEX IF NOT EXISTS profiles_username_lower_idx ON public.profiles (lower(username));

-- 2. Storage bucket para avatars
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Avatar images publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatar"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'avatars'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can update their own avatar"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'avatars'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own avatar"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'avatars'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- 3. Pedidos (orders)
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  order_code TEXT NOT NULL,
  total NUMERIC(10,2) NOT NULL DEFAULT 0,
  item_count INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pending',
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  customer_name TEXT,
  whatsapp TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own orders"
ON public.orders FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users create own orders"
ON public.orders FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins view all orders"
ON public.orders FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins update orders"
ON public.orders FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER set_orders_updated_at
BEFORE UPDATE ON public.orders
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX orders_user_id_idx ON public.orders(user_id);
CREATE INDEX orders_status_idx ON public.orders(status);

-- 4. Roleta — prêmios reivindicados
CREATE TABLE public.roulette_claims (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  promo_code TEXT NOT NULL,
  prize_name TEXT NOT NULL,
  prize_image TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, promo_code)
);

ALTER TABLE public.roulette_claims ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own claims"
ON public.roulette_claims FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users create own claims"
ON public.roulette_claims FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins view all claims"
ON public.roulette_claims FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE INDEX roulette_claims_user_idx ON public.roulette_claims(user_id);

-- 5. Cadastros de fornecedor
CREATE TABLE public.supplier_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT NOT NULL,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.supplier_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own supplier requests"
ON public.supplier_requests FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users create own supplier requests"
ON public.supplier_requests FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins view all supplier requests"
ON public.supplier_requests FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins update supplier requests"
ON public.supplier_requests FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- 6. Função pública: stats do usuário (usada pelo perfil público)
CREATE OR REPLACE FUNCTION public.get_user_stats(_user_id UUID)
RETURNS JSON
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_total_orders INT;
  v_total_spent NUMERIC;
  v_supplier_requests INT;
  v_roulette_wins INT;
  v_member_since TIMESTAMPTZ;
BEGIN
  SELECT COALESCE(COUNT(*), 0), COALESCE(SUM(total), 0)
  INTO v_total_orders, v_total_spent
  FROM public.orders
  WHERE user_id = _user_id AND status IN ('paid', 'delivered', 'pending');

  SELECT COALESCE(COUNT(*), 0)
  INTO v_supplier_requests
  FROM public.supplier_requests
  WHERE user_id = _user_id;

  SELECT COALESCE(COUNT(*), 0)
  INTO v_roulette_wins
  FROM public.roulette_claims
  WHERE user_id = _user_id;

  SELECT created_at INTO v_member_since
  FROM public.profiles
  WHERE id = _user_id;

  RETURN json_build_object(
    'total_orders', v_total_orders,
    'total_spent', v_total_spent,
    'supplier_requests', v_supplier_requests,
    'roulette_wins', v_roulette_wins,
    'member_since', v_member_since
  );
END;
$$;