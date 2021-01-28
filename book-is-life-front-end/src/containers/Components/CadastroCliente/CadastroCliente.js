import React from "react";
import * as CCS from "../CadastroCliente/CadastroClienteStyles";
import {IconButton, InputAdornment, TextField} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputMask from "react-input-mask";
import {SelectValidator, TextValidator, ValidatorForm} from 'react-material-ui-form-validator';
import moment from 'moment'
import 'moment/locale/fr';


export default function ClientDataFields(props) {
    if (props.currentStep !== 1) {
        return null
    }
    moment.locale('pt-br');

    let typeTel, maskFormat
    if (props.tipoTelefone === "" || props.tipoTelefone !== "Celular") {
        typeTel = 10
        maskFormat = "(99)9999-9999"
    } else {
        typeTel = 11
        maskFormat = "(99)99999-9999"
    }
    const CPF = require('cpf');
    const tipoDeTelefoneList = ["Residencial", "Celular", "Comercial", "Recado"]
    const tipoGeneroList = ["Masculino", "Feminino", "Não declarado"]

    return (
        <CCS.ClientWrapper>
            <CCS.ClientFieldsWrapper


            >
                <ValidatorForm>
                    <TextValidator style={{minWidth: 270, margin: 10}}
                                   onChange={props.handleFieldChange}
                                   name="nomeCliente"
                                   type="text"
                                   label="Nome"
                                   value={props.nomeCliente}
                                   validators={["required", "matchRegexp:^[a-zA-Z]{4,}$"]}
                                   errorMessages={["Esse campo é nescessario", "Digite um nome  com mais de 4 letras"]}
                    />

                    <TextValidator style={{minWidth: 270, margin: 10}}
                                   onChange={props.handleFieldChange}
                                   name="email"
                                   type="email"
                                   label="E-mail"
                                   required
                                   value={props.email}
                                   validators={['required', 'isEmail']}
                                   errorMessages={["Esse campo é nescessario", "Email invalido"]}
                    />

                    <TextValidator style={{minWidth: 270, margin: 10}}
                                   onChange={props.handleFieldChange}
                                   name="dtNascimento"
                                   type="date"
                                   label="Data de Nascimento"
                                   value={props.dtNascimento}
                                   validators={['required', props.dtNascimento < 10]}
                                   errorMessages={"É nescessario uma data de nascimento."}
                                   InputLabelProps={{
                                       shrink: true,
                                   }}
                                   InputProps={{inputProps: {max: moment().format('YYYY-MM-DD')}}}
                    />

                    <SelectValidator style={{minWidth: 270, margin: 10}}
                                     name="genero"
                                     label="Genero"
                                     value={props.genero}
                                     onChange={props.handleFieldChange}
                                     validators={['required', props.genero !== ""]}
                                     errorMessages={"Selecione uma Opção"}

                    >
                        {tipoGeneroList.map((item, index) => {
                            return (
                                <MenuItem key={index} value={item}>
                                    <div key={index}>{item}</div>
                                </MenuItem>
                            );
                        })}

                    </SelectValidator>

                    <InputMask
                        mask="999.999.999-99"
                        value={props.cpf}
                        onChange={props.handleFieldChange}
                    >
                        <TextField style={{minWidth: 270, margin: 10}}
                                       name="cpf"
                                       type="text"
                                       label="CPF"
                                   error={!CPF.isValid(props.cpf) && props.cpf !== "___.___.___-__" && props.cpf !== ""}
                                   helperText={!CPF.isValid(props.cpf) && props.cpf !== "___.___.___-__" && props.cpf !== "" ? "CPF invalido" : ""}

                        />

                    </InputMask>
                    {console.log(CPF.isValid(props.cpf))}
                </ValidatorForm>




                <TextField

                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onMouseDown={props.handleMouseDownPassword}
                                    onMouseUp={props.handleMouseDownPassword}
                                >
                                    {props.mostrarSenha ? <Visibility/> : <VisibilityOff/>}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                    style={{minWidth: 270, margin: 10}}
                    id="senha"
                    name="senha"
                    label="Senha"
                    required
                    value={props.senha}
                    type={props.mostrarSenha ? "text" : "password"}
                    onChange={props.handleFieldChange}
                    error={!props.passwordIsOk && props.senha !== props.testeSenha && props.senha !== ""}
                    helperText={!props.passwordIsOk && props.senha !== ""&& props.senha !== props.testeSenha?
                        <div>
                            <p>A senha deve ter no minimo 8 caracteres,</p>
                            <p>ter letras maiúsculas e minúsculas além de </p>
                            <p>conter caracteres especiais </p>
                        </div>
                        :
                        ""
                    }
                    />

                <TextField
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onMouseDown={props.handleMouseDownPassword}
                                    onMouseUp={props.handleMouseDownPassword}
                                >
                                    {props.mostrarSenha ? <Visibility/> : <VisibilityOff/>}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                    style={{minWidth: 270, margin: 10}}
                    onChange={props.handleFieldChange}
                    name="testeSenha"
                    type={props.mostrarSenha ? "text" : "password"}
                    label="Digite novamente a senha"
                    required
                    value={props.testeSenha}
                    error={props.senha !== props.testeSenha && props.senha !== ""}
                    helperText={props.senha === props.testeSenha ? "" : "senhas divergentes"}

                />
                <FormControl error={!props.tipoTelefone && props.tipoTelefone !==""} style={{minWidth: 270, margin: 10}}>
                    <InputLabel>Tipo de telefone</InputLabel>
                    <Select
                        name="tipoTelefone"
                        value={props.tipoTelefone}
                        onChange={props.handleFieldChange}
                        required
                    >
                        {tipoDeTelefoneList.map((item, index) => {
                            return (
                                <MenuItem key={index} value={item}>
                                    <div key={index}>{item}</div>
                                </MenuItem>
                            );
                        })}

                    </Select>
                </FormControl>

                <InputMask
                    mask={maskFormat}
                    value={props.telefone}
                    onChange={props.handleFieldChange}
                >
                    <TextField
                        style={{minWidth: 270, margin: 10}}
                        name="telefone"
                        label="Telefone"
                        type="tel"
                        required
                        error={props.telefone.replace(/[-_()]/g, "").length !== typeTel && props.telefone !== ""}
                        helperText={props.telefone.replace(/[-_()]/g, "").length !== typeTel && props.telefone !== ""? "o numero digitado não está correto" : ""}
                    />
                </InputMask>
            </CCS.ClientFieldsWrapper>
        </CCS.ClientWrapper>
    )

}