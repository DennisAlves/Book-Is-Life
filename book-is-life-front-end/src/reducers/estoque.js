import Hobbit from "../containers/Images/hobbit.jpg"
import OmundoAssombrado from "../containers/Images/o-mundo-assombrado-capa.jpg"
import OpoderDoHabito from "../containers/Images/o-poder-do-habito.jpg"
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
const initialState = {
    estoque: [
        {
            id: "1",
            titulo:"The Hobbit",
            autor: "J. R. R. Tolkien",
            dtLancamento: "27 outubro 2011",
            editora:"HarperCollins",
            edicao: "2º",
            idioma: "ingles",
            tipoCapa: "Comum",
            descricao: loremIpsum,
            paginas: "400",
            ISBN10: "0261103342",
            ISBN13: "978-0261103344",
            largura: "12.5",
            altura: "2.2",
            profundidade: "19.5",
            peso: "0.6",
            custo: 40.00,
            qtde: "15",
            categorias: [],
            precificacao: 0.15,
            image:Hobbit,
            ativo: true,
        },
        {
            id: "2",
            titulo:"O mundo assombrado pelos demônios",
            autor: "Carl Sagan",
            dtLancamento: "15 maio 2006",
            edicao: "4º",
            editora:"Companhia de Bolso",
            idioma: "Português",
            tipoCapa: "Comum",
            descricao: loremIpsum,
            paginas: "512",
            ISBN10: "853590834X",
            ISBN13: "978-8535908343",
            largura: "17.8",
            altura: "2.6 ",
            profundidade: "12.6 ",
            peso: "0.2",
            custo: 25.00,
            qtde: "15",
            categorias: [],
            precificacao: 0.15,
            image:OmundoAssombrado,
            ativo: true,
        },
        {
            id: "3",
            titulo:"O poder do hábito",
            autor: "Charles Duhigg",
            dtLancamento: "24 setembro 2012",
            edicao: "1º",
            editora:"Objetiva",
            idioma: "Português",
            tipoCapa: "Comum",
            descricao: loremIpsum,
            paginas: "408 ",
            ISBN10: "8539004119",
            ISBN13: "978-8539004119",
            largura: "22.8 ",
            altura: "2.4",
            profundidade: "16",
            peso: "0.3",
            custo: 30.00,
            qtde: "12",
            categorias: [],
            precificacao: 0.20,
            image:OpoderDoHabito,
            ativo: false,
        },
    ],
    productId:"",
};

const estoque = (state = initialState, action) => {
    console.log(state)
    switch (action.type) {
        case 'ESTOQUE_UPDATE_VALUE':
            return {
                ...state,
                estoque: action.payload.estoque
            }
        case 'PRODUCT_ID_UPDATE_VALUE':
            return {
                ...state,
                productId: action.payload.productId
            }
        default:
            return state;
    }
}

export default estoque;