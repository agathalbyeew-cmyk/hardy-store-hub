import { STORE_CONFIG } from "@/data/store-config";
import { MessageCircle } from "lucide-react";

export function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${STORE_CONFIG.whatsappNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-5 right-5 z-50 group"
    >
      <span className="absolute inset-0 rounded-full bg-green-500 blur-xl opacity-50 group-hover:opacity-80 transition-opacity animate-glow-pulse" />
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-green-600 text-white shadow-elevated transition-transform group-hover:scale-110">
        <MessageCircle className="h-6 w-6" strokeWidth={2.5} />
      </span>
    </a>
  );
}
