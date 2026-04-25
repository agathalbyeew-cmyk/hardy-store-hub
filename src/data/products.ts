import type { Product } from "@/types/store";

/**
 * 🛒 Hardy Store — Catálogo de Produtos
 *
 * EDITE ESTE ARQUIVO para adicionar, remover ou alterar produtos.
 * Cada produto precisa de um `id` único.
 *
 * Categorias: common | uncommon | rare | legendary | godly | ancient | chroma | set | low-set
 * Tags opcionais: promo | popular | last-units | new | hot
 */

const img = (name: string) =>
  `https://static.wikia.nocookie.net/mm2/images/0/0a/${name}.png`;

export const PRODUCTS: Product[] = [
  // ========================================================================
  // CHROMAS
  // ========================================================================
  { id: "chroma-lightbringer", name: "Lightbringer C", category: "chroma", price: 6.5, stock: 10, image: "https://static.wikia.nocookie.net/mm2/images/3/3c/Chroma_Lightbringer.png", tag: "hot" },
  { id: "chroma-darkbringer", name: "Darkbringer C", category: "chroma", price: 6.5, stock: 10, image: "https://static.wikia.nocookie.net/mm2/images/9/9f/Chroma_Darkbringer.png", tag: "hot" },
  { id: "chroma-luger", name: "Luger C", category: "chroma", price: 6.5, stock: 10, image: "https://static.wikia.nocookie.net/mm2/images/1/16/Chroma_Luger.png", tag: "popular" },
  { id: "chroma-candleflame", name: "Candleflame C", category: "chroma", price: 5.9, stock: 10, image: "https://static.wikia.nocookie.net/mm2/images/4/41/Chroma_Candleflame.png" },
  { id: "chroma-elderwoodblade", name: "Elderwoodblade C", category: "chroma", price: 5.9, stock: 10, image: "https://static.wikia.nocookie.net/mm2/images/6/6c/Chroma_Elderwood_Blade.png" },
  { id: "chroma-shark", name: "Shark C", category: "chroma", price: 5.9, stock: 10, image: "https://static.wikia.nocookie.net/mm2/images/3/3a/Chroma_Shark.png" },
  { id: "chroma-swirlygun", name: "SwirlyGun C", category: "chroma", price: 5.9, stock: 10, image: "https://static.wikia.nocookie.net/mm2/images/8/82/Chroma_Swirly_Gun.png" },
  { id: "chroma-gemstone", name: "Gemstone C", category: "chroma", price: 4.5, stock: 12, image: "https://static.wikia.nocookie.net/mm2/images/4/49/Chroma_Gemstone.png" },
  { id: "chroma-saw", name: "Saw C", category: "chroma", price: 4.5, stock: 12, image: "https://static.wikia.nocookie.net/mm2/images/0/03/Chroma_Saw.png" },
  { id: "chroma-gingerblade", name: "Gingerblade C", category: "chroma", price: 4.5, stock: 12, image: "https://static.wikia.nocookie.net/mm2/images/8/8c/Chroma_Gingerblade.png" },
  { id: "chroma-cookiecane", name: "Cookiecane C", category: "chroma", price: 4.5, stock: 12, image: "https://static.wikia.nocookie.net/mm2/images/6/6a/Chroma_Cookie_Cane.png" },
  { id: "chroma-deathshard", name: "Deathshard C", category: "chroma", price: 4.5, stock: 12, image: "https://static.wikia.nocookie.net/mm2/images/3/3e/Chroma_Deathshard.png" },
  { id: "chroma-fang", name: "Fang C", category: "chroma", price: 4.5, stock: 12, image: "https://static.wikia.nocookie.net/mm2/images/4/4c/Chroma_Fang.png" },
  { id: "chroma-heat", name: "Heat C", category: "chroma", price: 4.5, stock: 12, image: "https://static.wikia.nocookie.net/mm2/images/d/d8/Chroma_Heat.png" },
  { id: "chroma-slasher", name: "Slasher C", category: "chroma", price: 4.5, stock: 12, image: "https://static.wikia.nocookie.net/mm2/images/2/2a/Chroma_Slasher.png" },
  { id: "chroma-tides", name: "Tides C", category: "chroma", price: 4.5, stock: 12, image: "https://static.wikia.nocookie.net/mm2/images/0/05/Chroma_Tides.png" },
  { id: "chroma-boneblade", name: "Boneblade C", category: "chroma", price: 4.5, stock: 12, image: "https://static.wikia.nocookie.net/mm2/images/2/2f/Chroma_Boneblade.png" },
  { id: "chroma-seer", name: "Seer C", category: "chroma", price: 4.5, stock: 12, image: "https://static.wikia.nocookie.net/mm2/images/d/d0/Chroma_Seer.png" },

  // ========================================================================
  // INCOMUNS (Estoque colecionáveis — limitados)
  // ========================================================================
  { id: "u-blossom", name: "Blossom", category: "uncommon", price: 0.5, stock: 2, image: img("Blossom") },
  { id: "u-floatie", name: "Floatie", category: "uncommon", price: 0.8, stock: 2, image: img("Floatie") },
  { id: "u-jellyfish", name: "Jelly Fish", category: "uncommon", price: 0.5, stock: 1, image: img("Jellyfish") },
  { id: "u-meadow", name: "Meadow", category: "uncommon", price: 0.8, stock: 1, image: img("Meadow") },
  { id: "u-painted", name: "Painted", category: "uncommon", price: 0.8, stock: 1, image: img("Painted") },
  { id: "u-paws", name: "Paws", category: "uncommon", price: 0.5, stock: 1, image: img("Paws") },
  { id: "u-popsicle", name: "Popsicle (arma)", category: "uncommon", price: 0.5, stock: 1, image: img("Popsicle") },
  { id: "u-soda", name: "Soda", category: "uncommon", price: 0.5, stock: 1, image: img("Soda") },
  { id: "u-starry", name: "Starry", category: "uncommon", price: 0.5, stock: 1, image: img("Starry") },
  { id: "u-turtle", name: "Turtle", category: "uncommon", price: 0.5, stock: 1, image: img("Turtle") },
  { id: "u-bluesteel", name: "Bluesteel (arma)", category: "uncommon", price: 0.65, stock: 1, image: img("Bluesteel") },
  { id: "u-future", name: "Future", category: "uncommon", price: 0.65, stock: 1, image: img("Future") },
  { id: "u-hive", name: "Hive", category: "uncommon", price: 0.65, stock: 1, image: img("Hive") },
  { id: "u-lucky", name: "Lucky", category: "uncommon", price: 0.65, stock: 1, image: img("Lucky") },
  { id: "u-red", name: "Red", category: "uncommon", price: 0.65, stock: 1, image: img("Red") },
  { id: "u-blue", name: "Blue", category: "uncommon", price: 0.65, stock: 1, image: img("Blue") },
  { id: "u-gingerbread", name: "Gingerbread (aleatória)", category: "uncommon", price: 1.6, stock: 1, image: img("Gingerbread"), tag: "hot" },
  { id: "u-gingerheart", name: "Gingerheart", category: "uncommon", price: 0.5, stock: 1, image: img("Gingerheart") },
  { id: "u-holly", name: "Holly (arma)", category: "uncommon", price: 0.7, stock: 1, image: img("Holly") },
  { id: "u-nutcracker", name: "Nutcracker", category: "uncommon", price: 1.0, stock: 1, image: img("Nutcracker") },
  { id: "u-ornaments", name: "Ornaments (incomum)", category: "uncommon", price: 0.5, stock: 1, image: img("Ornaments") },
  { id: "u-sweater", name: "Sweater (incomum)", category: "uncommon", price: 0.8, stock: 1, image: img("Sweater") },
  { id: "u-ghostly", name: "Ghostly (faca)", category: "uncommon", price: 0.5, stock: 1, image: img("Ghostly") },
  { id: "u-mummy", name: "Mummy (arma incomum)", category: "uncommon", price: 0.8, stock: 1, image: img("Mummy") },
  { id: "u-pumpkin-2020", name: "Pumpkin 2020", category: "uncommon", price: 0.5, stock: 1, image: img("Pumpkin_2020") },
  { id: "u-treats", name: "Treats", category: "uncommon", price: 0.5, stock: 1, image: img("Treats") },
  { id: "u-webs", name: "Webs (incomum)", category: "uncommon", price: 0.8, stock: 1, image: img("Webs") },

  // ========================================================================
  // SETS
  // ========================================================================
  { id: "s-carrot", name: "Set Carrot", category: "set", price: 1.4, stock: 2, image: img("Carrot_Set") },
  { id: "s-clownfish", name: "Set Clownfish", category: "set", price: 0.9, stock: 4, image: img("Clownfish_Set") },
  { id: "s-fragile", name: "Set Fragile", category: "set", price: 2.3, stock: 1, image: img("Fragile_Set") },
  { id: "s-starfish", name: "Set Starfish", category: "set", price: 0.5, stock: 1, image: img("Starfish_Set") },
  { id: "s-toy", name: "Set Toy", category: "set", price: 1.3, stock: 2, image: img("Toy_Set") },
  { id: "s-clown", name: "Set Clown", category: "set", price: 0.4, stock: 2, image: img("Clown_Set") },
  { id: "s-fire", name: "Set Fire", category: "set", price: 3.1, stock: 1, image: img("Fire_Set"), tag: "hot" },
  { id: "s-portal", name: "Set Portal", category: "set", price: 1.3, stock: 1, image: img("Portal_Set") },
  { id: "s-ginger-raro", name: "Set Ginger (raro)", category: "set", price: 3.1, stock: 1, image: img("Ginger_Set") },
  { id: "s-gingercookie", name: "Set Gingercookie", category: "set", price: 2.3, stock: 1, image: img("Gingercookie_Set") },
  { id: "s-lights-incomum", name: "Set Lights (incomum)", category: "set", price: 2.4, stock: 1, image: img("Lights_Set") },
  { id: "s-sweater", name: "Set Sweater", category: "set", price: 1.0, stock: 1, image: img("Sweater_Set") },
  { id: "s-lights-comum", name: "Set Lights (comum)", category: "set", price: 0.5, stock: 1, image: img("Lights_Common_Set") },
  { id: "s-elf", name: "Set Elf", category: "set", price: 4.0, stock: 1, image: img("Elf_Set"), tag: "popular" },
  { id: "s-peppermint", name: "Set Peppermint", category: "set", price: 0.5, stock: 1, image: img("Peppermint_Set") },
  { id: "s-snakebite", name: "Set Snakebite", category: "set", price: 2.5, stock: 1, image: img("Snakebite_Set") },
  { id: "s-toxic", name: "Set Toxic", category: "set", price: 3.6, stock: 1, image: img("Toxic_Set"), tag: "hot" },
  { id: "s-hazard", name: "Set Hazard", category: "set", price: 1.6, stock: 1, image: img("Hazard_Set") },
  { id: "s-mummy-incomum", name: "Set Mummy (incomum)", category: "set", price: 2.1, stock: 1, image: img("Mummy_Set") },
  { id: "s-candy-corn", name: "Set Candy Corn (aleatório)", category: "set", price: 0.65, stock: 3, image: img("Candy_Corn_Set") },
  { id: "s-carved", name: "Set Carved", category: "set", price: 0.65, stock: 1, image: img("Carved_Set") },
  { id: "s-haunted", name: "Set Haunted", category: "set", price: 1.3, stock: 1, image: img("Haunted_Set") },
  { id: "s-watcher", name: "Set Watcher", category: "set", price: 0.6, stock: 1, image: img("Watcher_Set") },

  // ========================================================================
  // LOW SETS
  // ========================================================================
  { id: "ls-eternal", name: "Eternal Set", category: "low-set", price: 5.8, stock: 3, image: img("Eternal_Set"), tag: "hot" },
  { id: "ls-hallow", name: "Hallow Set", category: "low-set", price: 4.7, stock: 3, image: img("Hallow_Set") },
  { id: "ls-seer-6x", name: "Seer Set (6x)", category: "low-set", price: 4.7, stock: 6, image: img("Seer_Set"), tag: "popular" },
  { id: "ls-battleaxe", name: "Battleaxe Set", category: "low-set", price: 4.2, stock: 3, image: img("Battleaxe_Set") },
  { id: "ls-iceflake", name: "Iceflake Set", category: "low-set", price: 4.0, stock: 3, image: img("Iceflake_Set") },
  { id: "ls-old-glory", name: "Old Glory Set", category: "low-set", price: 4.0, stock: 3, image: img("Old_Glory_Set") },
  { id: "ls-plasma", name: "Plasma Set", category: "low-set", price: 4.0, stock: 3, image: img("Plasma_Set") },
  { id: "ls-log", name: "Log Set", category: "low-set", price: 4.0, stock: 3, image: img("Log_Set") },
  { id: "ls-slasher", name: "Slasher Set", category: "low-set", price: 4.0, stock: 3, image: img("Slasher_Set") },
  { id: "ls-xmas", name: "Xmas Set", category: "low-set", price: 4.0, stock: 3, image: img("Xmas_Set") },
  { id: "ls-eternalcane", name: "EternalCane Set", category: "low-set", price: 3.5, stock: 3, image: img("EternalCane_Set") },
  { id: "ls-gingerblade", name: "Gingerblade Set", category: "low-set", price: 3.5, stock: 3, image: img("Gingerblade_Set") },
];
