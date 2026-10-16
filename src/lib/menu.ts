// Cardápio da Casa Andina (extraído do PDF do cardápio deles). Preço null = "Sob consulta".
export type Unit = "unidade" | "kg" | "cento" | "pessoa" | "garrafa";

export type Category = { id: string; label: string; singular: string; note: string };

export type Product = {
  id: string;
  cat: string;
  group: string;
  name: string;
  price: number | null;
  unit: Unit;
  desc?: string;
  min?: number;
  step?: number;
  active?: boolean;
  photo?: string;
};

export const CATEGORIES: Category[] = [
  {
    "id": "lanches",
    "label": "Lanches",
    "singular": "Lanche",
    "note": "Pães e lanches na chapa, frios, especiais e opções saudáveis. Adicionais: alface, rúcula ou tomate R$ 2,00; mortadela, ovo, peito de peru ou presunto R$ 3,30; calabresa ou salaminho R$ 3,70; bacon, frango ou hambúrguer R$ 5,00."
  },
  {
    "id": "burgers",
    "label": "Burgers",
    "singular": "Burger",
    "note": "Hambúrgueres Andina."
  },
  {
    "id": "almoco",
    "label": "Almoço",
    "singular": "Prato",
    "note": "Massas Andina, de segunda a sexta, das 11h30 às 14h30. Escolha o seu prato e monte à sua maneira."
  },
  {
    "id": "feijoada",
    "label": "Feijoada de sábado",
    "singular": "Feijoada",
    "note": "Sábado é dia de feijoada, das 12h às 15h. Um clássico brasileiro com um toque especial. Também disponível para viagem."
  },
  {
    "id": "cafes",
    "label": "Cafés e bebidas",
    "singular": "Bebida",
    "note": "Adicional to go: pequeno R$ 1,50, médio R$ 2,20. Consulte nossas opções para viagem."
  },
  {
    "id": "sucos",
    "label": "Sucos e vitaminas",
    "singular": "Suco",
    "note": "Peça seu suco batido com leite por mais R$ 2,50. Consulte nossas opções para viagem."
  },
  {
    "id": "vitrine",
    "label": "Da vitrine",
    "singular": "Item da vitrine",
    "note": "Doces e tortas da vitrine. Valores sob consulta."
  },
  {
    "id": "encomendas",
    "label": "Encomendas",
    "singular": "Encomenda",
    "note": "Os orçamentos devem ser solicitados e aprovados com 24h de antecedência."
  }
];

