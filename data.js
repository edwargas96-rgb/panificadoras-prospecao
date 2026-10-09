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
    ["Bolo de chocolate", null, "Massa fofinha com cobertura de chocolate."],
    ["Bolo de cenoura com chocolate", null],
    ["Bolo de laranja", null],
    ["Bolo de milho", null],
    ["Bolo decorado", null, "Sob encomenda, com recheio e decoração combinados pelo WhatsApp."]
  ]);

  add("doces", "", "unidade", [
    ["Torta de banana com creme", null],
    ["Torta de limão", null],
    ["Cupcake", null],
    ["Brigadeiro", null],
    ["Beijinho", null],
    ["Pudim", null]
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
    featured: [],

    // ids que já têm foto em assets/produtos/<id>.jpg
    photos: [],

    products: products
  };
})();
