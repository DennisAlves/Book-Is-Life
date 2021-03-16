const initialState = {
    clienteId: "",
    clientes: [],
    clienteDetails: [],
    tipoDocumento: [],
    tipoLogradouro: [],
    enderecos: [],
};

const cliente = (state = initialState, action) => {

    switch (action.type) {
        case 'CLIENTE_UPDATE_VALUE':
            return {
                ...state,
                clientes: action.payload.clientes
            }
        case 'CLIENTE_DETAILS_UPDATE_VALUE':
            return {
                ...state,
                clienteDetails: action.payload.clienteDetails
            }
        case 'CLIENTE_ID_UPDATE_VALUE':
            return {
                ...state,
                clienteId: action.payload.clienteId
            }
        case 'TIPO_DOCUMENTO_UPDATE_VALUE':
            return {
                ...state,
                tipoDocumento: action.payload.tipoDocumento
            }
        case 'TIPO_LOGRADOURO_UPDATE_VALUE':
            return {
                ...state,
                tipoLogradouro: action.payload.tipoLogradouro
            }
        case 'ENDERECO_UPDATE_VALUE':
            return {
                ...state,
                tipoLogradouro: action.payload.tipoLogradouro
            }
        default:
            return state;
    }
}

export default cliente;