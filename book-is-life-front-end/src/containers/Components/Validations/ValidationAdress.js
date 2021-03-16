export default function AdressValidation(endereco) {

    return !!(endereco.descricaoEndereco &&
        endereco.tipoDeResidencia &&
        endereco.cep &&
        endereco.tipoLogradouro &&
        endereco.logradouro &&
        endereco.numero &&
        endereco.bairro &&
        endereco.cidade &&
        endereco.uf);
}



