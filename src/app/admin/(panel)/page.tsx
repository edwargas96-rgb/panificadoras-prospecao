"use client";

import Link from "next/link";
import { useMemo } from "react";
import AnimatedContent from "@/components/reactbits/AnimatedContent";
import { Chip, DemoBanner, Kpi, Panel, PageTitle } from "@/components/admin/ui";
import { Donut, Legend, StackedBars } from "@/components/admin/charts";
import { CHANNELS, getFinance } from "@/lib/finance";
import { money } from "@/lib/format";
import { useStore } from "@/lib/store";

export default function Dashboard() {
  const f = useMemo(getFinance, []);
  const { products } = useStore();
  const active = products.filter((p) => p.active !== false);
  const noPhoto = active.filter((p) => !p.photo).length;
  const onRequest = active.filter((p) => p.price == null).length;
  const channelName = (id: string) => CHANNELS.find((c) => c.id === id)!.label.split(" ")[0];

  return (
    <>
      <PageTitle title="Visão geral" sub="Resumo dos últimos 30 dias da Casa Andina." />
      <DemoBanner />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Kpi label="Faturamento (30 dias)" value={f.revenue} prefix="R$ " tone="dark" delta={8} hint="vs. período anterior" />
        <Kpi label="Pedidos" value={f.orders} delta={5} hint="vs. período anterior" />
        <Kpi label="Ticket médio" value={f.ticket} prefix="R$ " delta={3} hint="por pedido" />
        <Kpi label="Lucro estimado" value={f.profit} prefix="R$ " delta={11} hint={`margem de ${Math.round((f.profit / f.revenue) * 100)}%`} />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Panel title="Faturamento por dia" className="lg:col-span-2" action={<Legend />}>
          <StackedBars days={f.days} />
        </Panel>
        <Panel title="Canais de venda">
          <Donut
            total={f.revenue}
            data={CHANNELS.map((c) => ({ label: c.label, value: f.byChannel[c.id], color: c.color }))}
          />
          <p className="mt-4 rounded-lg bg-ink/5 p-3 text-xs text-mute">
            No iFood, cerca de <b className="text-ink">27%</b> do valor fica com a plataforma ({money(Math.round(f.byChannel.ifood * 0.27))} no mês). Pedidos pelo WhatsApp e pelo site não pagam essa taxa.
          </p>
        </Panel>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Panel title="Mais vendidos" className="lg:col-span-1">
          <ol className="space-y-3">
            {f.topProducts.slice(0, 8).map((p, i) => (
              <li key={p.name} className="flex items-center gap-3 text-sm">
                <span className="grid size-6 shrink-0 place-items-center rounded-md bg-kraft/30 text-xs font-bold text-wine">{i + 1}</span>
                <span className="min-w-0 flex-1 truncate">{p.name}</span>
                <span className="text-xs text-mute">{p.qty} un.</span>
                <b className="w-20 text-right">{money(p.total)}</b>
              </li>
            ))}
          </ol>
        </Panel>

        <Panel title="Últimos pedidos" className="lg:col-span-2" action={<span className="text-xs text-mute">Hoje: {money(f.today.total)} ({f.todayVsAvg >= 0 ? "+" : ""}{f.todayVsAvg}% vs. média dos últimos dias)</span>}>
          <div className="-mx-2 overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead className="text-[.68rem] uppercase tracking-[.12em] text-mute">
                <tr><th className="px-2 pb-2">Pedido</th><th className="px-2 pb-2">Canal</th><th className="px-2 pb-2">Cliente</th><th className="px-2 pb-2">Total</th><th className="px-2 pb-2">Status</th></tr>
              </thead>
              <tbody className="divide-y divide-ink/8">
                {f.recent.slice(0, 7).map((o) => (
                  <tr key={o.id}>
                    <td className="px-2 py-2.5"><b>{o.id}</b><span className="block text-xs text-mute">{o.when}</span></td>
                    <td className="px-2 py-2.5">{channelName(o.channel)}</td>
                    <td className="px-2 py-2.5"><span className="block">{o.customer}</span><span className="block max-w-[200px] truncate text-xs text-mute">{o.items}</span></td>
                    <td className="px-2 py-2.5 font-semibold">{money(o.total)}</td>
                    <td className="px-2 py-2.5"><Chip s={o.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>

      <AnimatedContent distance={24} duration={0.6}>
        <Panel title="Saúde do cardápio" className="mt-4" action={<Link href="/admin/produtos" className="text-sm font-semibold underline decoration-kraft decoration-2 underline-offset-4">Gerenciar produtos</Link>}>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              ["Produtos ativos", active.length, "no cardápio do site"],
              ["Sem foto", noPhoto, "ficam fora da vitrine"],
              ["Sob consulta", onRequest, "sem preço cadastrado"],
            ].map(([l, v, h]) => (
              <div key={l as string} className="rounded-xl bg-ink/5 p-4">
                <p className="text-xs font-bold uppercase tracking-[.12em] text-mute">{l}</p>
                <p className="mt-1 font-display text-3xl">{v}</p>
                <p className="text-xs text-mute">{h}</p>
              </div>
            ))}
          </div>
        </Panel>
      </AnimatedContent>
    </>
  );
}
