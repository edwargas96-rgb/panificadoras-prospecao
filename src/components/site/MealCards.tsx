"use client";

import SpotlightCard from "@/components/reactbits/SpotlightCard";
import CountUp from "@/components/reactbits/CountUp";
import AnimatedContent from "@/components/reactbits/AnimatedContent";

const go = (cat: string) => () => window.dispatchEvent(new CustomEvent("catalog:set", { detail: cat }));

export default function MealCards() {
  return (
    <section id="almoco" className="bg-ink-2 py-20 text-peach md:py-24">
      <div className="mx-auto w-[min(1180px,100%-32px)]">
        <p className="eyebrow !text-kraft">Almoço e feijoada</p>
        <h2 className="mt-3 font-display text-[clamp(2rem,4.4vw,3.2rem)] leading-none">
          Uma pausa para <span className="font-script text-kraft">almoçar</span>
        </h2>
        <p className="mt-4 max-w-xl text-peach/70">Massas de segunda a sexta e feijoada aos sábados.</p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <AnimatedContent distance={40} duration={0.8}>
            <SpotlightCard theme="dark" className="h-full rounded-2xl p-7" spotlightColor="#c8a47a" intensity={0.25}>
              <p className="text-[.7rem] font-bold uppercase tracking-[.2em] text-kraft">Segunda a sexta · 11h30 às 14h30</p>
              <h3 className="mt-2 font-display text-3xl">Massas Andina</h3>
              <p className="mt-1 font-display text-2xl text-kraft">
                a partir de <CountUp to={26.9} decimals={2} prefix="R$ " separator="." duration={1.6} />
              </p>
              <p className="mt-4 text-peach/75">
                Escolha o seu prato e monte à sua maneira: talharim, espaguete, penne ou nhoque, com molho 4 queijos, pesto, sugo ou bolonhesa, e bife, frango ou parmegiana.
              </p>
              <a href="#cardapio" onClick={go("almoco")} className="btn btn-kraft mt-6">Ver o almoço</a>
            </SpotlightCard>
          </AnimatedContent>

          <AnimatedContent distance={40} delay={0.12} duration={0.8}>
            <SpotlightCard theme="dark" className="h-full rounded-2xl p-7" spotlightColor="#d3141e" intensity={0.3}>
              <p className="text-[.7rem] font-bold uppercase tracking-[.2em] text-kraft">Sábado · 12h às 15h</p>
              <h3 className="mt-2 font-display text-3xl">Feijoada de sábado</h3>
              <p className="mt-1 font-display text-2xl text-kraft">
                <CountUp to={28.9} decimals={2} prefix="R$ " separator="." duration={1.6} />
              </p>
              <p className="mt-4 text-peach/75">
                Arroz, couve, farofa, vinagrete, torresmo e feijoada servida separadamente, nas versões light ou tradicional. Também disponível para viagem.
              </p>
              <a href="#cardapio" onClick={go("feijoada")} className="btn btn-kraft mt-6">Ver a feijoada</a>
            </SpotlightCard>
          </AnimatedContent>
        </div>
      </div>
    </section>
  );
}
