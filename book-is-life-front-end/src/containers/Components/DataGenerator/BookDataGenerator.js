import moment from "moment";
import {v4 as uuidv4} from 'uuid';

moment.locale('pt-br');

export default function BookDataGenerator(imagem) {
    const loremIpsum = "Lorem ipsum dolor sit amet," +
        " consectetur adipiscing elit, " +
        "sed do eiusmod tempor incididunt ut labore et dolore magna" +
        " aliqua. Neque volutpat ac tincidunt vitae. " +
        "Lorem ipsum dolor sit amet consectetur adipiscing elit." +
        " Sed turpis tincidunt id aliquet. " +
        "Tellus rutrum tellus pellentesque eu tincidunt tortor aliquam." +
        "Lectus sit amet est placerat in. Nibh tellus molestie nunc non." +
        " Aenean vel elit scelerisque mauris. " +
        "Duis ut diam quam nulla porttitor massa id. " +
        "Mi proin sed libero enim sed faucibus turpis in."
    const livros = [
        {titulo:"Odisseia",ano: "século VIII a.C.",autor:" Homero"},
        {titulo:"Os Irmãos Karamazov ",ano:"1880", autor:"Fiódor Dostoiévski"},
        {titulo:"Crime e Castigo ",ano:"1866", autor:"Fiódor Dostoiévski"},
        {titulo:"Madame Bovary ",ano:"1856", autor:"Gustave Flaubert"},
        {titulo:"Divina Comédia ",ano:"1472", autor:"Dante Alighieri"},
        {titulo:"As Aventuras de Huckleberry Finn ",ano:"1884", autor:"Mark Twain"},
        {titulo:"Alice no País das Maravilhas ",ano:"1865", autor:"Lewis Carroll"},
        {titulo:"Orgulho e Preconceito ",ano:"1812", autor:"Jane Austen"},
        {titulo:"O Morro dos Ventos Uivantes ",ano:"1847", autor:" Emily Brontë"},
        {titulo:"Ao Farol ",ano:"1927", autor:" Virginia Woolf"},
        {titulo:"Ardil-22 ",ano:"1961", autor:"Joseph Heller"},
        {titulo:"O Som e A Fúria ",ano:"1929", autor:" William Faulkner"},
        {titulo:"1984 ",ano:"1949", autor:"George Orwell"},
        {titulo:"Anna Karenina ",ano:"1877", autor:" Lev Tolstói"},
        {titulo:"Ilíada",ano: "século VIII a.C.",autor:" Homero"},
        {titulo:"O Coração das Trevas ",ano:"1902", autor:"Joseph Conrad"},
        {titulo:"As Vinhas da Ira ",ano:"1939", autor:"John Steinbeck"},
        {titulo:"Homem Invisível ",ano:"1952", autor:"Ralph Ellison"},
        {titulo:"O Sol é Para Todos ",ano:"1960", autor:"Harper Lee"},
        {titulo:"Middlemarch: Um Estudo da Vida Provinciana ",ano:"1871", autor:"George Eliot"},
        {titulo:"Grandes Esperanças ",ano:"1861", autor:" Charles Dickens"},
        {titulo:"As Viagens de Gulliver ",ano:"1726", autor:"Jonathan Swift"},
        {titulo:"Absalão, Absalão! ",ano:"1936", autor:"William Faulkner"},
        {titulo:"Amada ",ano:"1987", autor:"Toni Morrison"},
        {titulo:"O Estrangeiro ",ano:"1942", autor:"Albert Camus"},
        {titulo:"Jane Eyre ",ano:"1847", autor:"Charlotte Brontë"},
        {titulo:"As Mil e Uma Noites ",ano:"Contos da Índia, Irã, Iraque e Egito)"},
        {titulo:"O Processo ",ano:"1925", autor:"Franz Kafka"},
        {titulo:"O Vermelho e o Negro ",ano:"1830", autor:"Stendhal"},
        {titulo:"Mrs Dalloway ",ano:"1925", autor:"Virginia Woolf"},
        {titulo:"O Sol Também se Levanta ",ano:"1926", autor:"Ernest Hemingway"},
        {titulo:"David Copperfield ",ano:"1850", autor:"Charles Dickens"},
        {titulo:"Retrato do Artista Quando Jovem ",ano:"1916", autor:"James Joyce"},
        {titulo:"Os Filhos da Meia-Noite ",ano:"1981", autor:" Salman Rushdie"},
        {titulo:"Ficções ",ano:"1944", autor:"Jorge Luis Borges"},
        {titulo:"A Vida e as Opiniões de Tristram Shandy ",ano:"1759", autor:"Laurence Sterne"},
        {titulo:"Folhas de Relva ",ano:"1855", autor:" Walt Whitman"},
        {titulo:"Eneida ",ano:"19 a.C.", autor:"Virgílio"},
        {titulo:"Cândido, ou O Otimismo ",ano:"1759", autor:"Voltaire"},
        {titulo:"O Senhor dos Anéis ",ano:"1954", autor:"J. R. R. Tolkien"},
        {titulo:"Os Miseráveis ",ano:"1862", autor:"Victor Hugo"},
        {titulo:"A Montanha Mágica ",ano:"1924", autor:"ThomasMann"},
        {titulo:"Uma Passagem Para a Índia ",ano:"1924", autor:"Edward Morgan Foster"},
        {titulo:"O Velho e o Mar ",ano:"1952", autor:"Ernest Hemingway"},
        {titulo:"O Mundo se Despedaça ",ano:"1958", autor:"Chinua Achebe"},
        {titulo:"As Histórias Completas de Franz Kafka ",ano:"1971", autor:"Franz Kafka"},
        {titulo:"Retrato de Uma Senhora ",ano:"1881", autor:"Henry James"},
        {titulo:"Fogo Pálido ",ano:"1962", autor:"Vladimir Nabokov"},
        {titulo:"O Idiota ",ano:"1869", autor:"Fiódor Dostoiévski"},
        {titulo:"Enquanto Agonizo ",ano:"1930", autor:"William Faulkner"},
        {titulo:"Édipo Rei ",ano:"427 a.C.", autor:"Sófocles"},
        {titulo:"A Cor Púrpura ",ano:"1982", autor:" Alice Walker"},
        {titulo:"E O Vento Levou ",ano:"1936", autor:"Margaret Mitchell"},
        {titulo:"O Senhor das Moscas ",ano:"1954", autor:"William Golding"},
        {titulo:"Admirável Mundo Novo ",ano:"1932", autor:"Aldous Huxley"},
        {titulo:"Os Melhores Contos e Poemas de Edgar Allan Poe ",ano:"1849", autor:"Edgar Allan Poe"},
        {titulo:"Emma ",ano:"1815", autor:"Jane Austen"},
        {titulo:"A Época da Inocência ",ano:"1920", autor:" Edith Wharton"},
        {titulo:"Almas Mortas ",ano:"1842", autor:"Nikolai Gogol"},
        {titulo:"On The Road: Pé na Estrada ",ano:"1957", autor:"Jack Kerouac"},
        {titulo:"O Bom Soldado ",ano:"1915", autor:"Ford Madox Ford"},
        {titulo:"A Revolução dos Bichos ",ano:"1945", autor:"George Orwell"},
        {titulo:"Os Contos da Cantuária ",ano:"1932", autor:"Geoffrey Chaucer"},
        {titulo:"A Metamorfose ",ano:"1915", autor:"Franz Kafka"},
        {titulo:"Frankenstein ",ano:"1823", autor:"Mary Shelley"},
        {titulo:"Feira das Vaidades ",ano:"1847", autor:"William Makepeace Thackeray"},
        {titulo:"À Sombra do Vulcão ",ano:"1947", autor:"Malcolm Lowry"},
        {titulo:"A Terra Inútil ",ano:"1922", autor:"T. S. Eliot"},
        {titulo:"Adeus às Armas ",ano:"1929", autor:"Ernest Hemingway"},
        {titulo:"Journey to the End of the Night ",ano:"1932", autor:"Louis-Ferdinand Céline"},
        {titulo:"O Castelo ",ano:"1926", autor:"Franz Kafka"},
        {titulo:"A Educação Sentimental ",ano:"1869", autor:"Gustave Flaubert"},
        {titulo:"A Letra Escarlate ",ano:"1850", autor:"Nathaniel Hawthorne"},
        {titulo:"Matadouro 5 ",ano:"1969", autor:"Kurt Vonnegut"},
        {titulo:"O Conto da Aia ",ano:"1985", autor:"Margaret Atwood"},
        {titulo:"Charlotte’s Web ",ano:"1952", autor:"Elwyn Brooks White"},
        {titulo:"Native Son ",ano:"1940", autor:" Richard Wright"},
        {titulo:"Paraíso Perdido ",ano:"1667", autor:"John Milton"},
        {titulo:"Gargântua e Pantagruel ",ano:"1532", autor:"François Rabelais"},
        {titulo:"Fausto ",ano:"1829", autor:"Johann Wolfgang von Goethe"},
        {titulo:"Rebecca ",ano:"1938", autor:"Daphne du Maurier"},
        {titulo:"Os Demônios ",ano:"1871", autor:"Fiódor Dostoiévski"},
        {titulo:"As Flores do Mal ",ano:"1857", autor:"Charles Baudelaire"},
        {titulo:"Antígona ",ano:"442 a.C.", autor:"Sófocles"},
        {titulo:"Tess Dos D’Urbervilles ",ano:"1981", autor:"Thomas Hardy"},
        {titulo:"Robinson Crusoe ",ano:"1719", autor:"Daniel Defoe"},
        {titulo:"Seus Olhos Viam Deus ",ano:"1937", autor:"Zora Neale Hurston"},
        {titulo:"Tom Jones ",ano:"1749", autor:"Henry Fielding"},
    ]
    const editoras = [
        "Companhia das Letras",
        "Editora Rocco",
        "Editora Arqueiro",
        "Editora Intrínseca",
        "Editora Sextante",
        "Ediouro",
        "Panda Books",
        "FTD",
        "Ubu",
        "Alta Books",
        "Aleph",
        "Chiado Grupo Editorial",
        "Edições Loyola",
        "Editora Record",
        "Draco",
        "Gente",
        "Martin Claret",
        "Escala",
        "Moderna",
        "Melhoramentos",
        "Grupo Pensamento",
    ]
    const idiomas = [
        "portugues",
        "ingles",
        "italiano",
        "latim",
        "frances"
    ]
    const tipoCapa = [
        "Comum",
        "Capa dura"
    ]
    const precificacaoList= [
        0.05,
        0.10,
        0.15,
        0.20,
        0.25,
        0.30,
    ]
    const categoriaList=[
        "Biografias",
        "Coleções",
        "Comportamento",
        "ContosCrítica",
        "LiteráriaFicção",
        "Científica",
        "Folclore",
        "Genealogia",
        "Humor",
        "Infanto juvenis",
        "Jogos",
        "Jornais",
        "Literatura Brasileira",
        "Literatura Estrangeira",
        "Livros Raros",
        "Manuscritos",
        "Poesia",
        "Outros Assuntos",
    ]

    function randomiza(numero) {
        let ranNum = Math.round(Math.random() * numero);
        return ranNum;
    }
    function randomizaMinMax(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }
    function randomizaDecimal(numero) {
        return Math.round((numero + Number.EPSILON) * 100) / 100
    }
    function generateCategorias (){
        const categoriaCount = randomiza(categoriaList.length)
        let categorias = []
        for (let i = 0 ;i < categoriaCount; i++){
            categorias.push(categoriaList[randomiza(categoriaList.length - 1)])
        }
        return categorias
    }
    function ISBN10 (){
        let n = 9;
        let n1 = randomiza(n);
        let n2 = randomiza(n);
        let n3 = randomiza(n);
        let n4 = randomiza(n);
        let n5 = randomiza(n);
        let n6 = randomiza(n);
        let n7 = randomiza(n);
        let n8 = randomiza(n);
        let n9 = randomiza(n);
        let n10 = randomiza(n);
        let isbn10 = ""+ n10+ n9 + n8 + n7 + n6 + n5 + n4 + n3 + n2 + n1 + ""

        return isbn10
    }
    function ISBN13 (){
        let n = 9;
        let n1 = randomiza(n);
        let n2 = randomiza(n);
        let n3 = randomiza(n);
        let n4 = randomiza(n);
        let n5 = randomiza(n);
        let n6 = randomiza(n);
        let n7 = randomiza(n);
        let n8 = randomiza(n);
        let n9 = randomiza(n);
        let n10 = randomiza(n);
        let n11 = randomiza(n);
        let n12 = randomiza(n);
        let n13 = randomiza(n);
        let isbn13 = ""+ n13+ n12 + n11 + "-" + n10 + n9 + n8 + n7 + n6 + n5 + n4 + n3 + n2 + n1 + ""

        return isbn13
    }

    const estoque = []

    for(let i = 0;i<livros.length;i++){
        let livro = {
            id: uuidv4(),
            titulo: livros[i].titulo,
            autor: livros[i].autor,
            dtLancamento: livros[i].ano,
            editora: editoras[randomiza(editoras.length - 1)],
            edicao: ""+(randomiza(29)+1)+"º",
            idioma: idiomas[randomiza(idiomas.length)],
            tipoCapa: tipoCapa[randomiza(tipoCapa.length - 1)],
            descricao: loremIpsum,
            paginas: randomizaMinMax(50,1200),
            ISBN10: ISBN10(),
            ISBN13: ISBN13(),
            largura: randomizaMinMax(10,30),
            altura: randomizaMinMax(1,10),
            profundidade: randomizaMinMax(10,40),
            peso: randomizaDecimal(5),
            custo: randomizaMinMax(15,300),
            qtde: randomizaMinMax(15,100),
            categorias: generateCategorias(),
            precificacao: precificacaoList[randomiza(precificacaoList.length -1)],
            image: imagem,
            ativo: randomiza(1),
        }
        estoque.push(livro)
    }
    return estoque
}

