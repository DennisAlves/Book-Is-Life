import React from "react";
import * as CES from "../CadastroEndereço/CadastroEnderecoStyles";
import {TextField} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputMask from "react-input-mask";

export default function AdressDataFields(props) {
    if (props.currentStep !== 2) {
        return null
    }
    const logradouroList = [
        "Aeroporto",
        "Alameda",
        "Área",
        "Avenida",
        "Campo",
        "Chácara",
        "Colônia",
        "Condomínio",
        "Conjunto",
        "Distrito",
        "Esplanada",
        "Estação",
        "Estrada",
        "Favela",
        "Feira",
        "Jardim",
        "Ladeira",
        "Lago",
        "Lagoa",
        "Largo",
        "Loteamento",
        "Morro",
        "Núcleo",
        "Parque",
        "Passarela",
        "Pátio",
        "Praça",
        "Quadra",
        "Recanto",
        "Residencial",
        "Rodovia",
        "Rua",
        "Setor",
        "Sítio",
        "Travessa",
        "Trecho",
        "Trevo",
        "Vale",
        "Vereda",
        "Via",
        "Viaduto",
        "Viela",
        "Vila"
    ];
    const tipoResidenciaList = ["Casa", "Apartamento", "Residencial"]
    const ufList = [
        {uf: "AC", nome: "Acre"},
        {uf: "AL", nome: "Alagoas"},
        {uf: "AP", nome: "Amapá"},
        {uf: "AM", nome: "Amazonas"},
        {uf: "BA", nome: "Bahia"},
        {uf: "CE", nome: "Ceará"},
        {uf: "DF", nome: "Distrito Federal"},
        {uf: "ES", nome: "Espírito Santo"},
        {uf: "GO", nome: "Goiás"},
        {uf: "MA", nome: "Maranhão"},
        {uf: "MT", nome: "Mato Grosso"},
        {uf: "MS", nome: "Mato Grosso do Sul"},
        {uf: "MG", nome: "Minas Gerais"},
        {uf: "PA", nome: "Pará"},
        {uf: "PB", nome: "Paraíba"},
        {uf: "PR", nome: "Paraná"},
        {uf: "PE", nome: "Pernambuco"},
        {uf: "PI", nome: "Piauí"},
        {uf: "RJ", nome: "Rio de Janeiro"},
        {uf: "RN", nome: "Rio Grande do Norte"},
        {uf: "RS", nome: "Rio Grande do Sul"},
        {uf: "RO", nome: "Rondônia"},
        {uf: "RR", nome: "Roraima"},
        {uf: "SC", nome: "Santa Catarina"},
        {uf: "SP", nome: "São Paulo"},
        {uf: "SE", nome: "Sergipe"},
        {uf: "TO", nome: "Tocantins"}
    ];

    return (
        <CES.AdressWrapper>
            <CES.AdressFieldsWrapper>
                <h5>Endereço</h5>

                <TextField
                    onChange={props.handleFieldChange}
                    name="descricaoEndereco"
                    type="text"
                    label="Descriçâo do Endereco"
                    required
                    value={props.descricaoEndereco}
                    error={props.descricaoEndereco.length < 5}
                    helperText={props.descricaoEndereco.length < 5 ? "Digite um nome  com mais de 4 letras" : ""}
                />

                <InputMask
                    mask="99999-999"
                    value={props.cep}
                    onChange={props.handleFieldChange}
                >
                    <TextField
                        name="cep"
                        type="text"
                        label="Cep"
                        required
                    />
                </InputMask>

                <FormControl style={{minWidth: 120}}>
                    <InputLabel>Tipo de Residencia</InputLabel>
                    <Select
                        name="tipoDeResidencia"
                        value={props.tipoDeResidencia}
                        onChange={props.handleFieldChange}
                        required
                    >
                        {tipoResidenciaList.map((item, index) => {
                            return (
                                <MenuItem key={index} value={item}>
                                    <div key={index}>{item}</div>
                                </MenuItem>
                            );
                        })}

                    </Select>
                </FormControl>

                <FormControl style={{minWidth: 120}}>
                    <InputLabel>Logradouro</InputLabel>
                    <Select
                        name="tipoLogradouro"
                        value={props.tipoLogradouro}
                        onChange={props.handleFieldChange}
                        required
                    >
                        {logradouroList.map((item, index) => {
                            return (
                                <MenuItem key={index} value={item}>
                                    <div key={index}>{item}</div>
                                </MenuItem>
                            );
                        })}

                    </Select>
                </FormControl>


                <TextField
                    onChange={props.handleFieldChange}
                    name="logradouro"
                    type="text"
                    label="Endereço"
                    required
                    value={props.logradouro}
                />

                <TextField
                    onChange={props.handleFieldChange}
                    name="numero"
                    type="number"
                    label="Numero"
                    required
                    value={props.numero}
                />

                <TextField
                    onChange={props.handleFieldChange}
                    name="complemento"
                    type="text"
                    label="Complemento"
                    value={props.complemento}
                />

                <TextField
                    onChange={props.handleFieldChange}
                    name="bairro"
                    type="text"
                    label="Bairro"
                    required
                    value={props.bairro}
                />

                <TextField
                    onChange={props.handleFieldChange}
                    name="cidade"
                    type="text"
                    label="Cidade"
                    value={props.cidade}
                    required
                />
                <FormControl style={{minWidth: 120}}>
                    <InputLabel>Estado</InputLabel>
                    <Select
                        name="uf"
                        value={props.uf}
                        onChange={props.handleFieldChange}
                        required
                    >
                        {ufList.map((item, index) => {
                            return (
                                <MenuItem key={index} value={item.uf}>
                                    <div key={index}>{item.nome}</div>
                                </MenuItem>
                            );
                        })}

                    </Select>
                </FormControl>

            </CES.AdressFieldsWrapper>

        </CES.AdressWrapper>
    )
}