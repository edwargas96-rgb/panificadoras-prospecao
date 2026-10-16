"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

const NAV = [
  { href: "/admin", label: "Visão geral", d: "M4 13h6V4H4v9Zm0 7h6v-5H4v5Zm10 0h6v-9h-6v9Zm0-16v5h6V4h-6Z" },
  { href: "/admin/produtos", label: "Produtos", d: "M20 7 12 3 4 7m16 0-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" },
  { href: "/admin/financeiro", label: "Financeiro", d: "M12 3v18m4-14H10a3 3 0 0 0 0 6h4a3 3 0 0 1 0 6H8" },
];

export default function PanelLayout({ children }: { children: ReactNode }) {
  const path = usePathname();
  const router = useRouter();
  const [ok, setOk] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let logged = false;
    try { logged = sessionStorage.getItem("casa-andina:admin") === "1"; } catch {}
    if (!logged) router.replace("/admin/login");
    else setOk(true);
  }, [router]);

  useEffect(() => setOpen(false), [path]);

  if (!ok) return <div className="min-h-dvh bg-[#f5f2ec]" />;

  const logout = () => {
    try { sessionStorage.removeItem("casa-andina:admin"); } catch {}
    router.replace("/admin/login");
  };

  const sidebar = (
    <div className="flex h-full flex-col bg-ink text-peach">
      <div className="flex items-center gap-3 px-5 py-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/logo.jpg" alt="" className="size-11 rounded-full border-2 border-kraft object-cover" />
        <div className="leading-none">
          <b className="font-display text-xl">Casa Andina</b>
          <span className="mt-1 block text-[.58rem] font-bold uppercase tracking-[.28em] text-kraft">Painel</span>
        </div>
      </div>
      <nav className="flex-1 space-y-1 px-3">
        {NAV.map((n) => {
          const active = n.href === "/admin" ? path === "/admin" : path.startsWith(n.href);
          return (
            <Link
              key={n.href}
              href={n.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${active ? "bg-kraft text-ink" : "text-peach/80 hover:bg-white/10"}`}
            >
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={n.d} /></svg>
              {n.label}
            </Link>
          );
        })}
      </nav>
      <div className="space-y-2 border-t border-white/10 p-4 text-sm">
        <a href="/" className="block rounded-lg px-3 py-2 text-peach/80 hover:bg-white/10">← Ver o site</a>
        <button type="button" onClick={logout} className="block w-full rounded-lg px-3 py-2 text-left text-peach/80 hover:bg-white/10">Sair</button>
        <p className="px-3 pt-1 text-xs text-peach/40">Modo demonstração</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-dvh bg-[#f5f2ec] text-ink">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 lg:block">{sidebar}</aside>

      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-ink/10 bg-white/90 px-4 py-3 backdrop-blur lg:hidden">
        <button type="button" onClick={() => setOpen(true)} aria-label="Abrir menu" className="rounded-md border-2 border-ink px-3 py-1.5 text-sm font-bold">Menu</button>
        <b className="font-display text-lg">Casa Andina · Painel</b>
        <span className="w-[72px]" />
      </div>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button type="button" aria-label="Fechar menu" onClick={() => setOpen(false)} className="absolute inset-0 bg-black/50" />
          <div className="relative h-full w-64 max-w-[80%]">{sidebar}</div>
        </div>
      )}

      <main className="lg:pl-64">
        <div className="mx-auto max-w-[1180px] px-4 py-6 sm:px-6 lg:py-8">{children}</div>
      </main>
    </div>
  );
}
