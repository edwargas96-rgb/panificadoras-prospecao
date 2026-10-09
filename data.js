/*
  Dados do site da Casa Andina Panificadora e Confeitaria (DEMO),
  tirados do cardápio em PDF deles (jul/2026).

  - Preço: use um número (ex.: 7.5). Preço null aparece como "Sob consulta".
  - Foto de produto: salve em assets/produtos/<id>.jpg e coloque o id em `photos`
    (o id é o nome em minúsculas, sem acento e com hífens: "Cheese Bacon" -> cheese-bacon).
  - min / step: pedido mínimo e passo de quantidade (ex.: 20 salgados, 1,5 kg de bolo).
*/
(function () {
  function slug(s) {
    return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }

  var products = [];
  var seen = {};

  // add(categoria, grupo, unidade padrão, [[nome, preço, descrição?, opções?], ...])
  // opções: { min: quantidade mínima, step: passo, unit: unidade só deste item }
  function add(cat, group, unit, items) {
    items.forEach(function (it) {
      var id = slug(it[0]);
      if (seen[id]) id = id + "-" + cat;
      seen[id] = true;
      var o = it[3] || {};
      var p = { id: id, cat: cat, group: group, name: it[0], price: it[1], unit: o.unit || unit };
      var desc = it[2] || "";
      if (o.min) {
        p.min = o.min;
        desc += (desc ? " " : "") + "Pedido mínimo: " + String(o.min).replace(".", ",") + " " + (p.unit === "unidade" ? "unid." : p.unit) + (o.perFlavor ? " por sabor." : ".");
      }
      if (o.step) p.step = o.step;
      if (desc) p.desc = desc;
      products.push(p);
    });
  }

  /* ---------- Lanches ---------- */
  add("lanches", "Matinais quentes", "unidade", [
    ["Bauru", 9.90, "Pão francês, manteiga, queijo, presunto, tomate e orégano."],
    ["Misto quente", 9.50, "Pão francês, manteiga, queijo e presunto."],
    ["Pão na chapa", 5.90, "Pão francês com manteiga."],
    ["Pão com mortadela", 6.90, "Pão francês, manteiga e mortadela."],
    ["Pão com ovo", 7.50, "Pão francês, manteiga e ovo inteiro."],
    ["Queijo quente", 9.00, "Pão francês, manteiga e queijo."],
    ["Salaminho quente", 12.40, "Pão francês, manteiga, queijo e salaminho."],
    ["Pão com requeijão na chapa", 9.10, "Pão francês na chapa com requeijão."]
  ]);
  add("lanches", "Frios", "unidade", [
    ["Bauru frio", 8.20],
    ["Misto frio", 8.40],
    ["Mortadela frio", 6.00],
    ["Pão com manteiga", 5.40],
    ["Pão com requeijão", 5.00],
    ["Queijo frio", 7.80],
    ["Salaminho frio", 11.00]
  ]);
  add("lanches", "Especiais Andina", "unidade", [
    ["Bauru especial", 12.40, "Pão francês, manteiga, peito de peru, queijo, tomate e orégano."],
    ["Misto quente especial", 13.90, "Pão australiano, manteiga, peito de peru, queijo, rúcula e tomate."]
  ]);
  add("lanches", "Saudáveis Andina", "unidade", [
    ["Crepioca de bauru", 15.20, "Goma de tapioca e ovo batido, com recheio de queijo, presunto, tomate e orégano."],
    ["Crepioca de frango", 16.00, "Goma de tapioca e ovo batido, com recheio de frango com requeijão."],
    ["Crepioca de queijo e presunto", 13.90, "Goma de tapioca e ovo batido, com recheio de queijo e presunto."],
    ["Crepioca de queijo e orégano", 13.50, "Goma de tapioca e ovo batido, com recheio de queijo e orégano."],
    ["Omelete", 18.20, "3 ovos, tomate, queijo, presunto e orégano."],
    ["Ovos mexidos", 7.00, "3 ovos."],
    ["Sanduíche natural de frango", 14.99, "Baguete de parmesão, maionese, frango desfiado, alface, tomate e cenoura."],
    ["Sanduíche natural de peito de peru", 14.99, "Baguete de parmesão, maionese, peito de peru, alface, tomate e cenoura."]
  ]);

  /* ---------- Burgers ---------- */
  add("burgers", "Burger's Andina", "unidade", [
    ["Cheese Burger", 16.60, "Pão, maionese, hambúrguer e queijo."],
    ["Cheese Salada", 18.00, "Pão, maionese, hambúrguer, queijo, alface e tomate."],
    ["Cheese Bacon", 20.30, "Pão, maionese, hambúrguer, bacon, queijo, alface e tomate."],
    ["Cheese Frango", 20.90, "Pão, maionese, hambúrguer, frango, queijo, alface e tomate."],
    ["Cheese Calabresa", 18.50, "Pão, maionese, hambúrguer, calabresa, queijo, alface e tomate."],
    ["Cheese Egg", 19.80, "Pão, maionese, hambúrguer, ovo, queijo, alface e tomate."],
    ["Cheese Tudo", 26.30, "Pão, maionese, hambúrguer, queijo, presunto, alface, tomate, ovo, bacon, calabresa e frango."]
  ]);

  /* ---------- Almoço ---------- */
  add("almoco", "Massas Andina", "unidade", [
    ["Massa à escolha", 26.90, "Talharim, espaguete, penne ou nhoque, com molho 4 queijos, pesto, sugo ou bolonhesa."],
    ["Massa com bife ou frango grelhado", 32.00],
    ["Massa com bife à parmegiana", 33.90]
  ]);
  add("almoco", "Sugestões", "unidade", [
    ["Talharim 4 queijos com filé de frango grelhado", 32.00],
    ["Espaguete ao pesto com bife grelhado", 32.00],
    ["Penne ao sugo com filé de frango grelhado", 32.00],
    ["Nhoque ao sugo com bife à parmegiana", 33.90]
  ]);
  add("almoco", "Prato feito", "unidade", [
    ["Panqueca com salada", 25.90, "Consulte os molhos."]
  ]);

  /* ---------- Feijoada ---------- */
  add("feijoada", "", "unidade", [
    ["Feijoada, prato feito", 28.90, "Arroz, couve, farofa, vinagrete, torresmo e feijoada servida separadamente. Opção light (menos gordura, cortes leves) ou tradicional."],
    ["Feijoada para viagem, 1 pessoa", 30.00],
    ["Feijoada para viagem, 2 pessoas", 58.00]
  ]);

  /* ---------- Cafés e bebidas ---------- */
  add("cafes", "Cafés coados", "unidade", [
    ["Café coado pequeno", 4.90, "Café da casa, passado."],
    ["Café coado com leite pequeno", 5.00, "Café da casa, passado, com leite."],
    ["Café coado médio", 8.10, "Café da casa, passado."],
    ["Café coado com leite médio", 8.60, "Café da casa, passado, com leite vaporizado."]
  ]);
  add("cafes", "Cafés expressos", "unidade", [
    ["Café expresso pequeno", 7.00, "1 dose de café expresso."],
    ["Café expresso médio", 9.60, "2 doses de café expresso."],
    ["Café latte", 9.60, "1 dose de café expresso e leite vaporizado."],
    ["Doppio com leite", 9.50, "2 doses de café expresso e leite vaporizado."],
    ["Expresso macchiato", 9.00, "1 dose de café expresso e a espuma do leite."]
  ]);
  add("cafes", "Cafés gelados", "unidade", [
    ["Iced latte", 9.50, "1 dose de café expresso, leite e gelo."],
    ["Café frappé", 13.90, "1 dose de expresso e sorvete de creme."],
    ["Café expresso tônica", 10.90, "1 dose de expresso, gelo e tônica com limão ou laranja."]
  ]);
  add("cafes", "Chocolates", "unidade", [
    ["Chocolate quente", 8.60, "Achocolatado e leite vaporizado."],
    ["Chocolate quente cremoso", 9.90, "Pré-mistura de chocolate e leite vaporizado."],
    ["Chocolate gelado", 8.00, "Achocolatado, leite gelado e gelo batido."]
  ]);
  add("cafes", "Cappuccinos", "unidade", [
    ["Cappuccino tradicional", 9.10, "Pré-mistura e leite vaporizado."],
    ["Cappuccino italiano", 10.60, "1 dose de expresso, crema de leite, canela e cacau."],
    ["Cappuccino gelado", 9.50, "Pré-mistura, leite gelado e gelo batido."]
  ]);
  add("cafes", "Leites, chás e refrescantes", "unidade", [
    ["Leite quente", 5.00],
    ["Leite frio", 4.50],
    ["Chá quente", 5.50, "Consulte os sabores no balcão."],
    ["Chai indiano", 7.90, "Chá preto com especiarias e leite vaporizado."],
    ["Soda italiana", 11.50, "Xarope, gelo e água com gás. Consulte os sabores no balcão."]
  ]);

  /* ---------- Sucos e vitaminas ---------- */
  add("sucos", "Sucos naturais", "unidade", [
    ["Suco de abacaxi", 8.90],
    ["Suco de abacaxi com hortelã", 8.90],
    ["Suco de laranja", 8.90],
    ["Suco de limão", 8.90],
    ["Suco de morango", 8.90],
    ["Suco de laranja com abacaxi", 10.90],
    ["Suco de laranja com morango", 11.90],
    ["Suco de laranja, limão e gengibre", 10.90]
  ]);
  add("sucos", "Vitaminas", "unidade", [
    ["Vitamina de banana", 12.90],
    ["Vitamina de banana com mamão", 13.50],
    ["Vitamina de banana com morango", 13.90],
    ["Vitamina de maçã com mamão", 13.50]
  ]);

  /* ---------- Da vitrine (itens sem preço no cardápio) ---------- */
  add("vitrine", "", "unidade", [
    ["Torta de Limão com Merengue", null],
    ["Bolo com Goiabada", null]
  ]);

  /* ---------- Encomendas ---------- */
  add("encomendas", "Salgados assados (mín. 20 unid. por sabor)", "unidade", [
    ["Doguinho", 1.70, "", { min: 20, perFlavor: true, step: 10 }],
    ["Trouxinha de calabresa", 1.70, "", { min: 20, perFlavor: true, step: 10 }],
    ["Trouxinha de frango", 1.70, "", { min: 20, perFlavor: true, step: 10 }],
    ["Trouxinha de queijo e presunto", 1.70, "", { min: 20, perFlavor: true, step: 10 }],
    ["Trouxinha de catupiry", 1.70, "", { min: 20, perFlavor: true, step: 10 }],
    ["Empadinha de frango", 1.70, "", { min: 20, perFlavor: true, step: 10 }],
    ["Empadinha de palmito", 1.70, "", { min: 20, perFlavor: true, step: 10 }]
  ]);
  add("encomendas", "Mini folhados (mín. 20 unid. por sabor)", "unidade", [
    ["Mini calabresa", 2.10, "", { min: 20, perFlavor: true, step: 10 }],
    ["Mini peito de peru com catupiry", 2.10, "", { min: 20, perFlavor: true, step: 10 }],
    ["Mini ricota temperada", 2.10, "", { min: 20, perFlavor: true, step: 10 }],
    ["Mini pão de batata", 2.10, "", { min: 20, perFlavor: true, step: 10 }],
    ["Mini esfiha de carne", 2.10, "", { min: 20, perFlavor: true, step: 10 }],
    ["Mini esfiha de frango", 2.10, "", { min: 20, perFlavor: true, step: 10 }]
  ]);
  add("encomendas", "Salgados fritos (mín. 20 unid. por sabor)", "unidade", [
    ["Coxinha de frango", 1.50, "", { min: 20, perFlavor: true, step: 10 }],
    ["Coxinha de frango com catupiry", 1.50, "", { min: 20, perFlavor: true, step: 10 }],
    ["Bolinha de queijo", 1.50, "", { min: 20, perFlavor: true, step: 10 }],
    ["Almofadinha de carne", 1.50, "", { min: 20, perFlavor: true, step: 10 }],
    ["Kibe", 1.50, "", { min: 20, perFlavor: true, step: 10 }]
  ]);
  add("encomendas", "Pastel de vento (mín. 20 unid. por sabor)", "unidade", [
    ["Pastel de vento de carne", 1.30, "", { min: 20, perFlavor: true, step: 10 }],
    ["Pastel de vento de queijo", 1.30, "", { min: 20, perFlavor: true, step: 10 }],
    ["Pastel de vento de palmito", 1.30, "", { min: 20, perFlavor: true, step: 10 }],
    ["Pastel de vento de pizza", 1.30, "", { min: 20, perFlavor: true, step: 10 }]
  ]);
  add("encomendas", "Sanduíches de metro (baguete com 65 cm, sem pedido mínimo)", "unidade", [
    ["Sanduíche de metro de frango", null, "Peito de frango desfiado, cenoura ralada, maionese, queijo prato, alface e tomate."],
    ["Sanduíche de metro de queijo e presunto", null, "Fatias de queijo prato e presunto, alface, tomate e maionese."],
    ["Sanduíche de metro de peito de peru e ricota", null, "Peito de peru defumado, ricota, cenoura ralada, rúcula e maionese."],
    ["Sanduíche de metro de salaminho", null, "Salame italiano, queijo mussarela, alface, tomate e maionese."]
  ]);
  add("encomendas", "Mini sanduíches (mín. 10 unid. por sabor)", "unidade", [
    ["Mini sanduíche de queijo e presunto", 3.50, "Fatias de queijo prato e presunto, alface, tomate e maionese.", { min: 10, perFlavor: true, step: 5 }],
    ["Mini sanduíche de peito de peru e ricota", 3.70, "Peito de peru defumado, ricota, rúcula e maionese.", { min: 10, perFlavor: true, step: 5 }],
    ["Mini sanduíche de salaminho", 3.90, "Salame italiano, queijo mussarela, alface, tomate e maionese.", { min: 10, perFlavor: true, step: 5 }]
  ]);
  add("encomendas", "Docinhos simples (mín. 20 unid. por sabor)", "unidade", [
    ["Brigadeiro tradicional", 2.00, "", { min: 20, perFlavor: true, step: 10 }],
    ["Brigadeiro branco", 2.00, "", { min: 20, perFlavor: true, step: 10 }],
    ["Beijinho", 2.00, "", { min: 20, perFlavor: true, step: 10 }],
    ["Cajuzinho", 2.00, "", { min: 20, perFlavor: true, step: 10 }],
    ["Dois amores", 2.00, "", { min: 20, perFlavor: true, step: 10 }]
  ]);
  add("encomendas", "Docinhos gourmet (mín. 20 unid. por sabor)", "unidade", [
    ["Camafeu", 3.00, "", { min: 20, perFlavor: true, step: 10 }],
    ["Ninho com Nutella", 3.00, "", { min: 20, perFlavor: true, step: 10 }],
    ["Olho de sogra", 3.00, "", { min: 20, perFlavor: true, step: 10 }],
    ["Surpresa de uva", 3.00, "", { min: 20, perFlavor: true, step: 10 }]
  ]);
  add("encomendas", "Carolinas (mín. 20 unid. por sabor)", "unidade", [
    ["Carolina de creme", 2.30, "", { min: 20, perFlavor: true, step: 10 }],
    ["Carolina de chocolate", 2.30, "", { min: 20, perFlavor: true, step: 10 }],
    ["Carolina de doce de leite", 2.30, "", { min: 20, perFlavor: true, step: 10 }],
    ["Carolina de limão", 2.30, "", { min: 20, perFlavor: true, step: 10 }]
  ]);
  add("encomendas", "Bolos confeitados (pedido mínimo de 1,5 kg)", "kg", [
    ["Bolo de Abacaxi com Coco", null, "Pão de ló branco, cocada cremosa e abacaxi. Cobertura: chantilly, coco em flocos, coco queimado e abacaxi.", { min: 1.5 }],
    ["Bolo de Brigadeiro com Morangos", null, "Pão de ló de chocolate, brigadeiro mole, nata e morango. Cobertura: chantilly, raspas de chocolate e morangos.", { min: 1.5 }],
    ["Bolo de Chocolate Trufado", null, "Pão de ló de chocolate e chocolate trufado. Cobertura: chantilly, chocolate trufado, chocolate em pó e trufas de chocolate.", { min: 1.5 }],
    ["Bolo Dois Amores", null, "Pão de ló branco e de chocolate, brigadeiro mole e brigadeiro mole branco. Cobertura: chantilly, ganache de chocolate, ganache de chocolate branco e dois amores.", { min: 1.5 }],
    ["Bolo Floresta Negra", null, "Pão de ló de chocolate, brigadeiro mole, cereja e nata. Cobertura: chantilly, raspas de chocolate e cerejas.", { min: 1.5 }],
    ["Bolo de Frutas", null, "Pão de ló branco, creme chiffon e frutas. Cobertura: chantilly, ganache de chocolate branco e frutas.", { min: 1.5 }],
    ["Bolo Marta Rocha", null, "Pão de ló branco e de chocolate, strogonoff de nozes, baba de moça, suspiro, damasco, ameixa e nata. Cobertura: chantilly, crocante de nozes, cereja e nozes.", { min: 1.5 }],
    ["Bolo de Morango com Nata", null, "Pão de ló branco, creme chiffon, morango e nata. Cobertura: chantilly, suspiro e morangos.", { min: 1.5 }],
    ["Bolo Prestígio", null, "Pão de ló de chocolate, brigadeiro mole e cocada cremosa. Cobertura: chantilly, chocolate trufado, ganache branco e beijinho.", { min: 1.5 }],
    ["Bolo Strogonoff de Nozes", null, "Pão de ló de chocolate, strogonoff de nozes, baba de moça e doce de leite. Cobertura: chantilly, chocolate trufado, crocante de nozes e nozes.", { min: 1.5 }]
  ]);
  add("encomendas", "Coffee break (pedido mínimo de 10 pessoas)", "pessoa", [
    ["Coffee break Andina nº 1", 17.90, "2 mini salgados assados (doguinho, esfiha de carne ou pão de batata), 3 mini salgados fritos (coxinha de frango, bolinha de queijo ou risoles), 1 sanduíche (presunto, queijo, alface e tomate) e 1 mini sonho (doce de leite, goiabada, creme ou chocolate).", { min: 10 }],
    ["Coffee break Andina nº 2", 19.90, "2 mini salgados assados (doguinho, esfiha de carne, esfiha de frango ou pão de batata), 2 mini salgados fritos (coxinha de frango, bolinha de queijo ou risoles), 2 mini salgados folhados, 1 sanduíche (presunto, queijo, alface e tomate) e 1 mini sonho (doce de leite, goiabada, creme ou chocolate).", { min: 10 }],
    ["Coffee break Andina nº 3", 22.90, "2 mini salgados assados (doguinho, esfiha de carne, esfiha de frango ou pão de batata), 2 mini salgados fritos (coxinha de frango, bolinha de queijo ou risoles), 2 mini salgados folhados, 2 sanduíches (presunto, queijo, alface e tomate), 1 mini sonho (doce de leite, goiabada, creme ou chocolate), 1 mini folhado doce e 1 salada de frutas de 145 ml.", { min: 10 }]
  ]);
  add("encomendas", "Para acompanhar o coffee break", "garrafa", [
    ["Garrafa de café", 25.00],
    ["Garrafa de leite", 20.00]
  ]);

  window.SITE_DATA = {
    whatsapp: "554131212595",

    categories: [
      { id: "lanches", label: "Lanches", singular: "Lanche", note: "Pães e lanches na chapa, frios, especiais e opções saudáveis. Adicionais: alface, rúcula ou tomate R$ 2,00; mortadela, ovo, peito de peru ou presunto R$ 3,30; calabresa ou salaminho R$ 3,70; bacon, frango ou hambúrguer R$ 5,00." },
      { id: "burgers", label: "Burgers", singular: "Burger", note: "Hambúrgueres Andina." },
      { id: "almoco", label: "Almoço", singular: "Prato", note: "Massas Andina, de segunda a sexta, das 11h30 às 14h30. Escolha o seu prato e monte à sua maneira." },
      { id: "feijoada", label: "Feijoada de sábado", singular: "Feijoada", note: "Sábado é dia de feijoada, das 12h às 15h. Um clássico brasileiro com um toque especial. Também disponível para viagem." },
      { id: "cafes", label: "Cafés e bebidas", singular: "Bebida", note: "Adicional to go: pequeno R$ 1,50, médio R$ 2,20. Consulte nossas opções para viagem." },
      { id: "sucos", label: "Sucos e vitaminas", singular: "Suco", note: "Peça seu suco batido com leite por mais R$ 2,50. Consulte nossas opções para viagem." },
      { id: "vitrine", label: "Da vitrine", singular: "Item da vitrine", note: "Doces e tortas da vitrine. Valores sob consulta." },
      { id: "encomendas", label: "Encomendas", singular: "Encomenda", note: "Os orçamentos devem ser solicitados e aprovados com 24h de antecedência." }
    ],

    // Vitrine da página inicial: só aparecem os itens que têm foto (nomes como na lista acima)
    featured: [
      "Cheese Bacon",
      "Misto quente",
      "Torta de Limão com Merengue",
      "Bolo com Goiabada"
    ],

    // ids que já têm foto em assets/produtos/<id>.jpg
    photos: [
      "cheese-bacon",
      "misto-quente",
      "torta-de-limao-com-merengue",
      "bolo-com-goiabada"
    ],

    products: products
  };
})();
