"use client";

import SpotlightCard from "@/components/reactbits/SpotlightCard";
import CountUp from "@/components/reactbits/CountUp";
import AnimatedContent from "@/components/reactbits/AnimatedContent";
import BlurText from "@/components/reactbits/BlurText";
import { IconArrow, Leaf } from "@/components/icons";
import { useStore } from "@/lib/store";
import { CATEGORIES } from "@/lib/menu";

const FEATS = [
  { t: "Padaria", s: "Sempre fresquinha", d: "M6 30c0-9 8-16 18-16s18 7 18 16c0 3-2 5-5 5H11c-3 0-5-2-5-5ZM15 21l4 6M24 18l3 8M33 21l-3 6" },
  { t: "Café", s: "Do coado ao expresso", d: "M8 20h26v8c0 6-5 11-13 11S8 34 8 28v-8ZM34 22h3c3 0 5 2 5 5s-2 5-5 5h-4M16 8c-2 3 2 4 0 7M23 8c-2 3 2 4 0 7M30 8c-2 3 2 4 0 7" },
  { t: "Almoço", s: "Seg. a sex., 11h30", d: "M14 6v14c0 2 2 3 3 3v19M10 6v10M18 6v10M33 42V6c-5 2-8 8-8 16 0 3 2 4 5 4h3" },
  { t: "Feijoada", s: "Aos sábados", d: "M7 22h34v4c0 8-6 14-17 14S7 34 7 26v-4ZM4 22h40M17 14c-2-3 2-4 0-7M25 14c-2-3 2-4 0-7M33 14c-2-3 2-4 0-7" },
];

export default function Welcome() {
  const { products } = useStore();
  const items = products.filter((p) => p.active !== false).length;
  return (
    <section className="relative overflow-hidden bg-peach py-16 text-center">
      <Leaf className="pointer-events-none absolute -bottom-2 left-[2%] w-32 text-kraft/50 md:w-48" />
      <Leaf className="pointer-events-none absolute -bottom-2 right-[2%] w-32 -scale-x-100 text-kraft/50 md:w-48" />
      <div className="relative mx-auto w-[min(1000px,100%-32px)]">
        <p className="eyebrow flex items-center justify-center gap-4 before:h-px before:w-11 before:bg-current before:opacity-60 after:h-px after:w-11 after:bg-current after:opacity-60">
          Bem-vindo à
        </p>
        <BlurText
          text="Casa Andina Panificadora e Confeitaria"
          animateBy="words"
          delay={90}
          className="mx-auto mt-3 justify-center font-display text-[clamp(1.9rem,4.4vw,3rem)] leading-[1.08]"
        />
        <p className="mx-auto mt-4 max-w-2xl text-mute">
          Padaria, café e almoço no mesmo lugar, com produtos fresquinhos todos os dias e feijoada aos sábados. Escolha
          no cardápio e peça pelo WhatsApp.
        </p>

        <div className="mt-9 grid grid-cols-2 gap-4 md:grid-cols-4">
          {FEATS.map((f, i) => (
            <AnimatedContent key={f.t} distance={30} delay={i * 0.08} duration={0.7}>
              <SpotlightCard theme="light" className="h-full rounded-xl p-5 text-left" spotlightColor="#c8a47a" intensity={0.28}>
                <svg viewBox="0 0 48 48" className="size-10 fill-none stroke-wine" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d={f.d} />
                </svg>
                <b className="mt-3 block text-[.78rem] font-bold uppercase tracking-[.2em] text-wine">{f.t}</b>
                <span className="text-xs uppercase tracking-[.1em] text-mute">{f.s}</span>
              </SpotlightCard>
            </AnimatedContent>
          ))}
        </div>

        <dl className="mx-auto mt-10 grid max-w-xl grid-cols-3 divide-x divide-ink/15 text-center">
          {[
            { v: items, l: "Itens no cardápio" },
            { v: CATEGORIES.length, l: "Categorias" },
            { v: 6, l: "Dias por semana" },
          ].map((s) => (
            <div key={s.l} className="px-3">
              <dd className="font-display text-4xl text-wine">
                <CountUp to={s.v} duration={1.6} />
              </dd>
              <dt className="mt-1 text-[.68rem] font-bold uppercase tracking-[.16em] text-mute">{s.l}</dt>
            </div>
          ))}
        </dl>

        <a href="#cardapio" className="btn btn-dark mt-10">
          Ver cardápio <IconArrow />
        </a>
      </div>
    </section>
  );
}
