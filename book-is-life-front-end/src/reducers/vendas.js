const initialState = {
    carrinho: [],
    carrinhoVenda: [],
    vendas: [
        {
            id: 1,
            data: "01-02-2020",
            cliente:{},
            itens:{},
            pagamento:{},
            status:"",
        },
    ],
};

const vendas = (state = initialState, action) => {
    console.log(state)
    switch (action.type) {
        case 'CARRINHO_UPDATE_VALUE':
            return {
                ...state,
                carrinho: action.payload.carrinho
            }
        case 'CARRINHO_VENDA_UPDATE_VALUE':
            return {
                ...state,
                carrinhoVenda: action.payload.carrinhoVenda
            }
        default:
            return state;
    }
}

export default vendas;