"use client";

import ScrollVelocity from "@/components/reactbits/ScrollVelocity";

export default function Band() {
  return (
    <section aria-label="Padaria, café e almoço" className="relative overflow-hidden border-y-4 border-kraft bg-ink py-5 text-kraft">
      <ScrollVelocity
        texts={[
          "Padaria  ✦  Café  ✦  Almoço  ✦  Feijoada aos sábados  ✦  Encomendas",
          "Produtos fresquinhos todos os dias  ✦  Mercês, Curitiba",
        ]}
        velocity={45}
        className="font-display uppercase tracking-wide"
        fontSize="clamp(1.5rem, 3.2vw, 2.6rem)"
        gap={40}
        fadeEdges
        color="#c8a47a"
        skewWithVelocity={4}
      />
    </section>
  );
}
