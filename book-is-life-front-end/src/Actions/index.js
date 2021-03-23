import axios from 'axios'
import {push} from "connected-react-router";
import {routes} from "../containers/Router/index";


export const setCliente = (clientes) => ({
    type: 'CLIENTE_UPDATE_VALUE',
    payload: {
        clientes
    }
})
export const setEstoque = (estoque) =>({
    type: 'ESTOQUE_UPDATE_VALUE',
    payload: {
        estoque
    }
})
export const setCarrinho = (carrinho) =>({
    type: 'CARRINHO_UPDATE_VALUE',
    payload: {
        carrinho
    }
})
export const setCarrinhoVenda = (carrinhoVenda) =>({
    type: 'CARRINHO_VENDA_UPDATE_VALUE',
    payload: {
        carrinhoVenda
    }
})
export const setProductId = (productId) => ({
    type: 'PRODUCT_ID_UPDATE_VALUE',
    payload: {
        productId
    }
})
export const setClienteDetails = (clienteDetails) => ({
    type: 'CLIENTE_DETAILS_UPDATE_VALUE',
    payload: {
        clienteDetails
    }
})
export const setClienteId = (clienteId) => ({
    type: 'CLIENTE_ID_UPDATE_VALUE',
    payload: {
        clienteId
    }
})
export const setTipoDocumento = (tipoDocumento) => ({
    type: 'TIPO_DOCUMENTO_UPDATE_VALUE',
    payload: {
        tipoDocumento
    }
})
export const setTipoLogradouro = (tipoLogradouro) => ({
    type: 'TIPO_LOGRADOURO_UPDATE_VALUE',
    payload: {
        tipoLogradouro
    }
})
export const setEndereco = (enderecos) => ({
    type: 'ENDERECO_UPDATE_VALUE',
    payload: {
        enderecos
    }
})


export const getCliente = () => async (dispatch) => {

    try {
        const response = await axios.post(`http://localhost:3001/cliente/consultar-cliente`)
        dispatch(setCliente(response.data.consulta))
    } catch (error) {
        console.log(error)
        alert('Erro ao tentar adquirir lista de cllientes')

    }
}

export const getClienteDetails = (clienteId) => async (dispatch) => {

    try {
        const response = await axios.post(`http://localhost:3001/cliente/consultar-cliente`, clienteId)
        dispatch(setClienteDetails(response.data.consulta[0]))
    } catch (error) {
        console.log(error)
        alert('Erro ao tentar adquirir cliente')

    }
}


export const setSelectedClienteIDAndPush = (clienteID) => async (dispatch) => {
    dispatch(setClienteId(clienteID))
    dispatch(push(routes.UserPage))
}
export const setSelectedProductIDAndPush = (productID) => async (dispatch) => {
    dispatch(setProductId(productID))
    dispatch(push(routes.ProductPage))
}

export const getTipoDocumento = () => async (dispatch) => {

    try {
        const response = await axios.get(`http://localhost:3001/tipo-documento/consultar-tipo-documento`)
        dispatch(setTipoDocumento(response.data.consulta))

    } catch (error) {
        console.log(error)
        alert('Erro ao tentar adquirir lista de tipo de documentos')

    }
}

export const getTipoLogradouro = () => async (dispatch) => {

    try {
        const response = await axios.get(`http://localhost:3001/tipo-logradouro/consultar-tipo-logradouro`)
        dispatch(setTipoLogradouro(response.data.consulta))
    } catch (error) {
        console.log(error)
        alert('Erro ao tentar adquirir lista de tipo de logradouro')

    }
}

export const createCliente = (clienteData) => async (dispatch) => {

    try{
        await axios.post(`http://localhost:3001/cliente/add-cliente`, clienteData)

        alert('Cliente criado com sucesso!')
        dispatch(push(routes.HomePage))
    }catch (e) {
        console.log(e)
        alert('Erro ao tentar criar cliente')
    }
}
