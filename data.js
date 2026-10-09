/*
  Dados do site da Panificadora Gustapão (DEMO).
  Cardápio tirado do iFood deles (Padaria, Doces e os Salgados mais pedidos).
  Enquanto a lista de produtos estiver vazia, o site mostra o botão para o iFood.

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

  /* ---------- Padaria ---------- */
  add("padaria", "", "unidade", [
    ["Pão francês, 5 unidades", 7.50, "5 unidades de pão francês crocante, fornadas frescas o dia todo."],
    ["Pão de Queijo Mineirinho, 5 unidades", 9.50, "5 unidades de pão de queijo assado, marca Mineirinho."],
    ["Pão de queijo grande", 13.50, "Delicioso pão de queijo, com aproximadamente 15 cm de diâmetro."],
    ["Pão de Batata fatiado, 400 g", 18.90, "Pão de nata já fatiado, perfeito para o café da manhã ou lanche da tarde."],
    ["Pão de Forma fatiado, 450 g", 18.90, "Pão de forma já fatiado, ideal para sanduíches e torradas."],
    ["Pão Caseiro fatiado, 390 g", 18.90, "Pão caseiro fofinho, já fatiado, perfeito para o café da manhã ou lanche da tarde."],
    ["Pão de Hambúrguer", 2.20, "Uma unidade de pão de hambúrguer."],
    ["Pão de Hot Dog", 1.90, "Uma unidade de pão para cachorro quente."],
    ["Pão de minuto", 5.90],
    ["Pão de minuto com chocolate", 8.00, "Uma unidade."],
    ["Chineque de creme com coco", 4.50, "Uma unidade."],
    ["Chineque de farofa", 4.50, "Uma unidade."],
    ["Chineque de Prestígio", 4.50, "Uma unidade."],
    ["Chineque de creme com farofa", 4.50, "Uma unidade."],
    ["Chocotone, 500 g", 33.00, "Nosso clássico chocotone com gotas de chocolate e massa macia."],
    ["Panetone, 500 g", 31.90, "O tamanho é aproximado e pode variar para mais ou para menos."],
    ["Pão Cuca, 250 g", 10.70, "Sabor disponível: creme, goiabada, doce de leite ou farofa."]
  ]);

  /* ---------- Doces ---------- */
  add("doces", "Doces", "unidade", [
    ["Camafeu", 15.50, "Doce de nozes, coberto com fondant."],
    ["Brigadeiro", 13.90, "Brigadeiro de chocolate, aproximadamente 80 g, serve 1 pessoa."],
    ["Doce Dois Amores", 13.90, "Trançado de brigadeiro branco e brigadeiro de chocolate."],
    ["Carolina Doce", 5.50, "Sabores como doce de leite, creme chiffon, limão, chocolate e chocolate branco."],
    ["Brownie", 14.00]
  ]);
  add("doces", "Fatias de bolo", "unidade", [
    ["Fatia de Bolo de Cenoura com brigadeiro", 18.90, "Uma fatia de bolo de cenoura recheado e coberto com brigadeiro."],
    ["Fatia de Bolo Dois Amores", 18.90]
  ]);
  add("doces", "Bolos", "unidade", [
    ["Bolo Especiarias com Brigadeiro Branco, 350 g", 32.90, "Bolo com especiarias: canela, cravo e noz moscada, coberto com brigadeiro branco."],
    ["Bolo de Castanha, 270 g", 23.30, "Bolo de baunilha recheado e coberto com castanhas."],
    ["Bolo de Cenoura com Chocolate, 350 g", 22.90, "Bolo fresquinho de cenoura com chocolate."],
    ["Bolo Toalha Felpuda, 500 g", 36.00, "Bolo feito com leite de coco, coberto com calda de leite condensado."],
    ["Bolo de Laranja, 290 g", 19.00, "Bolo de laranja, feito com suco de laranja natural."],
    ["Bolo de Limão, 330 g", 21.50, "Bolo de limão, feito com suco natural de limão, coberto com mousse e raspas."],
    ["Bolo de Fubá com Goiabada, 220 g", 16.00, "Bolo de fubá com goiabada cremosa. Bolo na forminha de alumínio."],
    ["Bolo de Chocolate, 350 g", 23.40, "Bolo de chocolate úmido coberto com calda cremosa de chocolate."],
    ["Bolo de Maracujá, 290 g", 20.26, "Bolo fresquinho de maracujá coberto com mousse de maracujá."]
  ]);

  /* ---------- Salgados (itens mais pedidos) ---------- */
  add("salgados", "", "unidade", [
    ["Mini Coxinhas no Copo, 40 unidades", 26.50],
    ["Mini Pastelzinho de Carne, 15 unidades", 26.00],
    ["Mini Pastelzinho de Queijo, 15 unidades", 26.00],
    ["Pastel de carne", 19.90]
  ]);

  window.SITE_DATA = {
    whatsapp: "5541998176487",
    categories: [
      { id: "padaria", label: "Padaria", singular: "Pão", note: "Pães, chineques, panetone e mais, com fornadas frescas o dia todo." },
      { id: "doces", label: "Doces", singular: "Doce", note: "Doces, fatias e bolos." },
      { id: "salgados", label: "Salgados", singular: "Salgado", note: "Os salgados mais pedidos." }
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
      ] },
      { id: "bolos", label: "Bolos", cover: "assets/destaques/bolos-2.jpg",
        cta: { label: "Encomendar pelo WhatsApp", href: "https://wa.me/5541998176487?text=Ol%C3%A1%2C%20Gustap%C3%A3o!%20Gostaria%20de%20fazer%20uma%20encomenda%20de%20bolo." },
        items: [
        { src: "assets/destaques/bolos-1.jpg", alt: "Bolo de morango com nata: morango, nata e suspiro" },
        { src: "assets/destaques/bolos-2.jpg", alt: "Bolo de brigadeiro: brigadeiro de chocolate" },
        { src: "assets/destaques/bolos-3.jpg", alt: "Bolo negresco: creme de brigadeiro branco e negresco" },
        { src: "assets/destaques/bolos-4.jpg", alt: "Bolo de abacaxi com coco: creme de coco e creme chiffon com abacaxi em calda" },
        { src: "assets/destaques/bolos-5.jpg", alt: "Bolo negresco com o aviso: faça a sua encomenda e deixe sua festa ainda melhor, 41 99817-6487" }
      ] },
      { id: "bebidas", label: "Bebidas", items: [
        { src: "assets/destaques/bebidas-1.jpg", alt: "Milkshake nos sabores chocolate, creme e caramelo, e morango" },
        { src: "assets/destaques/bebidas-2.jpg", alt: "Suco natural" },
        { src: "assets/destaques/bebidas-3.jpg", alt: "Cappuccino" }
      ] },
      { id: "carolinas", label: "Carolinas", items: [
        { src: "assets/destaques/carolinas-1.jpg", alt: "Carolinas variadas: chocolate ao leite, chocolate branco, leite ninho, doce de leite e limão" },
        { src: "assets/destaques/carolinas-2.jpg", alt: "Carolina de maracujá, com recheio de mousse de maracujá e cobertura de chocolate" },
        { src: "assets/destaques/carolinas-3.jpg", alt: "Carolina de limão, com cobertura de chocolate branco e raspas de limão" },
        { src: "assets/destaques/carolinas-4.jpg", alt: "Carolina de paçoca, com recheio de paçoca e cobertura de chocolate" },
        { src: "assets/destaques/carolinas-5.jpg", alt: "Carolinas de leite ninho, doce de leite e chocolate branco" }
      ] }
    ]
  };
})();
