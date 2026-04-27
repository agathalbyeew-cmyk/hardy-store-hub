/**
 * Sistema de badges. Calculadas a partir das stats do usuário.
 */
export interface UserStats {
  total_orders: number;
  total_spent: number;
  supplier_requests: number;
  roulette_wins: number;
  member_since: string | null;
}

export interface Badge {
  id: string;
  label: string;
  description: string;
  emoji: string;
  /** tier 1=bronze 2=prata 3=ouro 4=mítico */
  tier: 1 | 2 | 3 | 4;
}

const TIER_CLASS: Record<1 | 2 | 3 | 4, string> = {
  1: "from-amber-700/40 to-amber-500/30 border-amber-600/40 text-amber-200",
  2: "from-slate-400/30 to-slate-200/20 border-slate-300/40 text-slate-100",
  3: "from-yellow-500/40 to-yellow-300/30 border-yellow-400/50 text-yellow-100",
  4: "from-fuchsia-500/40 to-purple-500/30 border-fuchsia-400/50 text-fuchsia-100",
};

export function badgeTierClass(tier: 1 | 2 | 3 | 4) {
  return TIER_CLASS[tier];
}

export function computeBadges(stats: UserStats): Badge[] {
  const out: Badge[] = [];
  const { total_orders, total_spent, supplier_requests, roulette_wins, member_since } = stats;

  // Compras
  if (total_orders >= 1) out.push({ id: "first-buy", emoji: "🛒", label: "Primeira compra", description: "Fez seu 1º pedido na Hardy Store", tier: 1 });
  if (total_orders >= 5) out.push({ id: "buyer", emoji: "💸", label: "Comprador frequente", description: "5+ pedidos realizados", tier: 2 });
  if (total_orders >= 15) out.push({ id: "vip-buyer", emoji: "👑", label: "Comprador VIP", description: "15+ pedidos — você ama a Hardy", tier: 3 });
  if (total_orders >= 40) out.push({ id: "legend-buyer", emoji: "🌟", label: "Lenda da loja", description: "40+ pedidos. Aplausos.", tier: 4 });

  // Gasto
  if (total_spent >= 50) out.push({ id: "spent-50", emoji: "💎", label: "Investidor", description: "Mais de R$ 50 em pedidos", tier: 2 });
  if (total_spent >= 200) out.push({ id: "spent-200", emoji: "🏆", label: "Big spender", description: "Mais de R$ 200 movimentados", tier: 3 });

  // Fornecedor
  if (supplier_requests >= 1) out.push({ id: "supplier", emoji: "🤝", label: "Fornecedor", description: "Já se ofereceu como fornecedor", tier: 2 });
  if (supplier_requests >= 5) out.push({ id: "wholesaler", emoji: "📦", label: "Atacadista", description: "5+ ofertas de venda enviadas", tier: 3 });

  // Roleta
  if (roulette_wins >= 1) out.push({ id: "lucky", emoji: "🎰", label: "Sortudo(a)", description: "Ganhou na roleta de faca grátis", tier: 1 });
  if (roulette_wins >= 3) out.push({ id: "very-lucky", emoji: "🍀", label: "Muito sortudo(a)", description: "3+ vitórias na roleta", tier: 3 });

  // Tempo de casa
  if (member_since) {
    const days = (Date.now() - new Date(member_since).getTime()) / 86400000;
    if (days >= 7) out.push({ id: "veteran-7", emoji: "🌱", label: "1 semana", description: "Está aqui há mais de 7 dias", tier: 1 });
    if (days >= 30) out.push({ id: "veteran-30", emoji: "🌿", label: "Veterano(a)", description: "1 mês de Hardy Store", tier: 2 });
    if (days >= 180) out.push({ id: "veteran-180", emoji: "🌳", label: "Raiz", description: "6 meses na comunidade", tier: 3 });
    if (days >= 365) out.push({ id: "veteran-365", emoji: "🔥", label: "OG", description: "1 ano de casa. Respeito.", tier: 4 });
  }

  return out;
}
