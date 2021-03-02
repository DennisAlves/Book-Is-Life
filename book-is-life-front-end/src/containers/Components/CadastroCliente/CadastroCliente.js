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
    //const CPF = require('cpf');
    const tipoDeTelefoneList = ["Residencial", "Celular", "Comercial", "Recado"]
    const tipoGeneroList = ["Masculino", "Feminino", "Não declarado"]

    return (
        <CCS.ClientWrapper>
            <CCS.ClientFieldsWrapper>

                <TextField style={{minWidth: 270}}
                           onChange={props.handleFieldChange}
                           name="nomeCliente"
                           type="text"
                           label="Nome"
                           required
                           value={props.nomeCliente.replace(/\d+/g, "")}
                           error={!/^([a-zA-Z][\w ]{3,})$/.test(props.nomeCliente) && props.nomeCliente !== ""}
                           helperText={!/^([a-zA-Z][\w ]{3,})$/.test(props.nomeCliente) && props.nomeCliente !== "" ? "o nome deve ter pelo menos 4 letras." : ""}
                />

                <TextField style={{minWidth: 270}}
                           onChange={props.handleFieldChange}
                           name="email"
                           type="email"
                           label="E-mail"
                           required
                           isemail = "true"
                           value={props.email}
                           error={!props.emailError && props.email !== ""}
                           helperText={!props.emailError && props.email !== "" ? "email invalido." : ""}
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
                    style={{minWidth: 270}}
                    id="senha"
                    name="senha"
                    label="Senha"
                    required
                    value={props.senha}
                    type={props.mostrarSenha ? "text" : "password"}
                    onChange={props.handleFieldChange}
                    error={!props.passwordIsOk && props.senha !== props.testeSenha && props.senha !== ""}
                    helperText={!props.passwordIsOk && props.senha !== "" && props.senha !== props.testeSenha ?
                        <div>
                            <div>A senha deve ter no minimo 8 caracteres,</div>
                            <div>ter letras maiúsculas e minúsculas além de </div>
                            <div>conter caracteres especiais </div>
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
                    style={{minWidth: 270}}
                    onChange={props.handleFieldChange}
                    name="testeSenha"
                    type={props.mostrarSenha ? "text" : "password"}
                    label="Digite novamente a senha"
                    required
                    value={props.testeSenha}
                    error={props.senha !== props.testeSenha && props.senha !== ""}
                    helperText={props.senha === props.testeSenha ? "" : "senhas divergentes"}

                />

                <TextField style={{minWidth: 270}}
                           onChange={props.handleFieldChange}
                           name="dtNascimento"
                           type="date"
                           label="Data de Nascimento"
                           value={props.dtNascimento}
                           required
                           error={props.dtNascimento !== "" && !moment().isSameOrAfter(props.dtNascimento)}
                           helperText={props.dtNascimento !== "" && !moment().isSameOrAfter(props.dtNascimento) ? "É nescessario uma data de nascimento valida." : ""}
                           InputLabelProps={{
                               shrink: true,
                           }}
                           InputProps={{inputProps: {max: moment().format('YYYY-MM-DD')}}}
                />

                <FormControl style={{minWidth: 270}}>
                    <InputLabel>Genero</InputLabel>
                    <Select
                        name="genero"
                        label="Genero"
                        value={props.genero}
                        onChange={props.handleFieldChange}
                        error={!props.genero && props.genero !== ""}
                    >
                        {tipoGeneroList.map((item, index) => {
                            return (
                                <MenuItem key={index} value={item}>
                                    <div key={index}>{item}</div>
                                </MenuItem>
                            );
                        })}

                    </Select>

                </FormControl>

                <FormControl style={{minWidth: 270}}>
                    <InputLabel>Tipo de telefone</InputLabel>
                    <Select
                        name="tipoTelefone"
                        value={props.tipoTelefone}
                        onChange={props.handleFieldChange}
                        required
                        error={!props.tipoTelefone && props.tipoTelefone !== ""}
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
                        style={{minWidth: 270}}
                        name="telefone"
                        label="Telefone"
                        type="tel"
                        required
                        error={props.telefone.replace(/[-_()]/g, "").length !== typeTel && props.telefone !== ""}
                        helperText={props.telefone.replace(/[-_()]/g, "").length !== typeTel && props.telefone !== "" ? "o numero digitado não está correto" : ""}
                    />
                </InputMask>
            </CCS.ClientFieldsWrapper>
        </CCS.ClientWrapper>
    )

}
/*
<InputMask
                    mask="999.999.999-99"
                    value={props.cpf}
                    onChange={props.handleFieldChange}
                >
                    <TextField style={{minWidth: 270}}
                               name="cpf"
                               type="text"
                               label="CPF"
                               error={!CPF.isValid(props.cpf) && props.cpf !== "___.___.___-__" && props.cpf !== ""}
                               helperText={!CPF.isValid(props.cpf) && props.cpf !== "___.___.___-__" && props.cpf !== "" ? "CPF invalido" : ""}

                    />

                </InputMask>
*/