const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
export const money = (n: number) => brl.format(n);
export const num = (n: number) => String(n).replace(".", ",");
export const round2 = (n: number) => Math.round(n * 100) / 100;

export const slug = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const norm = (s: string) =>
  (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
