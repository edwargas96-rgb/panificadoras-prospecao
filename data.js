/*
  Dados do site da Panificadora Gustapão (DEMO).
  Cardápio tirado do iFood deles (Lanches, Sanduíches, Tapioca, Padaria, Doces, Queijos e frios e Salgados).
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

  /* ---------- Queijos e frios ---------- */
  add("frios", "", "unidade", [
    ["Queijo Mussarela, 100 g", 9.90, "100 g de queijo mussarela fatiado."],
    ["Queijo Prato, 100 g", 12.60],
    ["Presunto, 100 g", 6.90, "100 g de presunto fatiado da Frimesa."],
    ["Mortadela Defumada, 100 g", 6.30, "100 g de mortadela defumada fatia da Sadia."],
    ["Mortadela Tradicional, 100 g", 6.30, "100 g de mortadela tradicional Bolognella fatia da Perdigão."],
    ["Peito de Peru, 100 g", 15.00, "100 g de peito de peru defumado fatiado da Seara."],
    ["Salame Italiano, 100 g", 19.00, "100 g de salame italiano fatiado da Sadia."],
    ["Manteiga Extra Frimesa com Sal, 200 g", 19.90, "Pote de 200 g."]
  ]);

  /* ---------- Sanduíches ---------- */
  add("sanduiches", "", "unidade", [
    ["Americaninho", 22.40, "Pão francês, ovo, bacon, queijo e maionese."],
    ["Bauru", 15.40, "Queijo, presunto, tomate e orégano derretido na chapa, com pão crocante."],
    ["Misto Quente", 12.90, "Tradicional pão francês com queijo e presunto na chapa."],
    ["Pão com Frango", 20.90, "Pão francês com frango desfiado e queijo muçarela. Feito na chapa."],
    ["Pão com Linguiça Blumenau", 24.70, "Pão francês com linguiça Blumenau, queijo derretido e maionese."],
    ["Pão com Manteiga na Chapa", 8.00, "Pão francês com manteiga feito na chapa."],
    ["Pão com Mortadela Defumada", 11.90, "Pão francês com mortadela defumada. Feito na chapa."],
    ["Pão com Ovo", 9.70, "Pão francês com ovo. Feito na chapa."],
    ["Pão com Peito de Peru", 20.90, "Pão francês, peito de peru e queijo muçarela. Feito na chapa."],
    ["Pão com Salame e Queijo", 23.80, "Pão francês, salame e queijo muçarela. Feito na chapa."]
  ]);

  /* ---------- Lanches ---------- */
  add("lanches", "Lanches", "unidade", [
    ["Beirute", 37.90, "Pão sírio, bife, ovo, queijo, presunto, alface, tomate e maionese."],
    ["X-Salada", 23.90, "Nosso tradicional X-salada de padaria. Pão macio, hambúrguer, maionese, queijo, presunto, alface e tomate."],
    ["Pão com bife", 26.60, "Tradicional pão francês com bife acebolado e queijo muçarela. Feito na chapa."],
    ["X-Americano", 44.90, "Pão fresquinho, hambúrguer, ovo, queijo, presunto e bacon crocante, com batata frita."],
    ["Hotdog na Chapa - Crocante", 26.60, "Pão macio com vina (salsicha), queijo, bacon, cheddar cremoso, batata palha e cebola crocante."],
    ["Hotdog na Chapa - Tradicional", 23.80, "Pão macio com vina (salsicha), cebola e tomate na chapa, queijo, batata palha e maionese."],
    ["Hotdog na Chapa - Banoffe", 19.60, "Pão macio com banana na chapa, doce de leite e canela."],
    ["X-Bacon", 30.80, "Pão, hambúrguer, maionese, queijo, presunto, alface, tomate e bacon."],
    ["X-Burguer", 22.40, "Pão macio, hambúrguer, maionese, queijo e presunto."],
    ["X-Egg", 28.10, "Pão, hambúrguer, maionese, queijo, presunto, alface, tomate e ovo."],
    ["X-Calabresa", 30.90, "Pão, hambúrguer, maionese, queijo, presunto, alface, tomate e calabresa."],
    ["X-Frango", 25.20, "Pão, hambúrguer de frango, queijo, maionese, presunto, alface e tomate."],
    ["X-Tudo! Tudo mesmo!", 42.10, "Pão, hambúrguer, bacon, calabresa, vina (salsicha), ovo, presunto e queijo."],
    ["X-Salada no Pão de Queijo Grande", 36.50, "X-salada feito no nosso tradicional pão de queijo grande."],
    ["Pão com Bolinho e Bacon", 32.30, "Pão, bolinho de carne com tempero da casa, queijo derretido, maionese e bacon."],
    ["Pão com Bolinho, Requeijão e Cebola", 32.30, "Pão, bolinho de carne com tempero da casa, queijo derretido, requeijão e cebola crocante."],
    ["Pão com Bolinho", 28.00, "Pão, bolinho de carne com tempero da casa e queijo derretido."]
  ]);
  add("lanches", "Lanches especiais", "unidade", [
    ["Gusta Artesanal", 51.90, "Pão, hambúrguer artesanal, queijo cheddar, anéis de cebola e molho barbecue, com batata rústica."],
    ["Gusta Burguer", 43.90, "Pão especial, hambúrguer artesanal, queijo coalho tostado e geleia de frutas."],
    ["Gusta Bacon", 51.90, "Pão especial, hambúrguer artesanal, bacon, maionese, queijo e presunto."]
  ]);
  add("lanches", "Combos", "unidade", [
    ["Combo 1: X-Salada + Batata Frita + Coca Cola", 39.90, "1 X-Salada: pão, hambúrguer, queijo, presunto, alface, tomate e maionese, com batata frita e Coca-Cola."],
    ["Combo 2: X-Bacon + Batata Frita + Coca Cola", 43.90, "1 X-Bacon: pão, hambúrguer, queijo, presunto, alface, tomate e maionese, com batata frita e Coca-Cola."]
  ]);

  /* ---------- Tapioca ---------- */
  add("tapioca", "", "unidade", [
    ["Tapioca de manteiga", 22.50, "Tapioca recheada de manteiga, serve 1 pessoa."],
    ["Tapioca de Frango com Catupiry", 29.90, "Tapioca recheada de frango com Catupiry, serve 1 pessoa."],
    ["Tapioca de queijo e presunto", 26.80, "Tapioca recheada de queijo mussarela e presunto, serve 1 pessoa."],
    ["Tapioca Light", 33.80, "Tapioca recheada de queijo branco e peito de peru, serve 1 pessoa."],
    ["Tapioca de ovo mexido", 26.80, "Tapioca recheada de ovo mexido, serve 1 pessoa."],
    ["Tapioca de Banana", 26.80, "Tapioca recheada com banana e doce de leite, serve 1 pessoa."],
    ["Tapioca de Nutella", 38.10, "Tapioca recheada da Original Nutella, serve para 1 pessoa."]
  ]);

  window.SITE_DATA = {
    whatsapp: "5541998176487",
    categories: [
      { id: "lanches", label: "Lanches", singular: "Lanche", note: "Lanches, lanches especiais e combos." },
      { id: "sanduiches", label: "Sanduíches", singular: "Sanduíche", note: "Pão francês na chapa, com os recheios que você gosta." },
      { id: "tapioca", label: "Tapioca", singular: "Tapioca", note: "Cada tapioca serve 1 pessoa." },
      { id: "padaria", label: "Padaria", singular: "Pão", note: "Pães, chineques, panetone e mais, com fornadas frescas o dia todo." },
      { id: "doces", label: "Doces", singular: "Doce", note: "Doces, fatias e bolos." },
      { id: "frios", label: "Queijos e frios", singular: "Frio", note: "Fatiados na hora, por 100 g." },
      { id: "salgados", label: "Salgados", singular: "Salgado", note: "Os salgados mais pedidos." }
    ],

    featured: [
      "Pão com Bolinho e Bacon",
      "Pão com Bolinho, Requeijão e Cebola",
      "Hotdog na Chapa - Crocante",
      "Hotdog na Chapa - Tradicional",
      "Hotdog na Chapa - Banoffe"
    ],

    photos: [
      "pao-com-bolinho-e-bacon",
      "pao-com-bolinho-requeijao-e-cebola",
      "hotdog-na-chapa-crocante",
      "hotdog-na-chapa-tradicional",
      "hotdog-na-chapa-banoffe"
    ],

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
