"use client";

import type { ReactNode } from "react";
import SpotlightCard from "@/components/reactbits/SpotlightCard";
import CountUp from "@/components/reactbits/CountUp";

export function Panel({ title, action, children, className = "" }: { title?: string; action?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-2xl border border-ink/10 bg-white p-5 shadow-[0_1px_0_rgba(20,16,14,.04)] ${className}`}>
      {(title || action) && (
        <header className="mb-4 flex items-center justify-between gap-3">
          {title && <h2 className="text-[.95rem] font-bold">{title}</h2>}
          {action}
        </header>
      )}
      {children}
    </section>
  );
}

export function Kpi({
  label, value, prefix = "", suffix = "", decimals = 0, delta, hint, tone = "light",
}: {
  label: string; value: number; prefix?: string; suffix?: string; decimals?: number; delta?: number; hint?: string; tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <SpotlightCard theme={dark ? "dark" : "light"} className="rounded-2xl p-5" spotlightColor="#c8a47a" intensity={dark ? 0.22 : 0.3}>
      <p className={`text-[.68rem] font-bold uppercase tracking-[.16em] ${dark ? "text-kraft" : "text-mute"}`}>{label}</p>
      <p className={`mt-2 font-display text-[1.9rem] leading-none tracking-tight ${dark ? "text-peach" : "text-ink"}`}>
        <CountUp to={value} prefix={prefix} suffix={suffix} decimals={decimals} separator="." duration={1.4} />
      </p>
      <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
        {delta != null && (
          <span className={`whitespace-nowrap rounded-full px-2 py-0.5 font-bold ${delta >= 0 ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>
            {delta >= 0 ? "▲" : "▼"} {Math.abs(delta)}%
          </span>
        )}
        {hint && <span className={dark ? "text-peach/60" : "text-mute"}>{hint}</span>}
      </p>
    </SpotlightCard>
  );
}

export function DemoBanner() {
  return (
    <p className="mb-6 rounded-xl border border-kraft/50 bg-kraft/15 px-4 py-2.5 text-sm text-wine">
      <b>Dados de demonstração.</b> Os números do financeiro são fictícios, só para apresentação. Os produtos que você cadastra aqui aparecem no cardápio do site.
    </p>
  );
}

export function PageTitle({ title, sub, action }: { title: string; sub?: string; action?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="font-display text-3xl leading-none">{title}</h1>
        {sub && <p className="mt-2 text-sm text-mute">{sub}</p>}
      </div>
      {action}
    </div>
  );
}

const CHIP: Record<string, string> = {
  entregue: "bg-emerald-100 text-emerald-700",
  pago: "bg-emerald-100 text-emerald-700",
  "em preparo": "bg-amber-100 text-amber-800",
  "a vencer": "bg-amber-100 text-amber-800",
  "aguardando retirada": "bg-sky-100 text-sky-700",
  "vence hoje": "bg-red-100 text-red-700",
  atrasado: "bg-red-100 text-red-700",
};
export const Chip = ({ s }: { s: string }) => (
  <span className={`whitespace-nowrap rounded-full px-2.5 py-1 text-[.7rem] font-bold capitalize ${CHIP[s] ?? "bg-ink/10"}`}>{s}</span>
);
