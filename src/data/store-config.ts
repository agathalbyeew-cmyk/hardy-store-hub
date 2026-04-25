/**
 * Configurações da loja — edite aqui informações de contato.
 */
export const STORE_CONFIG = {
  name: "Hardy Store",
  tagline: "Os melhores itens de Murder Mystery 2 com os melhores preços!",
  whatsappNumber: "555192175255", // formato internacional sem +
  whatsappDisplay: "(51) 9217-5255",
  discordUrl: "https://discord.gg/uz5c9QYNzG",
  discordHandle: "discord.gg/uz5c9QYNzG",
} as const;

export const formatBRL = (value: number): string =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export const generateOrderId = (): string => {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `HS-${ts}-${rand}`;
};
