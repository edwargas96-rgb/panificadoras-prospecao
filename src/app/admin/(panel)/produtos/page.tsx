"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { DemoBanner, PageTitle, Panel } from "@/components/admin/ui";
import { CATEGORIES, type Product, type Unit } from "@/lib/menu";
import { money, norm } from "@/lib/format";
import { useStore } from "@/lib/store";

type Draft = {
  name: string; cat: string; group: string; price: string; unit: Unit; desc: string; min: string; active: boolean; photo?: string;
};
const EMPTY: Draft = { name: "", cat: CATEGORIES[0].id, group: "", price: "", unit: "unidade", desc: "", min: "", active: true };
const UNITS: Unit[] = ["unidade", "kg", "cento", "pessoa", "garrafa"];

// reduz a foto antes de guardar (o navegador tem pouco espaço para imagens grandes)
function shrink(file: File, max = 640): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const k = Math.min(1, max / Math.max(img.width, img.height));
      const c = document.createElement("canvas");
      c.width = Math.round(img.width * k);
      c.height = Math.round(img.height * k);
      c.getContext("2d")!.drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url);
      resolve(c.toDataURL("image/jpeg", 0.82));
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("imagem inválida")); };
    img.src = url;
  });
}

export default function Produtos() {
  const { products, addProduct, updateProduct, removeProduct, resetProducts } = useStore();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("todas");
  const [editing, setEditing] = useState<string | null>(null); // id ou "novo"
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [toast, setToast] = useState("");
  const [confirm, setConfirm] = useState<Product | null>(null);
  const dlg = useRef<HTMLDialogElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const groups = useMemo(() => Array.from(new Set(products.filter((p) => p.cat === draft.cat).map((p) => p.group).filter(Boolean))), [products, draft.cat]);

  const rows = useMemo(() => {
    const nq = norm(q.trim());
    return products.filter((p) => (cat === "todas" || p.cat === cat) && (!nq || norm(`${p.name} ${p.desc ?? ""}`).includes(nq)));
  }, [products, q, cat]);

  useEffect(() => {
    const d = dlg.current;
    if (!d) return;
    if (editing && !d.open) d.showModal();
    if (!editing && d.open) d.close();
  }, [editing]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  const openNew = () => { setDraft(EMPTY); setEditing("novo"); };
  const openEdit = (p: Product) => {
    setDraft({ name: p.name, cat: p.cat, group: p.group, price: p.price == null ? "" : String(p.price).replace(".", ","), unit: p.unit, desc: p.desc ?? "", min: p.min ? String(p.min) : "", active: p.active !== false, photo: p.photo });
    setEditing(p.id);
  };

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    const price = draft.price.trim() === "" ? null : Number(draft.price.replace(/\./g, "").replace(",", "."));
    if (price != null && (Number.isNaN(price) || price < 0)) return setToast("Preço inválido");
    const min = draft.min.trim() === "" ? undefined : Number(draft.min.replace(",", "."));
    const data = { name: draft.name.trim(), cat: draft.cat, group: draft.group.trim(), price, unit: draft.unit, desc: draft.desc.trim() || undefined, min, active: draft.active, photo: draft.photo };
    if (editing === "novo") {
      addProduct(data);
      setToast("Produto cadastrado. Já aparece no cardápio do site.");
    } else if (editing) {
      updateProduct(editing, data);
      setToast("Produto atualizado.");
    }
    setEditing(null);
  };

  const onFile = async (f?: File | null) => {
    if (!f) return;
    try { setDraft((d) => ({ ...d, photo: undefined })); const url = await shrink(f); setDraft((d) => ({ ...d, photo: url })); }
    catch { setToast("Não consegui ler essa imagem."); }
  };

  const active = products.filter((p) => p.active !== false).length;
  const catLabel = (id: string) => CATEGORIES.find((c) => c.id === id)?.label ?? id;
  const field = "mt-1 w-full rounded-md border-2 border-ink bg-white px-3 py-2.5 font-normal";

  return (
    <>
      <PageTitle
        title="Produtos"
        sub="Cadastre e edite os itens do cardápio. O que você salvar aparece no site."
        action={<button type="button" onClick={openNew} className="btn btn-kraft !rounded-md !px-5 !py-2.5">+ Novo produto</button>}
      />
      <DemoBanner />

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[["Total", products.length], ["Ativos", active], ["Inativos", products.length - active], ["Com foto", products.filter((p) => p.photo).length]].map(([l, v]) => (
          <div key={l as string} className="rounded-xl border border-ink/10 bg-white px-4 py-3">
            <p className="text-[.68rem] font-bold uppercase tracking-[.14em] text-mute">{l}</p>
            <p className="font-display text-2xl">{v}</p>
          </div>
        ))}
      </div>

      <Panel>
        <div className="mb-4 flex flex-col gap-3 sm:flex-row">
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar produto..." aria-label="Buscar produto" className="w-full rounded-md border-2 border-ink px-3 py-2.5 sm:max-w-xs" />
          <select value={cat} onChange={(e) => setCat(e.target.value)} aria-label="Filtrar por categoria" className="rounded-md border-2 border-ink bg-white px-3 py-2.5">
            <option value="todas">Todas as categorias</option>
            {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
          </select>
          <button type="button" onClick={() => { if (window.confirm("Restaurar o cardápio original? Os produtos cadastrados por você serão removidos.")) { resetProducts(); setToast("Cardápio original restaurado."); } }} className="text-sm underline text-mute sm:ml-auto">
            Restaurar cardápio original
          </button>
        </div>

        <div className="-mx-2 overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="text-[.68rem] uppercase tracking-[.12em] text-mute">
              <tr><th className="px-2 pb-2">Produto</th><th className="px-2 pb-2">Categoria</th><th className="px-2 pb-2">Preço</th><th className="px-2 pb-2">Ativo</th><th className="px-2 pb-2 text-right">Ações</th></tr>
            </thead>
            <tbody className="divide-y divide-ink/8">
              {rows.slice(0, 120).map((p) => (
                <tr key={p.id} className={p.active === false ? "opacity-50" : ""}>
                  <td className="px-2 py-2.5">
                    <div className="flex items-center gap-3">
                      {p.photo ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={p.photo} alt="" className="size-11 shrink-0 rounded-md object-cover" />
                      ) : (
                        <span className="grid size-11 shrink-0 place-items-center rounded-md bg-ink/8 text-[.6rem] font-bold uppercase text-mute">sem foto</span>
                      )}
                      <div className="min-w-0">
                        <b className="block truncate">{p.name}</b>
                        <span className="block max-w-[320px] truncate text-xs text-mute">{p.group || "—"}{p.min ? ` · mín. ${p.min}` : ""}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-2 py-2.5">{catLabel(p.cat)}</td>
                  <td className="px-2 py-2.5 font-semibold">{p.price == null ? <span className="font-normal text-mute">Sob consulta</span> : <>{money(p.price)} <span className="text-xs font-normal text-mute">/{p.unit === "unidade" ? "unid." : p.unit}</span></>}</td>
                  <td className="px-2 py-2.5">
                    <button type="button" role="switch" aria-checked={p.active !== false} aria-label={`Ativar ${p.name}`} onClick={() => updateProduct(p.id, { active: p.active === false })} className={`relative h-6 w-11 rounded-full transition-colors ${p.active !== false ? "bg-emerald-500" : "bg-ink/25"}`}>
                      <span className={`absolute top-0.5 size-5 rounded-full bg-white shadow transition-all ${p.active !== false ? "left-[22px]" : "left-0.5"}`} />
                    </button>
                  </td>
                  <td className="px-2 py-2.5 text-right">
                    <button type="button" onClick={() => openEdit(p)} className="rounded-md px-2 py-1 font-semibold underline decoration-kraft decoration-2 underline-offset-4">Editar</button>
                    <button type="button" onClick={() => setConfirm(p)} className="rounded-md px-2 py-1 text-red-700">Excluir</button>
                  </td>
                </tr>
              ))}
              {!rows.length && <tr><td colSpan={5} className="px-2 py-10 text-center text-mute">Nenhum produto encontrado.</td></tr>}
            </tbody>
          </table>
        </div>
        {rows.length > 120 && <p className="mt-3 text-xs text-mute">Mostrando 120 de {rows.length}. Use a busca ou o filtro para ver o resto.</p>}
      </Panel>

      <dialog
        ref={dlg}
        onClose={() => setEditing(null)}
        onClick={(e) => e.target === dlg.current && setEditing(null)}
        className="m-auto max-h-[94dvh] w-[min(620px,calc(100%-16px))] overflow-hidden rounded-2xl border-2 border-ink bg-paper p-0 text-ink shadow-[8px_8px_0_#14100e]"
      >
        <form onSubmit={save}>
          <div className="flex items-center justify-between border-b-2 border-ink bg-sand px-6 py-4">
            <h2 className="font-display text-2xl">{editing === "novo" ? "Novo produto" : "Editar produto"}</h2>
            <button type="button" aria-label="Fechar" onClick={() => setEditing(null)} className="grid size-9 place-items-center rounded-md border-2 border-ink text-xl leading-none">×</button>
          </div>
          <div className="grid max-h-[calc(94dvh-150px)] gap-4 overflow-y-auto px-6 py-5 sm:grid-cols-2">
            <label className="text-sm font-semibold sm:col-span-2">Nome
              <input required value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} className={field} placeholder="Ex.: Torta de limão" />
            </label>
            <label className="text-sm font-semibold">Categoria
              <select value={draft.cat} onChange={(e) => setDraft({ ...draft, cat: e.target.value })} className={field}>
                {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
              </select>
            </label>
            <label className="text-sm font-semibold">Grupo (opcional)
              <input list="grupos" value={draft.group} onChange={(e) => setDraft({ ...draft, group: e.target.value })} className={field} placeholder="Ex.: Doces finos" />
              <datalist id="grupos">{groups.map((g) => <option key={g} value={g} />)}</datalist>
            </label>
            <label className="text-sm font-semibold">Preço (R$)
              <input inputMode="decimal" value={draft.price} onChange={(e) => setDraft({ ...draft, price: e.target.value })} className={field} placeholder="Vazio = sob consulta" />
            </label>
            <label className="text-sm font-semibold">Vendido por
              <select value={draft.unit} onChange={(e) => setDraft({ ...draft, unit: e.target.value as Unit })} className={field}>
                {UNITS.map((u) => <option key={u} value={u}>{u}</option>)}
              </select>
            </label>
            <label className="text-sm font-semibold sm:col-span-2">Descrição
              <textarea rows={3} value={draft.desc} onChange={(e) => setDraft({ ...draft, desc: e.target.value })} className={`${field} resize-y`} placeholder="Ingredientes, tamanho, observações..." />
            </label>
            <label className="text-sm font-semibold">Pedido mínimo (opcional)
              <input inputMode="decimal" value={draft.min} onChange={(e) => setDraft({ ...draft, min: e.target.value })} className={field} placeholder="Ex.: 20" />
            </label>
            <label className="flex items-center gap-3 self-end pb-2.5 text-sm font-semibold">
              <input type="checkbox" checked={draft.active} onChange={(e) => setDraft({ ...draft, active: e.target.checked })} className="size-5 accent-[#8a5a33]" />
              Mostrar no cardápio
            </label>

            <div className="sm:col-span-2">
              <p className="text-sm font-semibold">Foto (opcional)</p>
              <div className="mt-2 flex items-center gap-4">
                {draft.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={draft.photo} alt="Prévia da foto" className="size-24 rounded-md border-2 border-ink object-cover" />
                ) : (
                  <span className="grid size-24 place-items-center rounded-md border-2 border-dashed border-ink/40 text-center text-xs text-mute">Sem foto</span>
                )}
                <div className="flex flex-col items-start gap-2">
                  <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => onFile(e.target.files?.[0])} />
                  <button type="button" onClick={() => fileRef.current?.click()} className="btn btn-line !rounded-md !px-4 !py-2">Escolher foto</button>
                  {draft.photo && <button type="button" onClick={() => setDraft({ ...draft, photo: undefined })} className="text-sm underline text-mute">Remover foto</button>}
                  <p className="text-xs text-mute">Produtos com foto entram na vitrine do site.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3 border-t-2 border-ink bg-sand px-6 py-4">
            <button type="button" onClick={() => setEditing(null)} className="btn btn-line !rounded-md">Cancelar</button>
            <button type="submit" className="btn btn-kraft !rounded-md">Salvar produto</button>
          </div>
        </form>
      </dialog>

      {confirm && (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-black/50 p-4" role="alertdialog" aria-modal="true" aria-label="Confirmar exclusão">
          <div className="w-full max-w-sm rounded-2xl border-2 border-ink bg-white p-6 shadow-[8px_8px_0_#14100e]">
            <h3 className="font-display text-xl">Excluir produto?</h3>
            <p className="mt-2 text-sm text-mute">“{confirm.name}” será removido do cardápio do site.</p>
            <div className="mt-6 flex justify-end gap-3">
              <button type="button" onClick={() => setConfirm(null)} className="btn btn-line !rounded-md !px-4 !py-2">Cancelar</button>
              <button type="button" onClick={() => { removeProduct(confirm.id); setConfirm(null); setToast("Produto excluído."); }} className="btn !rounded-md !border-red-700 !bg-red-700 !px-4 !py-2 text-white">Excluir</button>
            </div>
          </div>
        </div>
      )}

      <div aria-live="polite" className="pointer-events-none fixed bottom-5 left-1/2 z-[70] -translate-x-1/2">
        {toast && <p className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-peach shadow-xl">{toast}</p>}
      </div>
    </>
  );
}
