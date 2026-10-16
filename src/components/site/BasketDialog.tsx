"use client";

import { useEffect, useRef, useState } from "react";
import { IconWhats } from "@/components/icons";
import { money, num } from "@/lib/format";
import { unitShort, unitWord, useStore } from "@/lib/store";
import { waLink } from "@/lib/config";

export default function BasketDialog() {
  const { basket, byId, basketOpen, setBasketOpen, changeBasket, clearBasket, estimate, buildMessage } = useStore();
  const ref = useRef<HTMLDialogElement>(null);
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [min, setMin] = useState("");

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (basketOpen && !d.open) d.showModal();
    if (!basketOpen && d.open) d.close();
  }, [basketOpen]);

  useEffect(() => {
    const t = new Date();
    t.setMinutes(t.getMinutes() - t.getTimezoneOffset());
    setMin(t.toISOString().slice(0, 10));
  }, []);

  const est = estimate();
  const href = waLink(buildMessage(date, notes));

  return (
    <dialog
      id="basket"
      ref={ref}
      onClose={() => setBasketOpen(false)}
      onClick={(e) => e.target === ref.current && setBasketOpen(false)}
      aria-labelledby="basket-title"
      className="m-auto max-h-[92dvh] w-[min(480px,calc(100%-16px))] overflow-hidden rounded-2xl border-2 border-ink bg-paper p-0 text-ink shadow-[8px_8px_0_#14100e]"
    >
      <div className="flex items-center justify-between border-b-2 border-ink bg-sand px-6 py-4">
        <h2 id="basket-title" className="font-display text-2xl">Meu pedido</h2>
        <button type="button" aria-label="Fechar meu pedido" onClick={() => setBasketOpen(false)} className="grid size-9 place-items-center rounded-md border-2 border-ink text-xl leading-none">×</button>
      </div>

      <div className="max-h-[calc(92dvh-72px)] overflow-y-auto px-6 py-5">
        {basket.length === 0 ? (
          <div className="py-8 text-center">
            <p className="font-display text-2xl">Seu pedido está vazio.</p>
            <p className="mt-2 text-mute">Toque no <b>+</b> ao lado de um item do cardápio para adicionar.</p>
            <a href="#cardapio" onClick={() => setBasketOpen(false)} className="btn btn-line mt-6">Voltar ao cardápio</a>
          </div>
        ) : (
          <>
            <ul className="divide-y divide-dashed divide-ink/20">
              {basket.map(([id, q]) => {
                const p = byId(id)!;
                return (
                  <li key={id} className="flex items-center justify-between gap-3 py-3">
                    <div className="min-w-0">
                      <p className="font-semibold leading-snug">{p.name}</p>
                      <p className="text-sm text-mute">{p.price != null ? `${money(p.price)} / ${unitShort(p)}` : "Sob consulta"}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-1">
                      <button type="button" aria-label={`Diminuir ${p.name}`} onClick={() => changeBasket(id, -1)} className="grid size-9 place-items-center rounded-md border-2 border-ink bg-white text-lg font-semibold">−</button>
                      <output className="min-w-[4.6rem] text-center text-sm font-semibold">{num(q)} {unitWord(p.unit, q)}</output>
                      <button type="button" aria-label={`Aumentar ${p.name}`} onClick={() => changeBasket(id, 1)} className="grid size-9 place-items-center rounded-md border-2 border-ink bg-white text-lg font-semibold">+</button>
                    </div>
                  </li>
                );
              })}
            </ul>

            <p className="mt-4 flex items-baseline justify-between border-t-2 border-ink pt-4">
              <span className="text-sm font-bold uppercase tracking-[.1em] text-mute">Estimativa dos itens</span>
              <strong className="font-display text-3xl text-wine">{est.total > 0 ? money(est.total) : "Sob consulta"}</strong>
            </p>
            <p className="mt-1 text-xs text-mute">
              Sem decoração e personalização.{est.pending ? " Itens sob consulta não entram na estimativa." : ""} O valor final é confirmado pelo WhatsApp.
            </p>

            <label className="mt-5 block text-sm font-semibold">
              Data desejada (opcional)
              <input type="date" min={min} value={date} onChange={(e) => setDate(e.target.value)} className="mt-1 w-full rounded-md border-2 border-ink bg-white px-3 py-2.5 font-normal" />
            </label>
            <label className="mt-4 block text-sm font-semibold">
              Conte um detalhe do seu pedido (opcional)
              <textarea rows={3} maxLength={600} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Tema da festa, sabores, dia da retirada..." className="mt-1 w-full resize-y rounded-md border-2 border-ink bg-white px-3 py-2.5 font-normal" />
            </label>

            <a href={href} target="_blank" rel="noopener noreferrer" className="btn btn-kraft mt-6 w-full">
              <IconWhats className="size-5" /> Enviar pedido pelo WhatsApp
            </a>
            <p className="mt-3 text-center text-xs text-mute">A mensagem abre no WhatsApp para você revisar antes de enviar.</p>
            <button type="button" onClick={clearBasket} className="mx-auto mt-4 block text-sm underline text-mute">Limpar pedido</button>
          </>
        )}
      </div>
    </dialog>
  );
}
