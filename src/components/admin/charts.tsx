"use client";

import { useState } from "react";
import { money } from "@/lib/format";
import { CHANNELS, type Day } from "@/lib/finance";

const compact = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(n >= 10000 ? 0 : 1).replace(".", ",")} mil` : String(n));

export function StackedBars({ days }: { days: Day[] }) {
  const [hover, setHover] = useState<number | null>(null);
  const W = 720, H = 240, padL = 44, padB = 26, padT = 10;
  const max = Math.max(...days.map((d) => d.total), 1);
  const top = Math.ceil(max / 1000) * 1000;
  const bw = (W - padL) / days.length;
  const y = (v: number) => padT + (H - padT - padB) * (1 - v / top);
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((t) => Math.round(top * t));
  const hd = hover != null ? days[hover] : null;
  return (
    <div className="relative">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Faturamento diário por canal nos últimos 30 dias">
        {ticks.map((t) => (
          <g key={t}>
            <line x1={padL} x2={W} y1={y(t)} y2={y(t)} stroke="#14100e" strokeOpacity=".08" />
            <text x={padL - 8} y={y(t) + 4} textAnchor="end" fontSize="10" fill="#6f655b">{compact(t)}</text>
          </g>
        ))}
        {days.map((d, i) => {
          let acc = 0;
          const x = padL + i * bw + bw * 0.14;
          const w = bw * 0.72;
          return (
            <g key={d.date} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} opacity={hover == null || hover === i ? 1 : 0.45}>
              <rect x={padL + i * bw} y={0} width={bw} height={H - padB} fill="transparent" />
              {CHANNELS.map((c) => {
                const v = d[c.id];
                const h = (H - padT - padB) * (v / top);
                const yy = y(acc + v);
                acc += v;
                return <rect key={c.id} x={x} y={yy} width={w} height={h} fill={c.color} rx={1.5} />;
              })}
              {i % 5 === 0 && <text x={x + w / 2} y={H - 8} textAnchor="middle" fontSize="10" fill="#6f655b">{d.label}</text>}
            </g>
          );
        })}
      </svg>
      {hd && (
        <div className="pointer-events-none absolute right-2 top-0 rounded-md border border-ink/15 bg-white px-3 py-2 text-xs shadow-lg">
          <b className="block">{hd.label} · {money(hd.total)}</b>
          {CHANNELS.map((c) => (
            <span key={c.id} className="flex items-center gap-1.5 text-mute">
              <i className="size-2 rounded-sm" style={{ background: c.color }} /> {c.label.split(" ")[0]}: {money(hd[c.id])}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export function Legend() {
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-mute">
      {CHANNELS.map((c) => (
        <li key={c.id} className="flex items-center gap-1.5"><i className="size-2.5 rounded-sm" style={{ background: c.color }} />{c.label}</li>
      ))}
    </ul>
  );
}

export function Donut({ data, total }: { data: { label: string; value: number; color: string }[]; total: number }) {
  const r = 52, c = 2 * Math.PI * r;
  let off = 0;
  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
      <svg viewBox="0 0 140 140" className="size-36 shrink-0 -rotate-90" role="img" aria-label="Divisão do faturamento por canal">
        <circle cx="70" cy="70" r={r} fill="none" stroke="#14100e" strokeOpacity=".06" strokeWidth="18" />
        {data.map((d) => {
          const len = (d.value / total) * c;
          const el = <circle key={d.label} cx="70" cy="70" r={r} fill="none" stroke={d.color} strokeWidth="18" strokeDasharray={`${len} ${c - len}`} strokeDashoffset={-off} />;
          off += len;
          return el;
        })}
      </svg>
      <ul className="w-full space-y-2 text-sm">
        {data.map((d) => (
          <li key={d.label} className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-2"><i className="size-2.5 rounded-sm" style={{ background: d.color }} />{d.label}</span>
            <span className="font-semibold">{Math.round((d.value / total) * 100)}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function HBars({ rows }: { rows: { label: string; value: number; color: string }[] }) {
  const max = Math.max(...rows.map((r) => r.value), 1);
  return (
    <ul className="space-y-3">
      {rows.map((r) => (
        <li key={r.label}>
          <div className="mb-1 flex justify-between gap-3 text-sm">
            <span>{r.label}</span>
            <b>{money(r.value)}</b>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-ink/8">
            <div className="h-full rounded-full" style={{ width: `${(r.value / max) * 100}%`, background: r.color }} />
          </div>
        </li>
      ))}
    </ul>
  );
}

export function MonthlyBars({ data }: { data: { label: string; revenue: number; costs: number }[] }) {
  const W = 560, H = 230, padL = 44, padB = 26, padT = 14;
  const top = Math.ceil(Math.max(...data.map((d) => d.revenue)) / 20000) * 20000;
  const y = (v: number) => padT + (H - padT - padB) * (1 - v / top);
  const gw = (W - padL) / data.length;
  const pts = data.map((d, i) => `${padL + i * gw + gw / 2},${y(d.revenue - d.costs)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Receita, despesas e lucro dos últimos 6 meses">
      {[0, 0.25, 0.5, 0.75, 1].map((t) => (
        <g key={t}>
          <line x1={padL} x2={W} y1={y(top * t)} y2={y(top * t)} stroke="#14100e" strokeOpacity=".08" />
          <text x={padL - 8} y={y(top * t) + 4} textAnchor="end" fontSize="10" fill="#6f655b">{compact(Math.round(top * t))}</text>
        </g>
      ))}
      {data.map((d, i) => {
        const x = padL + i * gw + gw * 0.16;
        const w = gw * 0.32;
        return (
          <g key={d.label}>
            <rect x={x} y={y(d.revenue)} width={w} height={H - padB - y(d.revenue)} fill="#1d1a17" rx="2" />
            <rect x={x + w + 3} y={y(d.costs)} width={w} height={H - padB - y(d.costs)} fill="#c8a47a" rx="2" />
            <text x={padL + i * gw + gw / 2} y={H - 8} textAnchor="middle" fontSize="11" fill="#6f655b">{d.label}</text>
          </g>
        );
      })}
      <polyline points={pts} fill="none" stroke="#25a05a" strokeWidth="2.5" strokeLinejoin="round" />
      {data.map((d, i) => <circle key={d.label} cx={padL + i * gw + gw / 2} cy={y(d.revenue - d.costs)} r="3.5" fill="#25a05a" />)}
    </svg>
  );
}
