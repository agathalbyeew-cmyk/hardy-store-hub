/**
 * Códigos promocionais válidos para a roleta de faca grátis.
 * Cada usuário só pode usar cada código UMA vez.
 */
export const PROMO_CODES = new Set([
  "F4n1x",
  "Surpr1s3Lux",
  "W0lf",
  "Luxx14",
  "LBY137",
  "Fr33codeWL",
]);

const img = (name: string) =>
  `https://static.wikia.nocookie.net/mm2/images/0/0a/${name}.png`;

/** Facas/itens comuns da MM2 — pool de prêmios da roleta. */
export const ROULETTE_PRIZES: Array<{ name: string; image: string; weight: number }> = [
  { name: "Bat",       image: "https://static.wikia.nocookie.net/mm2/images/9/9c/Bat.png", weight: 5 },
  { name: "Tides",     image: "https://static.wikia.nocookie.net/mm2/images/2/2e/Tides.png", weight: 5 },
  { name: "Saw",       image: "https://static.wikia.nocookie.net/mm2/images/3/3b/Saw.png", weight: 5 },
  { name: "Heat",      image: "https://static.wikia.nocookie.net/mm2/images/c/c5/Heat.png", weight: 5 },
  { name: "Slasher",   image: "https://static.wikia.nocookie.net/mm2/images/2/24/Slasher.png", weight: 4 },
  { name: "Boneblade", image: "https://static.wikia.nocookie.net/mm2/images/2/2a/Boneblade.png", weight: 4 },
  { name: "Fang",      image: "https://static.wikia.nocookie.net/mm2/images/8/8d/Fang.png", weight: 4 },
  { name: "Deathshard",image: "https://static.wikia.nocookie.net/mm2/images/9/9b/Deathshard.png", weight: 3 },
  { name: "Seer",      image: "https://static.wikia.nocookie.net/mm2/images/6/6d/Seer.png", weight: 3 },
  { name: "Gemstone",  image: "https://static.wikia.nocookie.net/mm2/images/c/c4/Gemstone.png", weight: 3 },
];

export function pickPrize() {
  const total = ROULETTE_PRIZES.reduce((s, p) => s + p.weight, 0);
  let r = Math.random() * total;
  for (const p of ROULETTE_PRIZES) {
    r -= p.weight;
    if (r <= 0) return p;
  }
  return ROULETTE_PRIZES[0];
}
