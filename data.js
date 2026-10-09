/*
  Dados do site da Lari Panificadora e Confeitaria (DEMO).
  Os itens abaixo são ilustrativos e estão sem preço ("Sob consulta").
  Troque pelo cardápio real da padaria quando ela enviar.

  - Preço: use um número (ex.: 7.5). Preço null aparece como "Sob consulta".
  - Foto de produto: salve em assets/produtos/<id>.jpg e coloque o id em `photos`
    (o id é o nome em minúsculas, sem acento e com hífens: "Torta de Banana" -> torta-de-banana).
*/
(function () {
  function slug(s) {
    return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }

  var products = [];
  var seen = {};

  // add(categoria, grupo, unidade padrão, [[nome, preço, descrição?, unidade?], ...])
  function add(cat, group, unit, items) {
    items.forEach(function (it) {
      var id = slug(it[0]);
      if (seen[id]) id = id + "-" + cat;
      seen[id] = true;
      var p = { id: id, cat: cat, group: group, name: it[0], price: it[1], unit: it[3] || unit };
      if (it[2]) p.desc = it[2];
      products.push(p);
    });
  }

  add("salgados", "", "unidade", [
    ["Coxinha", null, "Massa macia e recheio de frango."],
    ["Enroladinho de salsicha", null],
    ["Esfiha de carne", null],
    ["Empada de frango", null],
    ["Folhado de queijo e presunto", null],
    ["Pão de queijo", null]
  ]);

  add("bolos", "", "unidade", [
    ["Naked Red Velvet com Morango e Chocolate", null, "Massa red velvet, creme de ninho, chocolate e morangos frescos."],
    ["Red Velvet com Morangos e Creme", null, "Massa red velvet com creme, chocolate e morangos frescos."],
    ["Naked Red Velvet com Creme e Morangos", null, "Camadas de red velvet, creme branco e morangos frescos."],
    ["Dois Amores", null, "Chantilly com lascas de chocolate branco e chocolate ao leite."],
    ["Bolo decorado", null, "Sob encomenda, com recheio e decoração combinados pelo WhatsApp."]
  ]);

  add("doces", "", "unidade", [
    ["Brigadeiro Branco com Chocolate", null, "Brigadeiro branco passado no açúcar, com bico de brigadeiro de chocolate."],
    ["Brigadeiro de Doce de Leite", null, "Brigadeiro passado no açúcar, com bico de doce de leite."],
    ["Carolina com Chocolate", null, "Massa leve, recheio de creme e cobertura de chocolate."]
  ]);

  add("paes", "", "unidade", [
    ["Pão francês", null, "Fresquinho, saindo do forno."],
    ["Pão de forma", null],
    ["Pão de leite", null],
    ["Cuca", null]
  ]);

  add("cafe", "", "unidade", [
    ["Café coado", null, "Café fresquinho."],
    ["Cappuccino", null],
    ["Pão na chapa", null]
  ]);

  window.SITE_DATA = {
    whatsapp: "554133644702",

    categories: [
      { id: "salgados", label: "Salgados", singular: "Salgado", note: "Salgados fresquinhos no balcão e por encomenda para festas e eventos." },
      { id: "bolos", label: "Bolos", singular: "Bolo", note: "Bolos do dia a dia e decorados sob encomenda. Valores e decoração combinados pelo WhatsApp." },
      { id: "doces", label: "Doces", singular: "Doce", note: "Tortas, doces e sobremesas feitos com carinho." },
      { id: "paes", label: "Pães", singular: "Pão", note: "Pães fresquinhos para o café da manhã e o dia a dia." },
      { id: "cafe", label: "Café", singular: "Café", note: "Café fresquinho e lanches para uma pausa gostosa." }
    ],

    // Vitrine da página inicial: só aparecem os itens que têm foto (nomes como na lista acima)
    featured: [
      "Naked Red Velvet com Morango e Chocolate",
      "Dois Amores",
      "Naked Red Velvet com Creme e Morangos",
      "Red Velvet com Morangos e Creme",
      "Carolina com Chocolate",
      "Brigadeiro Branco com Chocolate",
      "Brigadeiro de Doce de Leite"
    ],

    // ids que já têm foto em assets/produtos/<id>.jpg
    photos: [
      "naked-red-velvet-com-morango-e-chocolate",
      "red-velvet-com-morangos-e-creme",
      "dois-amores",
      "naked-red-velvet-com-creme-e-morangos",
      "brigadeiro-branco-com-chocolate",
      "brigadeiro-de-doce-de-leite",
      "carolina-com-chocolate"
    ],

    products: products
  };
})();
