"use client";

import { useEffect, useMemo, useRef } from "react";
import SpotlightCard from "@/components/reactbits/SpotlightCard";
import { IconArrow, IconPlus } from "@/components/icons";
import { money } from "@/lib/format";
import { unitShort, useStore } from "@/lib/store";
import { CATEGORIES } from "@/lib/menu";

const SPEED = 38; // px por segundo

export default function Rail() {
  const { products, addToBasket, basket } = useStore();
  const featured = useMemo(() => products.filter((p) => p.photo && p.active !== false), [products]);
  const railRef = useRef<HTMLDivElement>(null);
  const ctl = useRef({ pause: () => {}, later: (_ms: number) => {} });
  const catLabel = (id: string) => CATEGORIES.find((c) => c.id === id)?.label ?? "";
  const n = featured.length;

  useEffect(() => {
    const rail = railRef.current;
    if (!rail || !n) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let setW = 0;
    let pos = 0;
    let last = 0;
    let paused = false;
    let touching = false;
    let inView = true;
    let timer: ReturnType<typeof setTimeout>;
    let raf = 0;

    const measure = () => {
      const cards = rail.querySelectorAll<HTMLElement>("[data-card]");
      if (cards.length > n) setW = cards[n].offsetLeft - cards[0].offsetLeft;
    };
    const wrap = () => {
      if (!setW) return;
      const sl = rail.scrollLeft;
      if (sl >= 2 * setW) { rail.scrollLeft = sl - setW; pos = rail.scrollLeft; }
      else if (sl < setW) { rail.scrollLeft = sl + setW; pos = rail.scrollLeft; }
    };
    const pause = () => { paused = true; clearTimeout(timer); };
    const later = (ms: number) => {
      clearTimeout(timer);
      timer = setTimeout(() => { pos = rail.scrollLeft; paused = false; }, ms);
    };
    ctl.current = { pause, later };

    const tick = (t: number) => {
      const dt = Math.min(t - last, 64);
      last = t;
      if (!paused && !touching && inView && !document.hidden && !reduce && setW) {
        pos += (SPEED * dt) / 1000;
        rail.scrollLeft = pos;
      }
      if (!touching) wrap();
      raf = requestAnimationFrame(tick);
    };

    const remeasure = () => { const r = rail.scrollLeft - setW; measure(); rail.scrollLeft = setW + r; pos = rail.scrollLeft; };
    measure();
    rail.scrollLeft = setW;
    pos = rail.scrollLeft;

    const onEnter = () => pause();
    const onLeave = () => later(300);
    const onTouchStart = () => { touching = true; pause(); };
    const onTouchEnd = () => { touching = false; later(1800); };
    const onWheel = () => { pause(); later(1500); };
    window.addEventListener("resize", remeasure);
    window.addEventListener("load", remeasure);
    rail.addEventListener("mouseenter", onEnter);
    rail.addEventListener("mouseleave", onLeave);
    rail.addEventListener("touchstart", onTouchStart, { passive: true });
    rail.addEventListener("touchend", onTouchEnd, { passive: true });
    rail.addEventListener("touchcancel", onTouchEnd, { passive: true });
    rail.addEventListener("wheel", onWheel, { passive: true });
    const io = new IntersectionObserver((e) => { inView = e[0].isIntersecting; }, { threshold: 0.05 });
    io.observe(rail);
    raf = requestAnimationFrame((t) => { last = t; raf = requestAnimationFrame(tick); });

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      io.disconnect();
      window.removeEventListener("resize", remeasure);
      window.removeEventListener("load", remeasure);
      rail.removeEventListener("mouseenter", onEnter);
      rail.removeEventListener("mouseleave", onLeave);
      rail.removeEventListener("touchstart", onTouchStart);
      rail.removeEventListener("touchend", onTouchEnd);
      rail.removeEventListener("touchcancel", onTouchEnd);
      rail.removeEventListener("wheel", onWheel);
    };
  }, [n]);

  if (!n) return null;
  const loop = [...featured, ...featured, ...featured];
  const qty = (id: string) => basket.find(([x]) => x === id)?.[1];
  const scrollBy = (dir: number) => {
    ctl.current.pause();
    railRef.current?.scrollBy({ left: dir * 620, behavior: "smooth" });
    ctl.current.later(2500);
  };

  return (
    <section id="destaques" className="bg-peach py-14 md:py-20">
      <div className="mx-auto mb-8 flex w-[min(1180px,100%-32px)] items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Para pedir agora</p>
          <h2 className="mt-2 font-display text-[clamp(1.9rem,4vw,2.9rem)] leading-none">
            Do nosso <span className="font-script text-kraft-d">balcão</span>
          </h2>
        </div>
        <div className="hidden gap-2 md:flex">
          <button type="button" aria-label="Ver itens anteriores" onClick={() => scrollBy(-1)} className="grid size-12 -scale-x-100 place-items-center rounded-md border-2 border-ink bg-paper transition-colors hover:bg-kraft"><IconArrow className="size-5" /></button>
          <button type="button" aria-label="Ver próximos itens" onClick={() => scrollBy(1)} className="grid size-12 place-items-center rounded-md border-2 border-ink bg-paper transition-colors hover:bg-kraft"><IconArrow className="size-5" /></button>
        </div>
      </div>

      <div ref={railRef} tabIndex={0} aria-label="Vitrine" className="no-scrollbar flex gap-5 overflow-x-auto px-5 pb-6 md:px-[max(20px,calc((100vw-1180px)/2))]">
        {loop.map((p, i) => {
          const clone = i >= n;
          return (
            <div key={`${p.id}-${i}`} data-card className="w-[62vw] shrink-0 sm:w-[270px]" aria-hidden={clone || undefined}>
              <SpotlightCard theme="light" className="h-full overflow-hidden rounded-2xl p-0" spotlightColor="#c8a47a" intensity={0.3}>
                <div className="relative aspect-square overflow-hidden bg-sand md:aspect-[4/5]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.photo} alt={clone ? "" : p.name} className="size-full object-cover transition-transform duration-500 hover:scale-105" loading="lazy" draggable={false} />
                </div>
                <div className="flex flex-col gap-1 p-4">
                  <p className="text-[.64rem] font-bold uppercase tracking-[.16em] text-kraft-d">{catLabel(p.cat)}</p>
                  <h3 className="font-display text-lg leading-tight md:text-xl">{p.name}</h3>
                  <div className="mt-2 flex items-center justify-between gap-2">
                    <span className={p.price == null ? "text-sm font-semibold text-mute" : "font-display text-xl text-wine"}>
                      {p.price == null ? "Sob consulta" : <>{money(p.price)}<small className="ml-1 font-sans text-xs text-mute">/{unitShort(p)}</small></>}
                    </span>
                    <button
                      type="button"
                      tabIndex={clone ? -1 : 0}
                      aria-label={`Adicionar ${p.name} ao pedido`}
                      onClick={() => addToBasket(p.id)}
                      className={`grid size-10 place-items-center rounded-md border-2 border-ink text-sm font-bold shadow-[2px_2px_0_#14100e] transition-transform active:translate-x-px active:translate-y-px ${qty(p.id) ? "bg-ink text-kraft" : "bg-kraft text-ink"}`}
                    >
                      {qty(p.id) ?? <IconPlus className="size-5" />}
                    </button>
                  </div>
                </div>
              </SpotlightCard>
            </div>
          );
        })}
      </div>
    </section>
  );
}
