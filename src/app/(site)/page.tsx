import Hero from "@/components/site/Hero";
import Welcome from "@/components/site/Welcome";
import Band from "@/components/site/Band";
import Rail from "@/components/site/Rail";
import Catalog from "@/components/site/Catalog";
import Occasion from "@/components/site/Occasion";
import MealCards from "@/components/site/MealCards";
import Visit from "@/components/site/Visit";
import { SITE } from "@/lib/config";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Bakery",
  name: SITE.fullName,
  telephone: "+55 41 3121-2595",
  address: { "@type": "PostalAddress", streetAddress: "Avenida Manoel Ribas, 867", addressLocality: "Curitiba", addressRegion: "PR", addressCountry: "BR" },
  openingHours: ["Mo-Fr 07:00-19:30", "Sa 07:30-19:00"],
  sameAs: [SITE.instagram],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <Welcome />
      <Band />
      <Rail />
      <Catalog />
      <Occasion />
      <MealCards />
      <Visit />
    </>
  );
}
