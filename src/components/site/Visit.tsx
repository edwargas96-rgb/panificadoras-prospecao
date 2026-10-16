"use client";

import SpotlightCard from "@/components/reactbits/SpotlightCard";
import AnimatedContent from "@/components/reactbits/AnimatedContent";
import { IconWhats } from "@/components/icons";
import { SITE, waLink } from "@/lib/config";

export default function Visit() {
  return (
    <section id="contato" className="bg-sand py-20 md:py-28">
      <div className="mx-auto grid w-[min(1180px,100%-32px)] gap-10 md:grid-cols-2 md:gap-14">
        <AnimatedContent distance={40} duration={0.8}>
          <p className="eyebrow">Um endereço para guardar</p>
          <h2 className="mt-3 font-display text-[clamp(2.1rem,5vw,3.6rem)] leading-[1.02]">
            Nos vemos nas <span className="font-script text-kraft-d">Mercês</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed">
            {SITE.address}
            <br />
            {SITE.district}
          </p>
          <a href={SITE.mapsLink} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block font-semibold underline decoration-kraft-d decoration-[3px] underline-offset-[6px]">
            Abrir a localização no mapa
          </a>
          <div className="mt-8 overflow-hidden rounded-xl border-2 border-ink shadow-[6px_6px_0_#14100e]">
            <iframe title="Mapa da Casa Andina" loading="lazy" src={SITE.mapsEmbed} className="h-[300px] w-full border-0" />
          </div>
        </AnimatedContent>

        <AnimatedContent distance={40} delay={0.12} duration={0.8}>
          <SpotlightCard theme="light" className="rounded-2xl p-7 md:p-9" spotlightColor="#c8a47a" intensity={0.3}>
            <span className="eyebrow">Funcionamento</span>
            <div className="mt-3 divide-y divide-dashed divide-ink/20">
              {SITE.hours.map((h) => (
                <p key={h.label} className="flex justify-between gap-4 py-2.5">
                  <span className="text-mute">{h.label}</span>
                  <strong>{h.value}</strong>
                </p>
              ))}
            </div>
            <small className="mt-2 block text-mute">Telefone: {SITE.phone}.</small>

            <div className="mt-7">
              <span className="eyebrow">Delivery e encomendas</span>
              <p className="mt-2 text-mute">
                Delivery pelo{" "}
                <a className="font-semibold text-ink underline decoration-kraft decoration-[3px] underline-offset-4" href={SITE.ifood} target="_blank" rel="noopener noreferrer">iFood</a>. Encomendas e retirada na loja pelo WhatsApp. ·{" "}
                <a className="font-semibold text-ink underline decoration-kraft decoration-[3px] underline-offset-4" href={SITE.linktree} target="_blank" rel="noopener noreferrer">Linktree</a>
              </p>
            </div>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn btn-kraft mt-8 w-full sm:w-auto">
              <IconWhats className="size-5" /> Falar com a Casa Andina
            </a>
          </SpotlightCard>
        </AnimatedContent>
      </div>
    </section>
  );
}
