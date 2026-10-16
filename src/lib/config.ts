export const SITE = {
  name: "Casa Andina",
  fullName: "Casa Andina Panificadora e Confeitaria",
  whatsapp: "554131212595",
  phone: "(41) 3121-2595",
  phoneHref: "tel:+554131212595",
  address: "Av. Manoel Ribas, 867",
  district: "Mercês · Curitiba, PR",
  instagram: "https://www.instagram.com/casaandinapanificadora/",
  facebook: "https://tr.ee/y31WLCZxMl",
  ifood: "https://tr.ee/20fWvJXzsm",
  linktree: "https://linktr.ee/panificadoracasaandina",
  cardapioPdf: "https://drive.google.com/file/d/1Z4i0Kr-3ATvYw-jaF8DI_8yUCBssnhEQ/view",
  mapsEmbed:
    "https://www.google.com/maps?q=Casa+Andina+Panificadora+Avenida+Manoel+Ribas+867+Merc%C3%AAs+Curitiba&output=embed",
  mapsLink:
    "https://www.google.com/maps/search/?api=1&query=Casa%20Andina%20Panificadora%20Avenida%20Manoel%20Ribas%20867%20Merc%C3%AAs%20Curitiba",
  hours: [
    { label: "Segunda a sexta", value: "7h às 19h30" },
    { label: "Sábado", value: "7h30 às 19h" },
    { label: "Feriados", value: "7h30 às 13h30" },
    { label: "Almoço, segunda a sexta", value: "11h30 às 14h30" },
    { label: "Feijoada, sábado", value: "12h às 15h" },
  ],
};

export const waLink = (msg?: string) =>
  `https://wa.me/${SITE.whatsapp}${msg ? `?text=${encodeURIComponent(msg)}` : ""}`;
