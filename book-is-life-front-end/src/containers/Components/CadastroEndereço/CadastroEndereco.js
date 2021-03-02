import React from "react";
import * as CES from "../CadastroEndereço/CadastroEnderecoStyles";
import {TextField} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputMask from "react-input-mask";

export default function AdressDataFields(props) {
    if (props.currentStep !== 3) {
        return null
    }
    const logradouroList = props.tipoLogradouroList;
    const tipoResidenciaList = ["Casa", "Apartamento", "Residencial"];
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
                    style={{minWidth: 270}}
                    onChange={props.handleFieldChange}
                    name="descricaoEndereco"
                    type="text"
                    label="Descriçâo do Endereco"
                    required
                    value={props.descricaoEndereco.replace(/\d+/g, "")}
                    error={!/^([a-zA-Z][\w ]{4,})$/.test(props.descricaoEndereco) && props.descricaoEndereco !== "" }
                    helperText={!/^([a-zA-Z][\w ]{4,})$/.test(props.descricaoEndereco) && props.descricaoEndereco !== "" ? "a descrição deve ter pelo menos 4 letras." : ""}
                />

                <InputMask
                    mask="99999-999"
                    value={props.cep}
                    onChange={props.handleFieldChange}
                >
                    <TextField
                        style={{minWidth: 270}}
                        name="cep"
                        type="text"
                        label="Cep"
                        required
                        error={props.cep.replace(/[-_()]/g, "").length < 8 && props.cep !== ""}
                        helperText={props.cep.replace(/[-_()]/g, "").length < 8 && props.cep !== ""? "o numero digitado não está correto" : ""}
                    />
                </InputMask>

                <FormControl style={{minWidth: 270}} >
                    <InputLabel>Tipo de Residencia *</InputLabel>
                    <Select
                        name="tipoDeResidencia"
                        value={props.tipoDeResidencia}
                        onChange={props.handleFieldChange}
                        required
                        error={!props.tipoDeResidencia && props.tipoDeResidencia !==""}
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

                <FormControl style={{minWidth: 270}} error={!props.tipoLogradouro && props.tipoLogradouro !==""}>
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


                <TextField style={{minWidth: 270}}
                    onChange={props.handleFieldChange}
                    name="logradouro"
                    type="text"
                    label="Endereço"
                    required
                    value={props.logradouro.replace(/\d+/g, "")}
                    error={!/^([a-zA-Z][\w ]{3,})$/.test(props.logradouro) && props.logradouro !== "" }
                    helperText={!/^([a-zA-Z][\w ]{4,})$/.test(props.logradouro) && props.logradouro !== "" ? "o logradouro deve ter pelo menos 3 letras." : ""}
                />

                <TextField style={{minWidth: 270}}
                    onChange={props.handleFieldChange}
                    name="numero"
                    type="text"
                    label="Numero"
                    required
                    value={props.numero.replace(/\D/g, "")}
                    error={!/^([0-9]{1,})$/.test(props.numero) && props.numero !== "" }
                    helperText={!/^([0-9]{1,})$/.test(props.numero) && props.numero !== "" ? "digite um numero." : ""}
                />

                <TextField style={{minWidth: 270}}
                    onChange={props.handleFieldChange}
                    name="complemento"
                    type="text"
                    label="Complemento"
                    value={props.complemento}
                />

                <TextField style={{minWidth: 270}}
                    onChange={props.handleFieldChange}
                    name="bairro"
                    type="text"
                    label="Bairro"
                    required
                    value={props.bairro.replace(/\d+/g, "")}
                    error={!/^([a-zA-Z][\w ]{4,})$/.test(props.bairro) && props.bairro !== "" }
                    helperText={!/^([a-zA-Z][\w ]{4,})$/.test(props.bairro) && props.bairro !== "" ? "o nome do bairro deve ter pelo menos 3 letras." : ""}

                />

                <TextField style={{minWidth: 270}}
                    onChange={props.handleFieldChange}
                    name="cidade"
                    type="text"
                    label="Cidade"
                    required
                    value={props.cidade.replace(/\d+/g, "")}
                    error={!/^([a-zA-Z][\w ]{4,})$/.test(props.cidade) && props.cidade !== "" }
                    helperText={!/^([a-zA-Z][\w ]{4,})$/.test(props.cidade) && props.cidade !== "" ? "o nome da cidade deve ter pelo menos 3 letras." : ""}

                />
                <FormControl style={{minWidth: 270}} error={!props.uf && props.uf !==""}>
                    <InputLabel>Estado *</InputLabel>
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