export const SEED_PRODUCTS: Product[] = [
 {
  "id": "bauru",
  "cat": "lanches",
  "group": "Matinais quentes",
  "name": "Bauru",
  "price": 9.9,
  "unit": "unidade",
  "desc": "Pão francês, manteiga, queijo, presunto, tomate e orégano."
 },
 {
  "id": "misto-quente",
  "cat": "lanches",
  "group": "Matinais quentes",
  "name": "Misto quente",
  "price": 9.5,
  "unit": "unidade",
  "desc": "Pão francês, manteiga, queijo e presunto."
 },
 {
  "id": "pao-na-chapa",
  "cat": "lanches",
  "group": "Matinais quentes",
  "name": "Pão na chapa",
  "price": 5.9,
  "unit": "unidade",
  "desc": "Pão francês com manteiga."
 },
 {
  "id": "pao-com-mortadela",
  "cat": "lanches",
  "group": "Matinais quentes",
  "name": "Pão com mortadela",
  "price": 6.9,
  "unit": "unidade",
  "desc": "Pão francês, manteiga e mortadela."
 },
 {
  "id": "pao-com-ovo",
  "cat": "lanches",
  "group": "Matinais quentes",
  "name": "Pão com ovo",
  "price": 7.5,
  "unit": "unidade",
  "desc": "Pão francês, manteiga e ovo inteiro."
 },
 {
  "id": "queijo-quente",
  "cat": "lanches",
  "group": "Matinais quentes",
  "name": "Queijo quente",
  "price": 9,
  "unit": "unidade",
  "desc": "Pão francês, manteiga e queijo."
 },
 {
  "id": "salaminho-quente",
  "cat": "lanches",
  "group": "Matinais quentes",
  "name": "Salaminho quente",
  "price": 12.4,
  "unit": "unidade",
  "desc": "Pão francês, manteiga, queijo e salaminho."
 },
 {
  "id": "pao-com-requeijao-na-chapa",
  "cat": "lanches",
  "group": "Matinais quentes",
  "name": "Pão com requeijão na chapa",
  "price": 9.1,
  "unit": "unidade",
  "desc": "Pão francês na chapa com requeijão."
 },
 {
  "id": "bauru-frio",
  "cat": "lanches",
  "group": "Frios",
  "name": "Bauru frio",
  "price": 8.2,
  "unit": "unidade"
 },
 {
  "id": "misto-frio",
  "cat": "lanches",
  "group": "Frios",
  "name": "Misto frio",
  "price": 8.4,
  "unit": "unidade"
 },
 {
  "id": "mortadela-frio",
  "cat": "lanches",
  "group": "Frios",
  "name": "Mortadela frio",
  "price": 6,
  "unit": "unidade"
 },
 {
  "id": "pao-com-manteiga",
  "cat": "lanches",
  "group": "Frios",
  "name": "Pão com manteiga",
  "price": 5.4,
  "unit": "unidade"
 },
 {
  "id": "pao-com-requeijao",
  "cat": "lanches",
  "group": "Frios",
  "name": "Pão com requeijão",
  "price": 5,
  "unit": "unidade"
 },
 {
  "id": "queijo-frio",
  "cat": "lanches",
  "group": "Frios",
  "name": "Queijo frio",
  "price": 7.8,
  "unit": "unidade"
 },
 {
  "id": "salaminho-frio",
  "cat": "lanches",
  "group": "Frios",
  "name": "Salaminho frio",
  "price": 11,
  "unit": "unidade"
 },
 {
  "id": "bauru-especial",
  "cat": "lanches",
  "group": "Especiais Andina",
  "name": "Bauru especial",
  "price": 12.4,
  "unit": "unidade",
  "desc": "Pão francês, manteiga, peito de peru, queijo, tomate e orégano."
 },
 {
  "id": "misto-quente-especial",
  "cat": "lanches",
  "group": "Especiais Andina",
  "name": "Misto quente especial",
  "price": 13.9,
  "unit": "unidade",
  "desc": "Pão australiano, manteiga, peito de peru, queijo, rúcula e tomate."
 },
 {
  "id": "crepioca-de-bauru",
  "cat": "lanches",
  "group": "Saudáveis Andina",
  "name": "Crepioca de bauru",
  "price": 15.2,
  "unit": "unidade",
  "desc": "Goma de tapioca e ovo batido, com recheio de queijo, presunto, tomate e orégano."
 },
 {
  "id": "crepioca-de-frango",
  "cat": "lanches",
  "group": "Saudáveis Andina",
  "name": "Crepioca de frango",
  "price": 16,
  "unit": "unidade",
  "desc": "Goma de tapioca e ovo batido, com recheio de frango com requeijão."
 },
 {
  "id": "crepioca-de-queijo-e-presunto",
  "cat": "lanches",
  "group": "Saudáveis Andina",
  "name": "Crepioca de queijo e presunto",
  "price": 13.9,
  "unit": "unidade",
  "desc": "Goma de tapioca e ovo batido, com recheio de queijo e presunto."
 },
 {
  "id": "crepioca-de-queijo-e-oregano",
  "cat": "lanches",
  "group": "Saudáveis Andina",
  "name": "Crepioca de queijo e orégano",
  "price": 13.5,
  "unit": "unidade",
  "desc": "Goma de tapioca e ovo batido, com recheio de queijo e orégano."
 },
 {
  "id": "omelete",
  "cat": "lanches",
  "group": "Saudáveis Andina",
  "name": "Omelete",
  "price": 18.2,
  "unit": "unidade",
  "desc": "3 ovos, tomate, queijo, presunto e orégano."
 },
 {
  "id": "ovos-mexidos",
  "cat": "lanches",
  "group": "Saudáveis Andina",
  "name": "Ovos mexidos",
  "price": 7,
  "unit": "unidade",
  "desc": "3 ovos."
 },
 {
  "id": "sanduiche-natural-de-frango",
  "cat": "lanches",
  "group": "Saudáveis Andina",
  "name": "Sanduíche natural de frango",
  "price": 14.99,
  "unit": "unidade",
  "desc": "Baguete de parmesão, maionese, frango desfiado, alface, tomate e cenoura."
 },
 {
  "id": "sanduiche-natural-de-peito-de-peru",
  "cat": "lanches",
  "group": "Saudáveis Andina",
  "name": "Sanduíche natural de peito de peru",
  "price": 14.99,
  "unit": "unidade",
  "desc": "Baguete de parmesão, maionese, peito de peru, alface, tomate e cenoura."
 },
 {
  "id": "cheese-burger",
  "cat": "burgers",
  "group": "Burger's Andina",
  "name": "Cheese Burger",
  "price": 16.6,
  "unit": "unidade",
  "desc": "Pão, maionese, hambúrguer e queijo."
 },
 {
  "id": "cheese-salada",
  "cat": "burgers",
  "group": "Burger's Andina",
  "name": "Cheese Salada",
  "price": 18,
  "unit": "unidade",
  "desc": "Pão, maionese, hambúrguer, queijo, alface e tomate."
 },
 {
  "id": "cheese-bacon",
  "cat": "burgers",
  "group": "Burger's Andina",
  "name": "Cheese Bacon",
  "price": 20.3,
  "unit": "unidade",
  "desc": "Pão, maionese, hambúrguer, bacon, queijo, alface e tomate."
 },
 {
  "id": "cheese-frango",
  "cat": "burgers",
  "group": "Burger's Andina",
  "name": "Cheese Frango",
  "price": 20.9,
  "unit": "unidade",
  "desc": "Pão, maionese, hambúrguer, frango, queijo, alface e tomate."
 },
 {
  "id": "cheese-calabresa",
  "cat": "burgers",
  "group": "Burger's Andina",
  "name": "Cheese Calabresa",
  "price": 18.5,
  "unit": "unidade",
  "desc": "Pão, maionese, hambúrguer, calabresa, queijo, alface e tomate."
 },
 {
  "id": "cheese-egg",
  "cat": "burgers",
  "group": "Burger's Andina",
  "name": "Cheese Egg",
  "price": 19.8,
  "unit": "unidade",
  "desc": "Pão, maionese, hambúrguer, ovo, queijo, alface e tomate."
 },
 {
  "id": "cheese-tudo",
  "cat": "burgers",
  "group": "Burger's Andina",
  "name": "Cheese Tudo",
  "price": 26.3,
  "unit": "unidade",
  "desc": "Pão, maionese, hambúrguer, queijo, presunto, alface, tomate, ovo, bacon, calabresa e frango."
 },
 {
  "id": "massa-a-escolha",
  "cat": "almoco",
  "group": "Massas Andina",
  "name": "Massa à escolha",
  "price": 26.9,
  "unit": "unidade",
  "desc": "Talharim, espaguete, penne ou nhoque, com molho 4 queijos, pesto, sugo ou bolonhesa."
 },
 {
  "id": "massa-com-bife-ou-frango-grelhado",
  "cat": "almoco",
  "group": "Massas Andina",
  "name": "Massa com bife ou frango grelhado",
  "price": 32,
  "unit": "unidade"
 },
 {
  "id": "massa-com-bife-a-parmegiana",
  "cat": "almoco",
  "group": "Massas Andina",
  "name": "Massa com bife à parmegiana",
  "price": 33.9,
  "unit": "unidade"
 },
 {
  "id": "talharim-4-queijos-com-file-de-frango-grelhado",
  "cat": "almoco",
  "group": "Sugestões",
  "name": "Talharim 4 queijos com filé de frango grelhado",
  "price": 32,
  "unit": "unidade"
 },
 {
  "id": "espaguete-ao-pesto-com-bife-grelhado",
  "cat": "almoco",
  "group": "Sugestões",
  "name": "Espaguete ao pesto com bife grelhado",
  "price": 32,
  "unit": "unidade"
 },
 {
  "id": "penne-ao-sugo-com-file-de-frango-grelhado",
  "cat": "almoco",
  "group": "Sugestões",
  "name": "Penne ao sugo com filé de frango grelhado",
  "price": 32,
  "unit": "unidade"
 },
 {
  "id": "nhoque-ao-sugo-com-bife-a-parmegiana",
  "cat": "almoco",
  "group": "Sugestões",
  "name": "Nhoque ao sugo com bife à parmegiana",
  "price": 33.9,
  "unit": "unidade"
 },
 {
  "id": "panqueca-com-salada",
  "cat": "almoco",
  "group": "Prato feito",
  "name": "Panqueca com salada",
  "price": 25.9,
  "unit": "unidade",
  "desc": "Consulte os molhos."
 },
 {
  "id": "feijoada-prato-feito",
  "cat": "feijoada",
  "group": "",
  "name": "Feijoada, prato feito",
  "price": 28.9,
  "unit": "unidade",
  "desc": "Arroz, couve, farofa, vinagrete, torresmo e feijoada servida separadamente. Opção light (menos gordura, cortes leves) ou tradicional."
 },
 {
  "id": "feijoada-para-viagem-1-pessoa",
  "cat": "feijoada",
  "group": "",
  "name": "Feijoada para viagem, 1 pessoa",
  "price": 30,
  "unit": "unidade"
 },
 {
  "id": "feijoada-para-viagem-2-pessoas",
  "cat": "feijoada",
  "group": "",
  "name": "Feijoada para viagem, 2 pessoas",
  "price": 58,
  "unit": "unidade"
 },
 {
  "id": "cafe-coado-pequeno",
  "cat": "cafes",
  "group": "Cafés coados",
  "name": "Café coado pequeno",
  "price": 4.9,
  "unit": "unidade",
  "desc": "Café da casa, passado."
 },
 {
  "id": "cafe-coado-com-leite-pequeno",
  "cat": "cafes",
  "group": "Cafés coados",
  "name": "Café coado com leite pequeno",
  "price": 5,
  "unit": "unidade",
  "desc": "Café da casa, passado, com leite."
 },
 {
  "id": "cafe-coado-medio",
  "cat": "cafes",
  "group": "Cafés coados",
  "name": "Café coado médio",
  "price": 8.1,
  "unit": "unidade",
  "desc": "Café da casa, passado."
 },
 {
  "id": "cafe-coado-com-leite-medio",
  "cat": "cafes",
  "group": "Cafés coados",
  "name": "Café coado com leite médio",
  "price": 8.6,
  "unit": "unidade",
  "desc": "Café da casa, passado, com leite vaporizado."
 },
 {
  "id": "cafe-expresso-pequeno",
  "cat": "cafes",
  "group": "Cafés expressos",
  "name": "Café expresso pequeno",
  "price": 7,
  "unit": "unidade",
  "desc": "1 dose de café expresso."
 },
 {
  "id": "cafe-expresso-medio",
  "cat": "cafes",
  "group": "Cafés expressos",
  "name": "Café expresso médio",
  "price": 9.6,
  "unit": "unidade",
  "desc": "2 doses de café expresso."
 },
 {
  "id": "cafe-latte",
  "cat": "cafes",
  "group": "Cafés expressos",
  "name": "Café latte",
  "price": 9.6,
  "unit": "unidade",
  "desc": "1 dose de café expresso e leite vaporizado."
 },
 {
  "id": "doppio-com-leite",
  "cat": "cafes",
  "group": "Cafés expressos",
  "name": "Doppio com leite",
  "price": 9.5,
  "unit": "unidade",
  "desc": "2 doses de café expresso e leite vaporizado."
 },
 {
  "id": "expresso-macchiato",
  "cat": "cafes",
  "group": "Cafés expressos",
  "name": "Expresso macchiato",
  "price": 9,
  "unit": "unidade",
  "desc": "1 dose de café expresso e a espuma do leite."
 },
 {
  "id": "iced-latte",
  "cat": "cafes",
  "group": "Cafés gelados",
  "name": "Iced latte",
  "price": 9.5,
  "unit": "unidade",
  "desc": "1 dose de café expresso, leite e gelo."
 },
 {
  "id": "cafe-frappe",
  "cat": "cafes",
  "group": "Cafés gelados",
  "name": "Café frappé",
  "price": 13.9,
  "unit": "unidade",
  "desc": "1 dose de expresso e sorvete de creme."
 },
 {
  "id": "cafe-expresso-tonica",
  "cat": "cafes",
  "group": "Cafés gelados",
  "name": "Café expresso tônica",
  "price": 10.9,
  "unit": "unidade",
  "desc": "1 dose de expresso, gelo e tônica com limão ou laranja."
 },
 {
  "id": "chocolate-quente",
  "cat": "cafes",
  "group": "Chocolates",
  "name": "Chocolate quente",
  "price": 8.6,
  "unit": "unidade",
  "desc": "Achocolatado e leite vaporizado."
 },
 {
  "id": "chocolate-quente-cremoso",
  "cat": "cafes",
  "group": "Chocolates",
  "name": "Chocolate quente cremoso",
  "price": 9.9,
  "unit": "unidade",
  "desc": "Pré-mistura de chocolate e leite vaporizado."
 },
 {
  "id": "chocolate-gelado",
  "cat": "cafes",
  "group": "Chocolates",
  "name": "Chocolate gelado",
  "price": 8,
  "unit": "unidade",
  "desc": "Achocolatado, leite gelado e gelo batido."
 },
 {
  "id": "cappuccino-tradicional",
  "cat": "cafes",
  "group": "Cappuccinos",
  "name": "Cappuccino tradicional",
  "price": 9.1,
  "unit": "unidade",
  "desc": "Pré-mistura e leite vaporizado."
 },
 {
  "id": "cappuccino-italiano",
  "cat": "cafes",
  "group": "Cappuccinos",
  "name": "Cappuccino italiano",
  "price": 10.6,
  "unit": "unidade",
  "desc": "1 dose de expresso, crema de leite, canela e cacau."
 },
 {
  "id": "cappuccino-gelado",
  "cat": "cafes",
  "group": "Cappuccinos",
  "name": "Cappuccino gelado",
  "price": 9.5,
  "unit": "unidade",
  "desc": "Pré-mistura, leite gelado e gelo batido."
 },
 {
  "id": "leite-quente",
  "cat": "cafes",
  "group": "Leites, chás e refrescantes",
  "name": "Leite quente",
  "price": 5,
  "unit": "unidade"
 },
 {
  "id": "leite-frio",
  "cat": "cafes",
  "group": "Leites, chás e refrescantes",
  "name": "Leite frio",
  "price": 4.5,
  "unit": "unidade"
 },
 {
  "id": "cha-quente",
  "cat": "cafes",
  "group": "Leites, chás e refrescantes",
  "name": "Chá quente",
  "price": 5.5,
  "unit": "unidade",
  "desc": "Consulte os sabores no balcão."
 },
 {
  "id": "chai-indiano",
  "cat": "cafes",
  "group": "Leites, chás e refrescantes",
  "name": "Chai indiano",
  "price": 7.9,
  "unit": "unidade",
  "desc": "Chá preto com especiarias e leite vaporizado."
 },
 {
  "id": "soda-italiana",
  "cat": "cafes",
  "group": "Leites, chás e refrescantes",
  "name": "Soda italiana",
  "price": 11.5,
  "unit": "unidade",
  "desc": "Xarope, gelo e água com gás. Consulte os sabores no balcão."
 },
 {
  "id": "suco-de-abacaxi",
  "cat": "sucos",
  "group": "Sucos naturais",
  "name": "Suco de abacaxi",
  "price": 8.9,
  "unit": "unidade"
 },
 {
  "id": "suco-de-abacaxi-com-hortela",
  "cat": "sucos",
  "group": "Sucos naturais",
  "name": "Suco de abacaxi com hortelã",
  "price": 8.9,
  "unit": "unidade"
 },
 {
  "id": "suco-de-laranja",
  "cat": "sucos",
  "group": "Sucos naturais",
  "name": "Suco de laranja",
  "price": 8.9,
  "unit": "unidade"
 },
 {
  "id": "suco-de-limao",
  "cat": "sucos",
  "group": "Sucos naturais",
  "name": "Suco de limão",
  "price": 8.9,
  "unit": "unidade"
 },
 {
  "id": "suco-de-morango",
  "cat": "sucos",
  "group": "Sucos naturais",
  "name": "Suco de morango",
  "price": 8.9,
  "unit": "unidade"
 },
 {
  "id": "suco-de-laranja-com-abacaxi",
  "cat": "sucos",
  "group": "Sucos naturais",
  "name": "Suco de laranja com abacaxi",
  "price": 10.9,
  "unit": "unidade"
 },
 {
  "id": "suco-de-laranja-com-morango",
  "cat": "sucos",
  "group": "Sucos naturais",
  "name": "Suco de laranja com morango",
  "price": 11.9,
  "unit": "unidade"
 },
 {
  "id": "suco-de-laranja-limao-e-gengibre",
  "cat": "sucos",
  "group": "Sucos naturais",
  "name": "Suco de laranja, limão e gengibre",
  "price": 10.9,
  "unit": "unidade"
 },
 {
  "id": "vitamina-de-banana",
  "cat": "sucos",
  "group": "Vitaminas",
  "name": "Vitamina de banana",
  "price": 12.9,
  "unit": "unidade"
 },
 {
  "id": "vitamina-de-banana-com-mamao",
  "cat": "sucos",
  "group": "Vitaminas",
  "name": "Vitamina de banana com mamão",
  "price": 13.5,
  "unit": "unidade"
 },
 {
  "id": "vitamina-de-banana-com-morango",
  "cat": "sucos",
  "group": "Vitaminas",
  "name": "Vitamina de banana com morango",
  "price": 13.9,
  "unit": "unidade"
 },
 {
  "id": "vitamina-de-maca-com-mamao",
  "cat": "sucos",
  "group": "Vitaminas",
  "name": "Vitamina de maçã com mamão",
  "price": 13.5,
  "unit": "unidade"
 },
 {
  "id": "torta-de-limao-com-merengue",
  "cat": "vitrine",
  "group": "",
  "name": "Torta de Limão com Merengue",
  "price": null,
  "unit": "unidade"
 },
 {
  "id": "bolo-com-goiabada",
  "cat": "vitrine",
  "group": "",
  "name": "Bolo com Goiabada",
  "price": null,
  "unit": "unidade"
 },
 {
  "id": "doguinho",
  "cat": "encomendas",
  "group": "Salgados assados (mín. 20 unid. por sabor)",
  "name": "Doguinho",
  "price": 1.7,
  "unit": "unidade",
  "min": 20,
  "step": 10,
  "desc": "Pedido mínimo: 20 unid. por sabor."
 },
 {
  "id": "trouxinha-de-calabresa",
  "cat": "encomendas",
  "group": "Salgados assados (mín. 20 unid. por sabor)",
  "name": "Trouxinha de calabresa",
  "price": 1.7,
  "unit": "unidade",
  "min": 20,
  "step": 10,
  "desc": "Pedido mínimo: 20 unid. por sabor."
 },
 {
  "id": "trouxinha-de-frango",
  "cat": "encomendas",
  "group": "Salgados assados (mín. 20 unid. por sabor)",
  "name": "Trouxinha de frango",
  "price": 1.7,
  "unit": "unidade",
  "min": 20,
  "step": 10,
  "desc": "Pedido mínimo: 20 unid. por sabor."
 },
 {
  "id": "trouxinha-de-queijo-e-presunto",
  "cat": "encomendas",
  "group": "Salgados assados (mín. 20 unid. por sabor)",
  "name": "Trouxinha de queijo e presunto",
  "price": 1.7,
  "unit": "unidade",
  "min": 20,
  "step": 10,
  "desc": "Pedido mínimo: 20 unid. por sabor."
 },
 {
  "id": "trouxinha-de-catupiry",
  "cat": "encomendas",
  "group": "Salgados assados (mín. 20 unid. por sabor)",
  "name": "Trouxinha de catupiry",
  "price": 1.7,
  "unit": "unidade",
  "min": 20,
  "step": 10,
  "desc": "Pedido mínimo: 20 unid. por sabor."
 },
 {
  "id": "empadinha-de-frango",
  "cat": "encomendas",
  "group": "Salgados assados (mín. 20 unid. por sabor)",
  "name": "Empadinha de frango",
  "price": 1.7,
  "unit": "unidade",
  "min": 20,
  "step": 10,
  "desc": "Pedido mínimo: 20 unid. por sabor."
 },
 {
  "id": "empadinha-de-palmito",
  "cat": "encomendas",
  "group": "Salgados assados (mín. 20 unid. por sabor)",
  "name": "Empadinha de palmito",
  "price": 1.7,
  "unit": "unidade",
  "min": 20,
  "step": 10,
  "desc": "Pedido mínimo: 20 unid. por sabor."
 },
 {
  "id": "mini-calabresa",
  "cat": "encomendas",
  "group": "Mini folhados (mín. 20 unid. por sabor)",
  "name": "Mini calabresa",
  "price": 2.1,
  "unit": "unidade",
  "min": 20,
  "step": 10,
  "desc": "Pedido mínimo: 20 unid. por sabor."
 },
 {
  "id": "mini-peito-de-peru-com-catupiry",
  "cat": "encomendas",
  "group": "Mini folhados (mín. 20 unid. por sabor)",
  "name": "Mini peito de peru com catupiry",
  "price": 2.1,
  "unit": "unidade",
  "min": 20,
  "step": 10,
  "desc": "Pedido mínimo: 20 unid. por sabor."
 },
 {
  "id": "mini-ricota-temperada",
  "cat": "encomendas",
  "group": "Mini folhados (mín. 20 unid. por sabor)",
  "name": "Mini ricota temperada",
  "price": 2.1,
  "unit": "unidade",
  "min": 20,
  "step": 10,
  "desc": "Pedido mínimo: 20 unid. por sabor."
 },
 {
  "id": "mini-pao-de-batata",
  "cat": "encomendas",
  "group": "Mini folhados (mín. 20 unid. por sabor)",
  "name": "Mini pão de batata",
  "price": 2.1,
  "unit": "unidade",
  "min": 20,
  "step": 10,
  "desc": "Pedido mínimo: 20 unid. por sabor."
 },
 {
  "id": "mini-esfiha-de-carne",
  "cat": "encomendas",
  "group": "Mini folhados (mín. 20 unid. por sabor)",
  "name": "Mini esfiha de carne",
  "price": 2.1,
  "unit": "unidade",
  "min": 20,
  "step": 10,
  "desc": "Pedido mínimo: 20 unid. por sabor."
 },
 {
  "id": "mini-esfiha-de-frango",
  "cat": "encomendas",
  "group": "Mini folhados (mín. 20 unid. por sabor)",
  "name": "Mini esfiha de frango",
  "price": 2.1,
  "unit": "unidade",
  "min": 20,
  "step": 10,
  "desc": "Pedido mínimo: 20 unid. por sabor."
 },
 {
  "id": "coxinha-de-frango",
  "cat": "encomendas",
  "group": "Salgados fritos (mín. 20 unid. por sabor)",
  "name": "Coxinha de frango",
  "price": 1.5,
  "unit": "unidade",
  "min": 20,
  "step": 10,
  "desc": "Pedido mínimo: 20 unid. por sabor."
 },
 {
  "id": "coxinha-de-frango-com-catupiry",
  "cat": "encomendas",
  "group": "Salgados fritos (mín. 20 unid. por sabor)",
  "name": "Coxinha de frango com catupiry",
  "price": 1.5,
  "unit": "unidade",
  "min": 20,
  "step": 10,
  "desc": "Pedido mínimo: 20 unid. por sabor."
 },
 {
  "id": "bolinha-de-queijo",
  "cat": "encomendas",
  "group": "Salgados fritos (mín. 20 unid. por sabor)",
  "name": "Bolinha de queijo",
  "price": 1.5,
  "unit": "unidade",
  "min": 20,
  "step": 10,
  "desc": "Pedido mínimo: 20 unid. por sabor."
 },
 {
  "id": "almofadinha-de-carne",
  "cat": "encomendas",
  "group": "Salgados fritos (mín. 20 unid. por sabor)",
  "name": "Almofadinha de carne",
  "price": 1.5,
  "unit": "unidade",
  "min": 20,
  "step": 10,
  "desc": "Pedido mínimo: 20 unid. por sabor."
 },
 {
  "id": "kibe",
  "cat": "encomendas",
  "group": "Salgados fritos (mín. 20 unid. por sabor)",
  "name": "Kibe",
  "price": 1.5,
  "unit": "unidade",
  "min": 20,
  "step": 10,
  "desc": "Pedido mínimo: 20 unid. por sabor."
 },
 {
  "id": "pastel-de-vento-de-carne",
  "cat": "encomendas",
  "group": "Pastel de vento (mín. 20 unid. por sabor)",
  "name": "Pastel de vento de carne",
  "price": 1.3,
  "unit": "unidade",
  "min": 20,
  "step": 10,
  "desc": "Pedido mínimo: 20 unid. por sabor."
 },
 {
  "id": "pastel-de-vento-de-queijo",
  "cat": "encomendas",
  "group": "Pastel de vento (mín. 20 unid. por sabor)",
  "name": "Pastel de vento de queijo",
  "price": 1.3,
  "unit": "unidade",
  "min": 20,
  "step": 10,
  "desc": "Pedido mínimo: 20 unid. por sabor."
 },
 {
  "id": "pastel-de-vento-de-palmito",
  "cat": "encomendas",
  "group": "Pastel de vento (mín. 20 unid. por sabor)",
  "name": "Pastel de vento de palmito",
  "price": 1.3,
  "unit": "unidade",
  "min": 20,
  "step": 10,
  "desc": "Pedido mínimo: 20 unid. por sabor."
 },
 {
  "id": "pastel-de-vento-de-pizza",
  "cat": "encomendas",
  "group": "Pastel de vento (mín. 20 unid. por sabor)",
  "name": "Pastel de vento de pizza",
  "price": 1.3,
  "unit": "unidade",
  "min": 20,
  "step": 10,
  "desc": "Pedido mínimo: 20 unid. por sabor."
 },
 {
  "id": "sanduiche-de-metro-de-frango",
  "cat": "encomendas",
  "group": "Sanduíches de metro (baguete com 65 cm, sem pedido mínimo)",
  "name": "Sanduíche de metro de frango",
  "price": null,
  "unit": "unidade",
  "desc": "Peito de frango desfiado, cenoura ralada, maionese, queijo prato, alface e tomate."
 },
 {
  "id": "sanduiche-de-metro-de-queijo-e-presunto",
  "cat": "encomendas",
  "group": "Sanduíches de metro (baguete com 65 cm, sem pedido mínimo)",
  "name": "Sanduíche de metro de queijo e presunto",
  "price": null,
  "unit": "unidade",
  "desc": "Fatias de queijo prato e presunto, alface, tomate e maionese."
 },
 {
  "id": "sanduiche-de-metro-de-peito-de-peru-e-ricota",
  "cat": "encomendas",
  "group": "Sanduíches de metro (baguete com 65 cm, sem pedido mínimo)",
  "name": "Sanduíche de metro de peito de peru e ricota",
  "price": null,
  "unit": "unidade",
  "desc": "Peito de peru defumado, ricota, cenoura ralada, rúcula e maionese."
 },
 {
  "id": "sanduiche-de-metro-de-salaminho",
  "cat": "encomendas",
  "group": "Sanduíches de metro (baguete com 65 cm, sem pedido mínimo)",
  "name": "Sanduíche de metro de salaminho",
  "price": null,
  "unit": "unidade",
  "desc": "Salame italiano, queijo mussarela, alface, tomate e maionese."
 },
 {
  "id": "mini-sanduiche-de-queijo-e-presunto",
  "cat": "encomendas",
  "group": "Mini sanduíches (mín. 10 unid. por sabor)",
  "name": "Mini sanduíche de queijo e presunto",
  "price": 3.5,
  "unit": "unidade",
  "min": 10,
  "step": 5,
  "desc": "Fatias de queijo prato e presunto, alface, tomate e maionese. Pedido mínimo: 10 unid. por sabor."
 },
 {
  "id": "mini-sanduiche-de-peito-de-peru-e-ricota",
  "cat": "encomendas",
  "group": "Mini sanduíches (mín. 10 unid. por sabor)",
  "name": "Mini sanduíche de peito de peru e ricota",
  "price": 3.7,
  "unit": "unidade",
  "min": 10,
  "step": 5,
  "desc": "Peito de peru defumado, ricota, rúcula e maionese. Pedido mínimo: 10 unid. por sabor."
 },
 {
  "id": "mini-sanduiche-de-salaminho",
  "cat": "encomendas",
  "group": "Mini sanduíches (mín. 10 unid. por sabor)",
  "name": "Mini sanduíche de salaminho",
  "price": 3.9,
  "unit": "unidade",
  "min": 10,
  "step": 5,
  "desc": "Salame italiano, queijo mussarela, alface, tomate e maionese. Pedido mínimo: 10 unid. por sabor."
 },
 {
  "id": "brigadeiro-tradicional",
  "cat": "encomendas",
  "group": "Docinhos simples (mín. 20 unid. por sabor)",
  "name": "Brigadeiro tradicional",
  "price": 2,
  "unit": "unidade",
  "min": 20,
  "step": 10,
  "desc": "Pedido mínimo: 20 unid. por sabor."
 },
 {
  "id": "brigadeiro-branco",
  "cat": "encomendas",
  "group": "Docinhos simples (mín. 20 unid. por sabor)",
  "name": "Brigadeiro branco",
  "price": 2,
  "unit": "unidade",
  "min": 20,
  "step": 10,
  "desc": "Pedido mínimo: 20 unid. por sabor."
 },
 {
  "id": "beijinho",
  "cat": "encomendas",
  "group": "Docinhos simples (mín. 20 unid. por sabor)",
  "name": "Beijinho",
  "price": 2,
  "unit": "unidade",
  "min": 20,
  "step": 10,
  "desc": "Pedido mínimo: 20 unid. por sabor."
 },
 {
  "id": "cajuzinho",
  "cat": "encomendas",
  "group": "Docinhos simples (mín. 20 unid. por sabor)",
  "name": "Cajuzinho",
  "price": 2,
  "unit": "unidade",
  "min": 20,
  "step": 10,
  "desc": "Pedido mínimo: 20 unid. por sabor."
 },
 {
  "id": "dois-amores",
  "cat": "encomendas",
  "group": "Docinhos simples (mín. 20 unid. por sabor)",
  "name": "Dois amores",
  "price": 2,
  "unit": "unidade",
  "min": 20,
  "step": 10,
  "desc": "Pedido mínimo: 20 unid. por sabor."
 },
 {
  "id": "camafeu",
  "cat": "encomendas",
  "group": "Docinhos gourmet (mín. 20 unid. por sabor)",
  "name": "Camafeu",
  "price": 3,
  "unit": "unidade",
  "min": 20,
  "step": 10,
  "desc": "Pedido mínimo: 20 unid. por sabor."
 },
 {
  "id": "ninho-com-nutella",
  "cat": "encomendas",
  "group": "Docinhos gourmet (mín. 20 unid. por sabor)",
  "name": "Ninho com Nutella",
  "price": 3,
  "unit": "unidade",
  "min": 20,
  "step": 10,
  "desc": "Pedido mínimo: 20 unid. por sabor."
 },
 {
  "id": "olho-de-sogra",
  "cat": "encomendas",
  "group": "Docinhos gourmet (mín. 20 unid. por sabor)",
  "name": "Olho de sogra",
  "price": 3,
  "unit": "unidade",
  "min": 20,
  "step": 10,
  "desc": "Pedido mínimo: 20 unid. por sabor."
 },
 {
  "id": "surpresa-de-uva",
  "cat": "encomendas",
  "group": "Docinhos gourmet (mín. 20 unid. por sabor)",
  "name": "Surpresa de uva",
  "price": 3,
  "unit": "unidade",
  "min": 20,
  "step": 10,
  "desc": "Pedido mínimo: 20 unid. por sabor."
 },
 {
  "id": "carolina-de-creme",
  "cat": "encomendas",
  "group": "Carolinas (mín. 20 unid. por sabor)",
  "name": "Carolina de creme",
  "price": 2.3,
  "unit": "unidade",
  "min": 20,
  "step": 10,
  "desc": "Pedido mínimo: 20 unid. por sabor."
 },
 {
  "id": "carolina-de-chocolate",
  "cat": "encomendas",
  "group": "Carolinas (mín. 20 unid. por sabor)",
  "name": "Carolina de chocolate",
  "price": 2.3,
  "unit": "unidade",
  "min": 20,
  "step": 10,
  "desc": "Pedido mínimo: 20 unid. por sabor."
 },
 {
  "id": "carolina-de-doce-de-leite",
  "cat": "encomendas",
  "group": "Carolinas (mín. 20 unid. por sabor)",
  "name": "Carolina de doce de leite",
  "price": 2.3,
  "unit": "unidade",
  "min": 20,
  "step": 10,
  "desc": "Pedido mínimo: 20 unid. por sabor."
 },
 {
  "id": "carolina-de-limao",
  "cat": "encomendas",
  "group": "Carolinas (mín. 20 unid. por sabor)",
  "name": "Carolina de limão",
  "price": 2.3,
  "unit": "unidade",
  "min": 20,
  "step": 10,
  "desc": "Pedido mínimo: 20 unid. por sabor."
 },
 {
  "id": "bolo-de-abacaxi-com-coco",
  "cat": "encomendas",
  "group": "Bolos confeitados (pedido mínimo de 1,5 kg)",
  "name": "Bolo de Abacaxi com Coco",
  "price": null,
  "unit": "kg",
  "min": 1.5,
  "desc": "Pão de ló branco, cocada cremosa e abacaxi. Cobertura: chantilly, coco em flocos, coco queimado e abacaxi. Pedido mínimo: 1,5 kg."
 },
 {
  "id": "bolo-de-brigadeiro-com-morangos",
  "cat": "encomendas",
  "group": "Bolos confeitados (pedido mínimo de 1,5 kg)",
  "name": "Bolo de Brigadeiro com Morangos",
  "price": null,
  "unit": "kg",
  "min": 1.5,
  "desc": "Pão de ló de chocolate, brigadeiro mole, nata e morango. Cobertura: chantilly, raspas de chocolate e morangos. Pedido mínimo: 1,5 kg."
 },
 {
  "id": "bolo-de-chocolate-trufado",
  "cat": "encomendas",
  "group": "Bolos confeitados (pedido mínimo de 1,5 kg)",
  "name": "Bolo de Chocolate Trufado",
  "price": null,
  "unit": "kg",
  "min": 1.5,
  "desc": "Pão de ló de chocolate e chocolate trufado. Cobertura: chantilly, chocolate trufado, chocolate em pó e trufas de chocolate. Pedido mínimo: 1,5 kg."
 },
 {
  "id": "bolo-dois-amores",
  "cat": "encomendas",
  "group": "Bolos confeitados (pedido mínimo de 1,5 kg)",
  "name": "Bolo Dois Amores",
  "price": null,
  "unit": "kg",
  "min": 1.5,
  "desc": "Pão de ló branco e de chocolate, brigadeiro mole e brigadeiro mole branco. Cobertura: chantilly, ganache de chocolate, ganache de chocolate branco e dois amores. Pedido mínimo: 1,5 kg."
 },
 {
  "id": "bolo-floresta-negra",
  "cat": "encomendas",
  "group": "Bolos confeitados (pedido mínimo de 1,5 kg)",
  "name": "Bolo Floresta Negra",
  "price": null,
  "unit": "kg",
  "min": 1.5,
  "desc": "Pão de ló de chocolate, brigadeiro mole, cereja e nata. Cobertura: chantilly, raspas de chocolate e cerejas. Pedido mínimo: 1,5 kg."
 },
 {
  "id": "bolo-de-frutas",
  "cat": "encomendas",
  "group": "Bolos confeitados (pedido mínimo de 1,5 kg)",
  "name": "Bolo de Frutas",
  "price": null,
  "unit": "kg",
  "min": 1.5,
  "desc": "Pão de ló branco, creme chiffon e frutas. Cobertura: chantilly, ganache de chocolate branco e frutas. Pedido mínimo: 1,5 kg."
 },
 {
  "id": "bolo-marta-rocha",
  "cat": "encomendas",
  "group": "Bolos confeitados (pedido mínimo de 1,5 kg)",
  "name": "Bolo Marta Rocha",
  "price": null,
  "unit": "kg",
  "min": 1.5,
  "desc": "Pão de ló branco e de chocolate, strogonoff de nozes, baba de moça, suspiro, damasco, ameixa e nata. Cobertura: chantilly, crocante de nozes, cereja e nozes. Pedido mínimo: 1,5 kg."
 },
 {
  "id": "bolo-de-morango-com-nata",
  "cat": "encomendas",
  "group": "Bolos confeitados (pedido mínimo de 1,5 kg)",
  "name": "Bolo de Morango com Nata",
  "price": null,
  "unit": "kg",
  "min": 1.5,
  "desc": "Pão de ló branco, creme chiffon, morango e nata. Cobertura: chantilly, suspiro e morangos. Pedido mínimo: 1,5 kg."
 },
 {
  "id": "bolo-prestigio",
  "cat": "encomendas",
  "group": "Bolos confeitados (pedido mínimo de 1,5 kg)",
  "name": "Bolo Prestígio",
  "price": null,
  "unit": "kg",
  "min": 1.5,
  "desc": "Pão de ló de chocolate, brigadeiro mole e cocada cremosa. Cobertura: chantilly, chocolate trufado, ganache branco e beijinho. Pedido mínimo: 1,5 kg."
 },
 {
  "id": "bolo-strogonoff-de-nozes",
  "cat": "encomendas",
  "group": "Bolos confeitados (pedido mínimo de 1,5 kg)",
  "name": "Bolo Strogonoff de Nozes",
  "price": null,
  "unit": "kg",
  "min": 1.5,
  "desc": "Pão de ló de chocolate, strogonoff de nozes, baba de moça e doce de leite. Cobertura: chantilly, chocolate trufado, crocante de nozes e nozes. Pedido mínimo: 1,5 kg."
 },
 {
  "id": "coffee-break-andina-n-1",
  "cat": "encomendas",
  "group": "Coffee break (pedido mínimo de 10 pessoas)",
  "name": "Coffee break Andina nº 1",
  "price": 17.9,
  "unit": "pessoa",
  "min": 10,
  "desc": "2 mini salgados assados (doguinho, esfiha de carne ou pão de batata), 3 mini salgados fritos (coxinha de frango, bolinha de queijo ou risoles), 1 sanduíche (presunto, queijo, alface e tomate) e 1 mini sonho (doce de leite, goiabada, creme ou chocolate). Pedido mínimo: 10 pessoa."
 },
 {
  "id": "coffee-break-andina-n-2",
  "cat": "encomendas",
  "group": "Coffee break (pedido mínimo de 10 pessoas)",
  "name": "Coffee break Andina nº 2",
  "price": 19.9,
  "unit": "pessoa",
  "min": 10,
  "desc": "2 mini salgados assados (doguinho, esfiha de carne, esfiha de frango ou pão de batata), 2 mini salgados fritos (coxinha de frango, bolinha de queijo ou risoles), 2 mini salgados folhados, 1 sanduíche (presunto, queijo, alface e tomate) e 1 mini sonho (doce de leite, goiabada, creme ou chocolate). Pedido mínimo: 10 pessoa."
 },
 {
  "id": "coffee-break-andina-n-3",
  "cat": "encomendas",
  "group": "Coffee break (pedido mínimo de 10 pessoas)",
  "name": "Coffee break Andina nº 3",
  "price": 22.9,
  "unit": "pessoa",
  "min": 10,
  "desc": "2 mini salgados assados (doguinho, esfiha de carne, esfiha de frango ou pão de batata), 2 mini salgados fritos (coxinha de frango, bolinha de queijo ou risoles), 2 mini salgados folhados, 2 sanduíches (presunto, queijo, alface e tomate), 1 mini sonho (doce de leite, goiabada, creme ou chocolate), 1 mini folhado doce e 1 salada de frutas de 145 ml. Pedido mínimo: 10 pessoa."
 },
 {
  "id": "garrafa-de-cafe",
  "cat": "encomendas",
  "group": "Para acompanhar o coffee break",
  "name": "Garrafa de café",
  "price": 25,
  "unit": "garrafa"
 },
 {
  "id": "garrafa-de-leite",
  "cat": "encomendas",
  "group": "Para acompanhar o coffee break",
  "name": "Garrafa de leite",
  "price": 20,
  "unit": "garrafa"
 }
];

export const PHOTOS: Record<string, string> = {
  "cheese-bacon": "/assets/produtos/cheese-bacon.jpg",
  "misto-quente": "/assets/produtos/misto-quente.jpg",
  "torta-de-limao-com-merengue": "/assets/produtos/torta-de-limao-com-merengue.jpg",
  "bolo-com-goiabada": "/assets/produtos/bolo-com-goiabada.jpg"
};

export const FEATURED: string[] = [
  "Cheese Bacon",
  "Misto quente",
  "Torta de Limão com Merengue",
  "Bolo com Goiabada"
];
