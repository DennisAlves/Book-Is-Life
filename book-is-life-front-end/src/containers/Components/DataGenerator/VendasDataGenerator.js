import moment from "moment";
import {v4 as uuidv4} from 'uuid';
moment.locale('pt-br');
export default  function VendasDataGenerator(qtde,clientList,estoqueList) {

    const statusVendas = [
        "APROVADA",
        "REPROVADA",
        "EM TRANSPORTE",
        "ENTREGUE",
        "EM TROCA",
        "EM TROCA ",
        "TROCADO",
    ]
    function randomiza(numero) {
        let ranNum = Math.round(Math.random() * numero);
        return ranNum;
    }
    function randomizaMinMax(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }
    function randomFullDate() {
        // noinspection JSValidateTypes
        return moment(new Date(+(new Date()) - Math.floor(Math.random() * 10000000000))).format('MM-DD-YYYY, hh:mm:ss')
    }
    const qtdeVendas = randomizaMinMax(10,100)
    const vendasList = []

    for (let i = 0; i < qtdeVendas;i++){
        const clienteId = clientList[randomiza(clientList.length - 1)].id
        let venda = {
            id: uuidv4(),
            data: randomFullDate(),
            cliente:clienteId,
            enderecoDeEntrega: {},
            itens:{},
            pagamento:{},
            status:statusVendas[randomiza(statusVendas.length - 1)],
        }
    }
}