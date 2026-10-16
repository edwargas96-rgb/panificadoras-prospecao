import ClickSpark from "@/components/reactbits/ClickSpark";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import Floating from "@/components/site/Floating";
import BasketDialog from "@/components/site/BasketDialog";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClickSpark sparkColor={["#c8a47a", "#8a5a33", "#f4efe6"]} sparkCount={9} sparkSize={11} sparkRadius={22} duration={520}>
      <Header />
      <main id="conteudo">{children}</main>
      <Footer />
      <Floating />
      <BasketDialog />
    </ClickSpark>
  );
}
