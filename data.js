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
    products: products
  };
})();
