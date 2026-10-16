"use client";

import { IconBag, IconWhats } from "@/components/icons";
import { useStore } from "@/lib/store";
import { waLink } from "@/lib/config";

export default function Floating() {
  const { basketCount, setBasketOpen } = useStore();
  return (
    <div className="fixed bottom-4 right-4 z-40">
      {basketCount > 0 ? (
        <button type="button" onClick={() => setBasketOpen(true)} className="btn btn-kraft rounded-md shadow-[0_8px_24px_rgba(0,0,0,.35)]">
          <IconBag className="size-5" /> Meu pedido
          <b className="grid size-6 place-items-center rounded-full bg-ink text-xs text-kraft">{basketCount}</b>
        </button>
      ) : (
        <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn btn-kraft rounded-md shadow-[0_8px_24px_rgba(0,0,0,.35)]">
          <IconWhats className="size-5" /> Fazer pedido
        </a>
      )}
    </div>
  );
}
