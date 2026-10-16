"use client";

import AnimatedContent from "@/components/reactbits/AnimatedContent";
import ShinyText from "@/components/reactbits/ShinyText";
import { IconWhats } from "@/components/icons";
import { waLink } from "@/lib/config";

const STEPS = [
  ["Escolha no cardápio", "Na aba Encomendas, adicione salgados, docinhos, bolos e coffee break ao seu pedido."],
  ["Combine pelo WhatsApp", "Data, quantidade e detalhes. O orçamento é aprovado com 24h de antecedência."],
  ["Combine os detalhes", "Dia e horário do pedido, pelo mesmo chat."],
];

export default function Occasion() {
  return (
    <section id="encomendas" className="bg-ink py-20 text-peach md:py-28">
      <div className="mx-auto grid w-[min(1180px,100%-32px)] gap-12 md:grid-cols-2 md:items-center md:gap-16">
        <AnimatedContent distance={40} duration={0.8}>
          <p className="eyebrow !text-kraft">Festas, reuniões e eventos</p>
          <h2 className="mt-3 font-display text-[clamp(2rem,4.6vw,3.3rem)] leading-[1.05]">
            Seu evento, com o toque <span className="font-script text-kraft">da Casa Andina.</span>
          </h2>
          <p className="mt-5 max-w-lg text-lg text-peach/80">
            Salgados para festa, sanduíches de metro, docinhos, bolos confeitados e coffee break.
          </p>
          <a
            href={waLink("Olá, Casa Andina! Gostaria de um orçamento de encomenda. Podemos conversar sobre a data e a quantidade?")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-kraft mt-8"
          >
            <IconWhats className="size-5" />
            <ShinyText text="Conversar sobre minha encomenda" color="#14100e" shineColor="#ffffff" speed={3.2} />
          </a>
          <p className="mt-4 text-sm text-peach/60">Orçamentos solicitados e aprovados com 24h de antecedência.</p>
        </AnimatedContent>

        <ol className="grid gap-0">
          {STEPS.map(([t, d], i) => (
            <AnimatedContent key={t} distance={30} delay={0.1 + i * 0.12} duration={0.7}>
              <li className="flex gap-5 border-b border-peach/15 py-6 first:pt-0 last:border-0">
                <span className="grid size-12 shrink-0 place-items-center rounded-md border-2 border-kraft bg-kraft font-display text-2xl text-ink">{i + 1}</span>
                <div>
                  <h3 className="font-display text-xl">{t}</h3>
                  <p className="mt-1 text-peach/70">{d}</p>
                </div>
              </li>
            </AnimatedContent>
          ))}
        </ol>
      </div>
    </section>
  );
}
