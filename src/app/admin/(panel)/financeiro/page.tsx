"use client";

import { useMemo } from "react";
import { Chip, DemoBanner, Kpi, Panel, PageTitle } from "@/components/admin/ui";
import { HBars, MonthlyBars } from "@/components/admin/charts";
import { getFinance } from "@/lib/finance";
import { money } from "@/lib/format";

export default function Financeiro() {
  const f = useMemo(getFinance, []);
  const margin = Math.round((f.profit / f.revenue) * 100);

  const exportCsv = () => {
    const rows = [["data", "balcao", "whatsapp", "ifood", "total", "pedidos"], ...f.days.map((d) => [d.date, d.balcao, d.whatsapp, d.ifood, d.total, d.orders])];
    const blob = new Blob([rows.map((r) => r.join(";")).join("\n")], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "casa-andina-financeiro-demo.csv";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <>
      <PageTitle
        title="Financeiro"
        sub="Receitas, despesas e contas a pagar do mês."
        action={<button type="button" onClick={exportCsv} className="btn btn-dark !rounded-md !px-4 !py-2.5">Exportar CSV</button>}
      />
      <DemoBanner />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Kpi label="Receita (30 dias)" value={f.revenue} prefix="R$ " tone="dark" delta={8} hint="vs. mês anterior" />
        <Kpi label="Despesas" value={f.costs} prefix="R$ " delta={-2} hint="vs. mês anterior" />
        <Kpi label="Lucro estimado" value={f.profit} prefix="R$ " delta={11} hint={`margem de ${margin}%`} />
        <Kpi label="A receber (iFood)" value={f.receivable} prefix="R$ " hint="repasse em até 30 dias" />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Panel
          title="Receita, despesas e lucro"
          action={
            <ul className="flex gap-3 text-xs text-mute">
              <li className="flex items-center gap-1.5"><i className="size-2.5 rounded-sm bg-ink" />Receita</li>
              <li className="flex items-center gap-1.5"><i className="size-2.5 rounded-sm bg-kraft" />Despesas</li>
              <li className="flex items-center gap-1.5"><i className="size-2.5 rounded-full bg-emerald-500" />Lucro</li>
            </ul>
          }
        >
          <MonthlyBars data={f.monthly} />
        </Panel>
        <Panel title="Para onde vai o dinheiro">
          <HBars rows={f.expenses} />
        </Panel>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-5">
        <Panel title="Contas a pagar" className="lg:col-span-3">
          <div className="-mx-2 overflow-x-auto">
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead className="text-[.68rem] uppercase tracking-[.12em] text-mute">
                <tr><th className="px-2 pb-2">Fornecedor</th><th className="px-2 pb-2">Vencimento</th><th className="px-2 pb-2">Valor</th><th className="px-2 pb-2">Status</th></tr>
              </thead>
              <tbody className="divide-y divide-ink/8">
                {f.bills.map((b) => (
                  <tr key={b.who + b.due}>
                    <td className="px-2 py-2.5"><b>{b.who}</b><span className="block text-xs text-mute">{b.what}</span></td>
                    <td className="px-2 py-2.5">{b.due}</td>
                    <td className="px-2 py-2.5 font-semibold">{money(b.value)}</td>
                    <td className="px-2 py-2.5"><Chip s={b.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel title="Produtos que mais faturam" className="lg:col-span-2">
          <ul className="space-y-3 text-sm">
            {f.topProducts.slice(0, 6).map((p) => (
              <li key={p.name} className="flex items-center justify-between gap-3">
                <span className="min-w-0 truncate">{p.name}</span>
                <b>{money(p.total)}</b>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <Panel title="Faturamento diário" className="mt-4">
        <div className="-mx-2 max-h-80 overflow-auto">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead className="sticky top-0 bg-white text-[.68rem] uppercase tracking-[.12em] text-mute">
              <tr><th className="px-2 pb-2">Dia</th><th className="px-2 pb-2">Balcão</th><th className="px-2 pb-2">WhatsApp</th><th className="px-2 pb-2">iFood</th><th className="px-2 pb-2">Total</th><th className="px-2 pb-2">Pedidos</th></tr>
            </thead>
            <tbody className="divide-y divide-ink/8">
              {[...f.days].reverse().map((d) => (
                <tr key={d.date} className={d.total === 0 ? "text-mute" : ""}>
                  <td className="px-2 py-2">{d.label}</td>
                  <td className="px-2 py-2">{d.total ? money(d.balcao) : "—"}</td>
                  <td className="px-2 py-2">{d.total ? money(d.whatsapp) : "—"}</td>
                  <td className="px-2 py-2">{d.total ? money(d.ifood) : "—"}</td>
                  <td className="px-2 py-2 font-semibold">{d.total ? money(d.total) : "Fechado"}</td>
                  <td className="px-2 py-2">{d.orders || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  );
}
