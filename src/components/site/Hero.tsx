"use client";

import { useEffect, useState } from "react";
import SplitText from "@/components/reactbits/SplitText";
import ShinyText from "@/components/reactbits/ShinyText";
import Magnet from "@/components/reactbits/Magnet";
import GlareHover from "@/components/reactbits/GlareHover";
import { IconArrow } from "@/components/icons";

const PHOTOS = [
  ["/assets/produtos/torta-de-limao-com-merengue.jpg", "Torta de limão com merengue e café"],
  ["/assets/produtos/misto-quente.jpg", "Misto quente na chapa com cappuccino"],
  ["/assets/produtos/cheese-bacon.jpg", "Cheese bacon"],
  ["/assets/produtos/bolo-com-goiabada.jpg", "Bolo com goiabada"],
];

function useToday() {
  const [t, setT] = useState<{ b: string; r: string }>({ b: "Almoço", r: " de segunda a sexta" });
  useEffect(() => {
    const dow = new Date().getDay();
    if (dow === 6) setT({ b: "Hoje tem feijoada", r: " · 12h às 15h" });
    else if (dow >= 1 && dow <= 5) setT({ b: "Almoço hoje", r: " · 11h30 às 14h30" });
    else setT({ b: "Sábado é dia de feijoada", r: " · 12h às 15h" });
  }, []);
  return t;
}

export default function Hero() {
  const today = useToday();
  return (
    <section id="inicio" className="relative isolate overflow-hidden bg-ink">
      <div className="grid h-[250px] grid-cols-2 md:h-[clamp(430px,48vw,560px)] md:grid-cols-4">
        {PHOTOS.map(([src, alt], i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={src}
            src={src}
            alt={alt}
            className={`size-full object-cover ${i > 1 ? "max-md:hidden" : ""}`}
            loading={i === 0 ? "eager" : "lazy"}
          />
        ))}
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/10 via-ink/50 to-ink/90 max-md:bg-gradient-to-b max-md:from-transparent max-md:to-ink/70" />

      <div className="relative z-10 mx-auto w-[min(1180px,100%-32px)] md:absolute md:inset-0 md:flex md:items-center md:justify-end">
        <div className="border border-kraft bg-ink/85 px-7 py-8 text-center text-peach backdrop-blur-sm max-md:mt-0 max-md:border-x-0 max-md:border-b-0 max-md:border-t-4 max-md:bg-ink max-md:px-5 md:w-[min(540px,54%)] md:rounded-md md:px-9">
          <div className="mx-auto mb-4 w-[104px]">
            <GlareHover width="104px" height="104px" background="#000" borderRadius="9999px" borderColor="#c8a47a" glareColor="#ffffff" glareOpacity={0.35}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/logo.jpg" alt="Logo da Casa Andina Panificadora e Confeitaria" className="size-full object-cover" />
            </GlareHover>
          </div>
          <SplitText
            text="Produtos fresquinhos todos os dias"
            tag="h1"
            className="font-display text-[clamp(1.6rem,2.7vw,2.2rem)] leading-[1.1] text-peach"
            splitType="words"
            delay={60}
            duration={0.9}
            from={{ opacity: 0, y: 36 }}
            to={{ opacity: 1, y: 0 }}
            textAlign="center"
            trigger="load"
          />
          <p className="mt-1 font-script text-[clamp(2.2rem,4.2vw,3.2rem)] leading-none text-kraft">nas Mercês.</p>
          <p className="mt-4 text-[.78rem] font-bold uppercase tracking-[.3em]">
            <ShinyText text="Padaria · Café · Almoço" color="#c8a47a" shineColor="#ffffff" speed={3} />
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Magnet padding={60} magnetStrength={4}>
              <a href="#cardapio" className="btn btn-kraft">
                Ver o cardápio <IconArrow />
              </a>
            </Magnet>
            <a href="#encomendas" className="btn btn-line text-peach">
              Fazer encomenda
            </a>
          </div>

          <a
            href="#contato"
            className="mt-5 inline-flex items-center gap-2 rounded-md border-2 border-peach/70 px-4 py-2 text-sm text-peach transition-colors hover:bg-white/10"
          >
            <span className="size-2.5 animate-pulse rounded-full bg-kraft" aria-hidden />
            <span>
              <b>{today.b}</b>
              {today.r}
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
