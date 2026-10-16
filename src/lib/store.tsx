"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { PHOTOS, SEED_PRODUCTS, type Product, type Unit } from "./menu";
import { money, num, round2, slug } from "./format";
import { SITE, waLink } from "./config";

const PRODUCTS_KEY = "casa-andina:products:v1";
const BASKET_KEY = "casa-andina:basket:v1";

type Store = {
  products: Product[];
  ready: boolean;
  addProduct: (p: Omit<Product, "id"> & { id?: string }) => Product;
  updateProduct: (id: string, patch: Partial<Product>) => void;
  removeProduct: (id: string) => void;
  resetProducts: () => void;
  byId: (id: string) => Product | undefined;
  basket: [string, number][];
  basketCount: number;
  addToBasket: (id: string) => void;
  changeBasket: (id: string, dir: 1 | -1) => void;
  clearBasket: () => void;
  basketOpen: boolean;
  setBasketOpen: (v: boolean) => void;
  estimate: () => { total: number; pending: boolean };
  buildMessage: (date: string, notes: string) => string;
};

const Ctx = createContext<Store | null>(null);

export const stepOf = (p: Product) => p.step || (p.unit === "kg" ? 0.5 : 1);

export function unitWord(unit: Unit, q: number) {
  if (unit === "kg") return "kg";
  if (unit === "cento") return q > 1 ? "centos" : "cento";
  if (unit === "pessoa") return q > 1 ? "pessoas" : "pessoa";
  if (unit === "garrafa") return q > 1 ? "garrafas" : "garrafa";
  return q > 1 ? "unidades" : "unidade";
}
export const unitShort = (p: Product) => (p.unit === "unidade" ? "unid." : p.unit);

function seed(): Product[] {
  return SEED_PRODUCTS.map((p) => ({ ...p, active: true, photo: PHOTOS[p.id] }));
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(seed);
  const [ready, setReady] = useState(false);
  const [basket, setBasket] = useState<Map<string, number>>(new Map());
  const [basketOpen, setBasketOpen] = useState(false);

  // carrega o que foi salvo neste navegador (produtos cadastrados no admin e pedido em andamento)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(PRODUCTS_KEY);
      if (raw) setProducts(JSON.parse(raw) as Product[]);
    } catch {}
    try {
      const raw = localStorage.getItem(BASKET_KEY);
      if (raw) setBasket(new Map(JSON.parse(raw) as [string, number][]));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    } catch {}
  }, [products, ready]);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(BASKET_KEY, JSON.stringify(Array.from(basket.entries())));
    } catch {}
  }, [basket, ready]);

  const byId = useCallback((id: string) => products.find((p) => p.id === id), [products]);

  const addProduct: Store["addProduct"] = useCallback((p) => {
    let id = p.id || slug(p.name) || `item-${Date.now()}`;
    const taken = new Set(products.map((x) => x.id));
    while (taken.has(id)) id = `${id}-${Math.floor(Math.random() * 900 + 100)}`;
    const created: Product = { active: true, ...p, id };
    setProducts((prev) => [created, ...prev]);
    return created;
  }, [products]);

  const updateProduct = useCallback((id: string, patch: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  }, []);

  const removeProduct = useCallback((id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setBasket((prev) => {
      const next = new Map(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const resetProducts = useCallback(() => {
    setProducts(seed());
    setBasket(new Map());
  }, []);

  const addToBasket = useCallback((id: string) => {
    const p = products.find((x) => x.id === id);
    if (!p) return;
    setBasket((prev) => {
      const next = new Map(prev);
      const cur = next.get(id) || 0;
      next.set(id, cur ? round2(cur + stepOf(p)) : p.min || 1);
      return next;
    });
  }, [products]);

  const changeBasket = useCallback((id: string, dir: 1 | -1) => {
    const p = products.find((x) => x.id === id);
    if (!p) return;
    setBasket((prev) => {
      const next = new Map(prev);
      const n = round2((next.get(id) || 0) + dir * stepOf(p));
      if (n <= 0 || (p.min && n < p.min)) next.delete(id);
      else next.set(id, n);
      return next;
    });
  }, [products]);

  const clearBasket = useCallback(() => setBasket(new Map()), []);

  const items = useMemo(
    () => Array.from(basket.entries()).filter(([id]) => products.some((p) => p.id === id)),
    [basket, products],
  );

  const estimate = useCallback(() => {
    let total = 0;
    let pending = false;
    items.forEach(([id, q]) => {
      const p = products.find((x) => x.id === id)!;
      if (p.price == null) pending = true;
      else total += p.price * q;
    });
    return { total: round2(total), pending };
  }, [items, products]);

  const buildMessage = useCallback(
    (date: string, notes: string) => {
      const lines = [`Olá, ${SITE.name}! Gostaria de fazer um pedido:`, ""];
      items.forEach(([id, q]) => {
        const p = products.find((x) => x.id === id)!;
        const price = p.price != null ? ` (${money(p.price)}/${unitShort(p)})` : " (sob consulta)";
        lines.push(`• ${num(q)} ${unitWord(p.unit, q)} de ${p.name}${price}`);
      });
      const est = estimate();
      lines.push(
        "",
        est.total > 0
          ? `Estimativa dos itens: ${money(est.total)}${est.pending ? " + itens sob consulta" : ""}.`
          : "Os itens estão sob consulta.",
      );
      if (date) {
        const [y, m, d] = date.split("-");
        lines.push(`Data desejada: ${d}/${m}/${y}.`);
      }
      if (notes.trim()) lines.push(`Detalhes: ${notes.trim()}`);
      lines.push("", "Podem me confirmar a disponibilidade e o valor final?");
      return lines.join("\n");
    },
    [items, products, estimate],
  );

  const value: Store = {
    products,
    ready,
    addProduct,
    updateProduct,
    removeProduct,
    resetProducts,
    byId,
    basket: items,
    basketCount: items.length,
    addToBasket,
    changeBasket,
    clearBasket,
    basketOpen,
    setBasketOpen,
    estimate,
    buildMessage,
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useStore fora do StoreProvider");
  return v;
}

export { waLink };
