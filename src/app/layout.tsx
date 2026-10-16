import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { StoreProvider } from "@/lib/store";

const caprasimo = localFont({ src: "./fonts/caprasimo.woff2", variable: "--font-caprasimo", display: "swap", weight: "400" });
const yellowtail = localFont({ src: "./fonts/yellowtail.woff2", variable: "--font-yellowtail", display: "swap", weight: "400" });
const bricolage = localFont({ src: "./fonts/bricolage.woff2", variable: "--font-bricolage", display: "swap", weight: "400 700" });

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Casa Andina Panificadora e Confeitaria • Mercês, Curitiba",
  description:
    "Padaria, café e almoço nas Mercês, em Curitiba. Veja o cardápio, monte seu pedido e confirme pelo WhatsApp.",
  icons: { icon: "/assets/logo.jpg" },
  openGraph: {
    title: "Casa Andina Panificadora e Confeitaria • Mercês, Curitiba",
    description: "Padaria, café e almoço. Produtos fresquinhos todos os dias. Feijoada aos sábados.",
    images: ["/assets/logo.jpg"],
    locale: "pt_BR",
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#14100e" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${caprasimo.variable} ${yellowtail.variable} ${bricolage.variable}`}>
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
