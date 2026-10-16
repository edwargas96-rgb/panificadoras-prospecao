"use client";

import { useEffect, useMemo, useState } from "react";
import BlurText from "@/components/reactbits/BlurText";
import { IconPlus, IconSearch } from "@/components/icons";
import { CATEGORIES, type Product } from "@/lib/menu";
import { money, norm } from "@/lib/format";
import { unitShort, useStore } from "@/lib/store";
import { SITE } from "@/lib/config";

export default function Catalog() {
  const { products, basket, addToBasket } = useStore();
  const [cat, setCat] = useState(CATEGORIES[0].id);
  const [q, setQ] = useState("");

  useEffect(() => {
    const on = (e: Event) => {
      setCat((e as CustomEvent<string>).detail);
      setQ("");
    };
    window.addEventListener("catalog:set", on);
    return () => window.removeEventListener("catalog:set", on);
  }, []);

  const qty = (id: string) => basket.find(([x]) => x === id)?.[1];
  const query = norm(q.trim());

  const sections = useMemo(() => {
    const active = products.filter((p) => p.active !== false);
    const cats = query ? CATEGORIES : CATEGORIES.filter((c) => c.id === cat);
    return cats
      .map((c) => {
        const items = active.filter(
          (p) => p.cat === c.id && (!query || norm(`${p.name} ${p.desc ?? ""}`).includes(query)),
        );
        const groups: string[] = [];
        items.forEach((p) => groups.includes(p.group) || groups.push(p.group));
        return { cat: c, groups: groups.map((g) => ({ name: g, items: items.filter((p) => p.group === g) })), total: items.length };
      })
      .filter((s) => s.total > 0);
  }, [products, cat, query]);

  const total = sections.reduce((a, s) => a + s.total, 0);
  const note = !query ? CATEGORIES.find((c) => c.id === cat)?.note : "";

  const Row = ({ p }: { p: Product }) => (
    <li className="flex items-start gap-3 border-b border-dashed border-ink/20 py-4">
      {p.photo && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={p.photo} alt="" loading="lazy" className="size-16 shrink-0 rounded-md border border-ink/15 object-cover" />
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-end gap-2">
          <span className="font-semibold leading-snug">{p.name}</span>
          <span className="mb-1.5 hidden min-w-4 flex-1 border-b-2 border-dotted border-ink/25 sm:block" />
          <span className={`ml-auto whitespace-nowrap sm:ml-0 ${p.price == null ? "text-sm font-semibold text-mute" : "font-display text-lg text-wine"}`}>
            {p.price == null ? "Sob consulta" : <>{money(p.price)}<small className="ml-1 font-sans text-xs text-mute">/{unitShort(p)}</small></>}
          </span>
        </div>
        {p.desc && <p className="mt-1 text-sm leading-snug text-mute">{p.desc}</p>}
      </div>
      <button
        type="button"
        onClick={() => addToBasket(p.id)}
        aria-label={qty(p.id) ? `${p.name}: ${qty(p.id)} no pedido. Adicionar mais` : `Adicionar ${p.name} ao pedido`}
        className={`grid size-11 shrink-0 place-items-center rounded-md border-2 border-ink text-sm font-bold shadow-[2px_2px_0_#14100e] transition-transform active:translate-x-px active:translate-y-px ${qty(p.id) ? "bg-ink text-kraft" : "bg-kraft text-ink"}`}
      >
        {qty(p.id) ?? <IconPlus className="size-5" />}
      </button>
    </li>
  );

  return (
    <section id="cardapio" className="bg-paper py-16 md:py-24">
      <div className="mx-auto w-[min(1180px,100%-32px)]">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="eyebrow">Do café da manhã ao almoço</p>
            <BlurText text="Nosso cardápio" animateBy="words" delay={120} className="mt-2 font-display text-[clamp(2rem,4.6vw,3.2rem)] leading-none" />
          </div>
          <a href={SITE.cardapioPdf} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold underline decoration-kraft decoration-[3px] underline-offset-[6px] hover:text-kraft-d">
            Ver o cardápio em PDF
          </a>
        </div>

        <div className="sticky top-[72px] z-30 -mx-4 border-y-2 border-ink bg-paper/95 px-4 backdrop-blur md:mx-0 md:rounded-md md:border-2">
          <div className="no-scrollbar flex gap-2 overflow-x-auto py-3">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                aria-pressed={!query && c.id === cat}
                onClick={() => { setCat(c.id); setQ(""); }}
                className={`shrink-0 rounded-md border-2 border-ink px-4 py-2 text-[.78rem] font-bold uppercase tracking-[.08em] transition-colors ${!query && c.id === cat ? "bg-ink text-peach" : "bg-transparent hover:bg-kraft/40"}`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <label className="mt-6 flex max-w-md items-center gap-3 rounded-md border-2 border-ink bg-white px-4 py-3 focus-within:outline-3 focus-within:outline-offset-2 focus-within:outline-kraft-d">
          <IconSearch className="size-5 text-mute" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="O que você procura?"
            aria-label="Buscar produtos por nome ou ingrediente"
            autoComplete="off"
            className="w-full bg-transparent outline-none placeholder:text-mute"
          />
        </label>

        <div className="mt-4 flex flex-col justify-between gap-1 text-sm text-mute sm:flex-row">
          <p className="max-w-2xl">{note}</p>
          <span role="status" aria-live="polite" className="font-bold uppercase tracking-[.12em]">{total} {total === 1 ? "item" : "itens"}</span>
        </div>

        <div className="mt-2">
          {sections.map((s) => (
            <div key={s.cat.id}>
              {query && <h3 className="mt-8 font-display text-2xl text-wine">{s.cat.label}</h3>}
              {s.groups.map((g) => (
                <div key={g.name}>
                  {g.name && <h4 className="mt-8 font-script text-3xl text-kraft-d">{g.name}</h4>}
                  <ul className="grid gap-x-12 md:grid-cols-2">
                    {g.items.map((p) => <Row key={p.id} p={p} />)}
                  </ul>
                </div>
              ))}
            </div>
          ))}
          {!total && (
            <div className="py-16 text-center">
              <p className="font-display text-2xl">Não encontramos esse item por aqui.</p>
              <a className="mt-3 inline-block font-semibold underline decoration-kraft decoration-[3px] underline-offset-4" target="_blank" rel="noopener noreferrer" href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(`Olá! Vocês têm ${q.trim()}?`)}`}>
                Perguntar pelo WhatsApp
              </a>
            </div>
          )}
        </div>
        <p className="mt-10 text-sm text-mute">Valores conforme o cardápio da casa. Disponibilidade confirmada pelo WhatsApp.</p>
      </div>
    </section>
  );
}
