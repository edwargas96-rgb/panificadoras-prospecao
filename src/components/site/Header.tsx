"use client";

import { useEffect, useState } from "react";
import { IconBag } from "@/components/icons";
import { useStore } from "@/lib/store";

const LINKS = [
  ["#inicio", "Home"],
  ["#cardapio", "Cardápio"],
  ["#encomendas", "Encomendas"],
  ["#almoco", "Almoço"],
  ["#contato", "Contato"],
] as const;

export default function Header() {
  const { basketCount, setBasketOpen } = useStore();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b-4 border-kraft bg-ink text-peach transition-shadow ${scrolled ? "shadow-[0_8px_24px_rgba(0,0,0,.35)]" : ""}`}
    >
      <div className="mx-auto flex h-[72px] w-[min(1180px,100%-32px)] items-center gap-4">
        <a href="#inicio" className="flex items-center gap-3" aria-label="Casa Andina, início">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/logo.jpg" alt="" width={52} height={52} className="size-[46px] rounded-full border-2 border-kraft bg-black object-cover" />
          <span className="flex flex-col leading-none">
            <span className="font-display text-[1.45rem] tracking-wide text-peach">Casa Andina</span>
            <span className="mt-1 text-[.56rem] font-bold uppercase tracking-[.3em] text-kraft">Panificadora e Confeitaria</span>
          </span>
        </a>

        <nav
          aria-label="Navegação principal"
          className={`${open ? "flex" : "hidden"} absolute left-0 right-0 top-full flex-col border-b-4 border-kraft bg-ink px-5 pb-4 pt-2 md:static md:ml-auto md:flex md:flex-row md:gap-8 md:border-0 md:bg-transparent md:p-0`}
        >
          {LINKS.map(([href, label]) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="border-b border-white/10 py-3 text-[.78rem] font-bold uppercase tracking-[.16em] text-peach transition-colors hover:text-kraft md:border-0 md:py-1"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 md:ml-6">
          <button
            type="button"
            onClick={() => setBasketOpen(true)}
            aria-label="Abrir meu pedido"
            className="relative inline-flex h-11 items-center gap-2 rounded-md border-2 border-peach px-3 text-sm font-semibold transition-colors hover:border-kraft hover:bg-kraft hover:text-ink sm:px-4"
          >
            <IconBag className="size-5" />
            <span className="hidden sm:inline">Meu pedido</span>
            {basketCount > 0 && (
              <span className="absolute -right-2 -top-2 grid size-6 place-items-center rounded-full border-2 border-ink bg-kraft text-xs font-bold text-ink">
                {basketCount}
              </span>
            )}
          </button>
          <button
            type="button"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="h-11 rounded-md border-2 border-peach px-4 text-sm font-semibold md:hidden"
          >
            Menu
          </button>
        </div>
      </div>
    </header>
  );
}
