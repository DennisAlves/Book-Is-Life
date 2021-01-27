import React from "react";
import * as CCS from "../CadastroCliente/CadastroClienteStyles";
import {IconButton, InputAdornment} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputMask from "react-input-mask";

export default function ClientDataFields(props) {
    if (props.currentStep !== 1) {
        return null
    }

    let typeTel
    if (props.tipoTelefone === "" || props.tipoTelefone !== "Celular") {
        typeTel = 10
    } else {
        typeTel = 11
    }
    console.log(typeTel);
    const CPF = require('cpf');
    const tipoDeTelefoneList = ["Residencial", "Celular", "Comercial", "Recado"]
    const tipoGeneroList = ["Masculino", "Feminino", "Não declarado"]
    return (
        <CCS.ClientWrapper>
            <CCS.ClientFieldsWrapper>
                <TextField
                    onChange={props.handleFieldChange}
                    name="nomeCliente"
                    type="text"
                    label="Nome"
                    value={props.nomeCliente}
                    required
                    error={props.nomeCliente.length < 5}
                    helperText={props.nomeCliente.length < 5 ? "Digite um nome  com mais de 4 letras" : ""}
                />

                <TextField
                    onChange={props.handleFieldChange}
                    name="email"
                    type="email"
                    label="E-mail"
                    required
                    value={props.email}
                    error={!props.emailError}
                    helperText={!props.emailError ? "Digite um email valido" : ""}

                />

                <TextField
                    onChange={props.handleFieldChange}
                    name="dtNascimento"
                    type="date"
                    label="Data de Nascimento"
                    required
                    value={props.dtNascimento}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                <FormControl error={!props.genero} style={{minWidth: 120}}>
                    <InputLabel>Genero</InputLabel>
                    <Select
                        name="genero"
                        value={props.genero}
                        onChange={props.handleFieldChange}
                        required
                        error={!props.genero}

                    >
                        {tipoGeneroList.map((item, index) => {
                            return (
                                <MenuItem key={index} value={item}>
                                    <div key={index}>{item}</div>
                                </MenuItem>
                            );
                        })}

                    </Select>

                    {!props.genero ? <FormHelperText error>Selecione uma Opção.</FormHelperText> : ""}

                </FormControl>

                <InputMask
                    mask="999.999.999-99"
                    value={props.cpf}
                    onChange={props.handleFieldChange}
                >
                    <TextField
                        name="cpf"
                        type="text"
                        label="CPF"
                        required
                        error={!CPF.isValid(props.cpf)}
                        helperText={!CPF.isValid(props.cpf) ? "Digite um cpf valido" : ""}
                    />
                </InputMask>

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
                    name="senha"
                    label="Senha"
                    required
                    value={props.senha}
                    type={props.mostrarSenha ? "text" : "password"}
                    onChange={props.handleFieldChange}
                    error={!props.passwordIsOk}
                    helperText={!props.passwordIsOk ? "A senha precisa ter no minimo 8 caracteres alfanumericos." : ""}
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
                    onChange={props.handleFieldChange}
                    name="testeSenha"
                    type={props.mostrarSenha ? "text" : "password"}
                    label="Digite novamente a senha"
                    required
                    error={props.senha !== props.testeSenha}
                    helperText={props.senha !== props.testeSenha ? "senhas divergentes" : ""}
                    value={props.testeSenha}
                />
                <FormControl style={{minWidth: 120}}>
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


                <TextField
                    name="telefone"
                    label="Telefone"
                    type="tel"
                    required
                    value={props.telefone}
                    onChange={props.handleFieldChange}
                    error={props.telefone.length !== typeTel}
                    helperText={props.telefone.length !== typeTel ? "o numero digitado não está correto" : ""}
                />
            </CCS.ClientFieldsWrapper>
        </CCS.ClientWrapper>
    )

}