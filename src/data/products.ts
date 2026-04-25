import type { Product } from "@/types/store";

/**
 * 🛒 Hardy Store — Catálogo de Produtos
 *
 * EDITE ESTE ARQUIVO para adicionar, remover ou alterar produtos.
 * Cada produto precisa de um `id` único.
 *
 * Categorias: common | uncommon | rare | legendary | godly | ancient | set
 * Tags opcionais: promo | popular | last-units | new | hot
 *
 * Imagens: pode ser uma URL externa (https://...) ou um arquivo
 * importado de src/assets.
 */
export const PRODUCTS: Product[] = [
  // ==================== GODLYS ====================
  {
    id: "heartblade",
    name: "Heartblade",
    category: "godly",
    price: 249.9,
    stock: 12,
    image: "https://static.wikia.nocookie.net/mm2/images/7/7d/Heartblade.png",
    tag: "new",
    description: "Lâmina lendária com efeito de coração rosa.",
  },
  {
    id: "elderwood-scythe",
    name: "Elderwood Scythe",
    category: "godly",
    price: 189.9,
    stock: 8,
    image: "https://static.wikia.nocookie.net/mm2/images/0/0a/Elderwood_Scythe.png",
    tag: "hot",
  },
  {
    id: "batwing",
    name: "Batwing",
    category: "godly",
    price: 219.9,
    stock: 6,
    image: "https://static.wikia.nocookie.net/mm2/images/3/3e/Batwing.png",
    tag: "hot",
  },
  {
    id: "icebreaker",
    name: "Icebreaker",
    category: "godly",
    price: 139.9,
    stock: 4,
    image: "https://static.wikia.nocookie.net/mm2/images/6/65/Icebreaker.png",
    tag: "promo",
  },
  {
    id: "chroma-seer",
    name: "Chroma Seer",
    category: "godly",
    price: 299.9,
    stock: 3,
    image: "https://static.wikia.nocookie.net/mm2/images/d/d0/Chroma_Seer.png",
    tag: "last-units",
  },
  {
    id: "corrupt",
    name: "Corrupt",
    category: "godly",
    price: 179.9,
    stock: 9,
    image: "https://static.wikia.nocookie.net/mm2/images/9/9e/Corrupt.png",
  },

  // ==================== ANCIENTS ====================
  {
    id: "ancient-eonblade",
    name: "Eonblade",
    category: "ancient",
    price: 449.9,
    stock: 2,
    image: "https://static.wikia.nocookie.net/mm2/images/5/55/Eonblade.png",
    tag: "last-units",
  },
  {
    id: "ancient-celestial",
    name: "Celestial",
    category: "ancient",
    price: 399.9,
    stock: 5,
    image: "https://static.wikia.nocookie.net/mm2/images/d/d3/Celestial.png",
    tag: "popular",
  },

  // ==================== LENDÁRIOS ====================
  {
    id: "sugar",
    name: "Sugar",
    category: "legendary",
    price: 159.9,
    stock: 15,
    image: "https://static.wikia.nocookie.net/mm2/images/c/c0/Sugar.png",
    tag: "new",
  },
  {
    id: "gemstone",
    name: "Gemstone",
    category: "legendary",
    price: 89.9,
    stock: 20,
    image: "https://static.wikia.nocookie.net/mm2/images/f/f8/Gemstone.png",
  },
  {
    id: "luger",
    name: "Luger",
    category: "legendary",
    price: 79.9,
    stock: 18,
    image: "https://static.wikia.nocookie.net/mm2/images/8/8a/Luger.png",
  },
  {
    id: "saw",
    name: "Saw",
    category: "legendary",
    price: 99.9,
    stock: 11,
    image: "https://static.wikia.nocookie.net/mm2/images/c/c8/Saw.png",
  },

  // ==================== RAROS ====================
  {
    id: "candy-cane",
    name: "Candy Cane",
    category: "rare",
    price: 39.9,
    stock: 30,
    image: "https://static.wikia.nocookie.net/mm2/images/9/9e/Candy_Cane.png",
  },
  {
    id: "boneblade",
    name: "Boneblade",
    category: "rare",
    price: 34.9,
    stock: 25,
    image: "https://static.wikia.nocookie.net/mm2/images/2/2f/Boneblade.png",
  },
  {
    id: "logchopper",
    name: "Logchopper",
    category: "rare",
    price: 29.9,
    stock: 40,
    image: "https://static.wikia.nocookie.net/mm2/images/4/45/Logchopper.png",
  },

  // ==================== INCOMUNS ====================
  {
    id: "elder",
    name: "Elder",
    category: "uncommon",
    price: 14.9,
    stock: 50,
    image: "https://static.wikia.nocookie.net/mm2/images/4/4f/Elder.png",
  },
  {
    id: "tides",
    name: "Tides",
    category: "uncommon",
    price: 12.9,
    stock: 45,
    image: "https://static.wikia.nocookie.net/mm2/images/e/e9/Tides.png",
  },

  // ==================== COMUNS ====================
  {
    id: "darkbringer",
    name: "Darkbringer",
    category: "common",
    price: 4.9,
    stock: 100,
    image: "https://static.wikia.nocookie.net/mm2/images/9/9f/Darkbringer.png",
  },
  {
    id: "ghostblade",
    name: "Ghostblade",
    category: "common",
    price: 3.9,
    stock: 100,
    image: "https://static.wikia.nocookie.net/mm2/images/3/35/Ghostblade.png",
  },

  // ==================== SETS ====================
  {
    id: "set-godly-starter",
    name: "Set Godly Starter (3 itens)",
    category: "set",
    price: 499.9,
    stock: 5,
    image: "https://static.wikia.nocookie.net/mm2/images/7/7d/Heartblade.png",
    tag: "promo",
    description: "Heartblade + Sugar + Batwing por um preço especial.",
  },
  {
    id: "set-collector",
    name: "Set Colecionador (5 itens)",
    category: "set",
    price: 899.9,
    stock: 3,
    image: "https://static.wikia.nocookie.net/mm2/images/d/d3/Celestial.png",
    tag: "hot",
    description: "Pacote completo com itens raros e godlys.",
  },
];
