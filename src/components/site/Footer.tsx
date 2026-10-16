import { SITE } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="border-t-4 border-kraft bg-ink px-5 pb-28 pt-12 text-center text-peach/80">
      <div className="mx-auto flex w-[min(1180px,100%)] flex-col items-center gap-3">
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/logo.jpg" alt="" width={56} height={56} className="size-14 rounded-full border-2 border-kraft object-cover" />
          <span className="flex flex-col text-left leading-none">
            <span className="font-display text-2xl text-peach">Casa Andina</span>
            <span className="mt-1 text-[.6rem] font-bold uppercase tracking-[.3em] text-kraft">Panificadora e Confeitaria</span>
          </span>
        </div>
        <p className="font-script text-3xl text-kraft">Produtos fresquinhos todos os dias.</p>
        <p className="text-sm">
          {[["Instagram", SITE.instagram], ["Facebook", SITE.facebook], ["iFood", SITE.ifood], ["Linktree", SITE.linktree]].map(([l, h], i) => (
            <span key={l}>
              {i > 0 && " · "}
              <a href={h} target="_blank" rel="noopener noreferrer" className="underline decoration-kraft underline-offset-4 hover:text-kraft">{l}</a>
            </span>
          ))}
        </p>
        <p className="text-xs text-peach/50">
          © 2026 {SITE.fullName} · <a href="/admin" className="underline-offset-4 hover:underline">Painel (demo)</a>
        </p>
      </div>
    </footer>
  );
}
