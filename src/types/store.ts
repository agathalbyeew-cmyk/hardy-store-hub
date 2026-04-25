export type Rarity =
  | "common"
  | "uncommon"
  | "rare"
  | "legendary"
  | "godly"
  | "ancient"
  | "chroma"
  | "set"
  | "low-set";

export type ProductTag = "promo" | "popular" | "last-units" | "new" | "hot";

export interface Product {
  id: string;
  name: string;
  category: Rarity;
  price: number;
  stock: number;
  image: string; // URL or imported asset
  tag?: ProductTag;
  description?: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  whatsapp: string;
  items: Array<{
    product: Product;
    quantity: number;
    subtotal: number;
  }>;
  total: number;
  date: string;
}

export const RARITY_LABELS: Record<Rarity, string> = {
  common: "Comum",
  uncommon: "Incomum",
  rare: "Raro",
  legendary: "Lendário",
  godly: "Godly",
  ancient: "Ancient",
  chroma: "Chroma",
  set: "Set",
  "low-set": "Low Set",
};

export const RARITY_ORDER: Record<Rarity, number> = {
  common: 1,
  uncommon: 2,
  rare: 3,
  legendary: 4,
  godly: 5,
  ancient: 6,
  chroma: 7,
  set: 8,
  "low-set": 9,
};
