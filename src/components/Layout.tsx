import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { SplashScreen } from "@/components/SplashScreen";
import { OfflineScreen } from "@/components/OfflineScreen";
import { Outlet } from "react-router-dom";

export function Layout() {
  const [splashDone, setSplashDone] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      {!splashDone && <SplashScreen onFinish={() => setSplashDone(true)} />}
      <OfflineScreen />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
