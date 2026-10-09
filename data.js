/*
  Dados do site da Panificadora Gustapão (DEMO).
  O cardápio deles está só no iFood. Enquanto a lista abaixo estiver vazia,
  o site mostra o botão para o cardápio no iFood.

  Para preencher: add(categoria, grupo, unidade, [[nome, preço, descrição?], ...])
  - Preço null aparece como "Sob consulta".
  - Foto de produto: salve em assets/produtos/<id>.jpg e coloque o id em `photos`.
*/
(function () {
  function slug(s) {
    return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }

  var products = [];
  var seen = {};

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

  window.SITE_DATA = {
    whatsapp: "554132673520",
    categories: [
      { id: "cardapio", label: "Cardápio", singular: "Item", note: "" }
    ],
    featured: [],
    photos: [],
    products: products,

    // Destaques estilo stories do Instagram: cada grupo vira um círculo; ao tocar, abre a galeria.
    // Para criar um grupo novo, adicione { id, label, items: [{ src, alt }] } e salve as fotos em assets/destaques/.
    highlightsCta: { label: "Pedir no iFood", href: "https://www.ifood.com.br/delivery/curitiba-pr/padaria-gustapao-jardim-das-americas/53068904-49fe-4a78-84c2-e1935cebf8e7" },
    highlights: [
      { id: "lanches", label: "Lanches", items: [
        { src: "assets/destaques/lanches-1.jpg", alt: "Pão com bolinho com bacon" },
        { src: "assets/destaques/lanches-2.jpg", alt: "Pão com bolinho, requeijão e cebola crocante" },
        { src: "assets/destaques/lanches-3.jpg", alt: "Hotdog na chapa banoffe, com banana, canela e doce de leite" },
        { src: "assets/destaques/lanches-4.jpg", alt: "Hotdog na chapa crocante, com bacon, cebola crocante, queijo, vina, batata palha, cheddar e maionese" },
        { src: "assets/destaques/lanches-5.jpg", alt: "Hotdog na chapa tradicional, com batata palha, vina, queijo, tomate e cebola na chapa e maionese" }
      ] }
    ]
  };
})();
