// Dados FICTÍCIOS, gerados só para a apresentação do painel (não são números reais da Casa Andina).
import { SEED_PRODUCTS } from "./menu";

export type Channel = "balcao" | "whatsapp" | "ifood";
export const CHANNELS: { id: Channel; label: string; color: string }[] = [
  { id: "balcao", label: "Balcão", color: "#1d1a17" },
  { id: "whatsapp", label: "WhatsApp (encomendas)", color: "#25a05a" },
  { id: "ifood", label: "iFood", color: "#d3141e" },
];

export type Day = { date: string; label: string; balcao: number; whatsapp: number; ifood: number; total: number; orders: number };

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const ANCHOR = new Date(2026, 9, 16); // dia "de hoje" da demonstração
const iso = (d: Date) => d.toISOString().slice(0, 10);
const br = (d: Date) => `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`;

function buildDays(count: number): Day[] {
  const rand = mulberry32(2026);
  const out: Day[] = [];
  for (let i = count - 1; i >= 0; i--) {
    const d = new Date(ANCHOR);
    d.setDate(d.getDate() - i);
    const dow = d.getDay();
    const closed = dow === 0;
    const base = dow === 6 ? 4300 : dow === 5 ? 4700 : 3900;
    const wobble = 0.85 + rand() * 0.35;
    const total = closed ? 0 : base * wobble;
    const balcao = total * (0.56 + rand() * 0.05);
    const ifood = total * (0.27 + rand() * 0.05);
    const whatsapp = Math.max(0, total - balcao - ifood);
    const orders = closed ? 0 : Math.round(total / (38 + rand() * 12));
    out.push({
      date: iso(d),
      label: br(d),
      balcao: Math.round(balcao),
      ifood: Math.round(ifood),
      whatsapp: Math.round(whatsapp),
      total: Math.round(balcao) + Math.round(ifood) + Math.round(whatsapp),
      orders,
    });
  }
  return out;
}

export type Expense = { label: string; value: number; color: string };
export type Bill = { who: string; what: string; due: string; value: number; status: "pago" | "a vencer" | "vence hoje" | "atrasado" };
export type Order = { id: string; when: string; channel: Channel; customer: string; items: string; total: number; status: "entregue" | "em preparo" | "aguardando retirada" };

export function getFinance() {
  const days = buildDays(30);
  const sum = (k: "balcao" | "whatsapp" | "ifood" | "total" | "orders") => days.reduce((a, d) => a + d[k], 0);
  const revenue = sum("total");
  const byChannel = { balcao: sum("balcao"), whatsapp: sum("whatsapp"), ifood: sum("ifood") };
  const orders = sum("orders");

  const ifoodFees = Math.round(byChannel.ifood * 0.27);
  const expenses: Expense[] = [
    { label: "Insumos e fornecedores", value: Math.round(revenue * 0.33), color: "#8a5a33" },
    { label: "Equipe e encargos", value: Math.round(revenue * 0.21), color: "#1d1a17" },
    { label: "Taxas do iFood (27%)", value: ifoodFees, color: "#d3141e" },
    { label: "Aluguel", value: 9800, color: "#c8a47a" },
    { label: "Energia, gás e água", value: Math.round(revenue * 0.035), color: "#6f655b" },
    { label: "Outros", value: Math.round(revenue * 0.02), color: "#b9b0a4" },
  ];
  const costs = expenses.reduce((a, e) => a + e.value, 0);
  const profit = revenue - costs;

  const months = ["Mai", "Jun", "Jul", "Ago", "Set", "Out"];
  const monthly = months.map((m, i) => {
    const rand = mulberry32(100 + i);
    const r = Math.round((revenue * (0.78 + i * 0.045) * (0.96 + rand() * 0.08)) / 100) * 100;
    const c = Math.round((costs * (0.82 + i * 0.035) * (0.97 + rand() * 0.06)) / 100) * 100;
    return { label: m, revenue: i === months.length - 1 ? revenue : r, costs: i === months.length - 1 ? costs : c };
  });

  const bills: Bill[] = [
    { who: "Moinho Curitiba", what: "Farinha e fermento", due: "16/10", value: 4820, status: "vence hoje" },
    { who: "Laticínios Serra Azul", what: "Queijos e manteiga", due: "18/10", value: 3190, status: "a vencer" },
    { who: "Frimesa", what: "Frios e requeijão", due: "21/10", value: 2740, status: "a vencer" },
    { who: "Copel", what: "Energia elétrica", due: "22/10", value: 2310, status: "a vencer" },
    { who: "Imobiliária Mercês", what: "Aluguel", due: "05/10", value: 9800, status: "pago" },
    { who: "Gás Paraná", what: "Gás de cozinha", due: "09/10", value: 860, status: "pago" },
  ];

  const prices = SEED_PRODUCTS.filter((p) => p.price != null && ["lanches", "burgers", "cafes", "almoco", "padaria", "feijoada"].includes(p.cat));
  const rand = mulberry32(77);
  const topProducts = [...prices]
    .map((p) => ({ name: p.name, price: p.price as number, qty: Math.round(40 + rand() * 360) }))
    .sort((a, b) => b.qty * b.price - a.qty * a.price)
    .slice(0, 8)
    .map((p) => ({ ...p, total: Math.round(p.qty * p.price) }));

  const names = ["Marina S.", "Carlos E.", "Fernanda L.", "Paulo R.", "Juliana M.", "Ana Clara", "Roberto T.", "Camila F.", "Gustavo H.", "Beatriz C.", "Lucas P.", "Helena V."];
  const pick = (n: number) => prices[Math.floor(rand() * prices.length)] && prices[(n * 7 + 3) % prices.length];
  const recent: Order[] = Array.from({ length: 12 }, (_, i) => {
    const ch: Channel = (["whatsapp", "ifood", "balcao", "ifood", "whatsapp", "balcao"] as Channel[])[i % 6];
    const a = pick(i + 1);
    const b = pick(i + 5);
    const total = Math.round((a.price as number) * (1 + (i % 2)) + (b.price as number));
    const hour = 18 - Math.floor(i / 2);
    return {
      id: `#${4821 - i}`,
      when: `Hoje, ${String(hour).padStart(2, "0")}:${String((i * 13) % 60).padStart(2, "0")}`,
      channel: ch,
      customer: names[i % names.length],
      items: `${1 + (i % 2)}× ${a.name}, 1× ${b.name}`,
      total,
      status: i < 2 ? "em preparo" : i < 4 && ch === "whatsapp" ? "aguardando retirada" : "entregue",
    };
  });

  const today = days[days.length - 1];
  const prev = days.slice(-8, -1).filter((d) => d.total > 0);
  const prevAvg = prev.reduce((a, d) => a + d.total, 0) / Math.max(1, prev.length);

  return {
    days,
    revenue,
    costs,
    profit,
    orders,
    ticket: Math.round(revenue / Math.max(1, orders)),
    byChannel,
    expenses,
    monthly,
    bills,
    topProducts,
    recent,
    today,
    todayVsAvg: Math.round(((today.total - prevAvg) / prevAvg) * 100),
    receivable: Math.round(byChannel.ifood * 0.35),
  };
}
