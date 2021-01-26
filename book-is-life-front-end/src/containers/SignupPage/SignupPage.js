import React, {Component} from "react";
import * as SPS from "./SignupPageStyles";
import {Button, IconButton, InputAdornment, TextField} from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import {push} from "connected-react-router";
import {routes} from '../Router';
import {connect} from "react-redux";
import InputMask from "react-input-mask";
import 'react-phone-input-2/lib/style.css'
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import axios from "axios";

class SignupPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentStep: 1,
            email: "",
            senha: "",
            nomeCliente: "",
            dtNascimento: "",
            cpf: "",
            testeSenha: "",
            tipoTelefone: "",
            telefone: "",
            mostrarSenha: false,
            genero: "",
            descricaoEndereco: "",
            tipoLogradouro: "",
            cep: "",
            logradouro: "",
            bairro: "",
            numero: "",
            cidade: "",
            uf: "",
            complemento: "",
            tipoDeResidencia: "",
            listaDeEndereco: [],
            cvc: "",
            expiry: "",
            foco: "",
            name: "",
            number: "",
            focused: "",
            error: false,
            errorMessage: {},
            emailIsOk:false,
        };
    }


    handleInputFocus = (e) => {
        const target = e.target;
        this.setState({
            focused: target.name,
        });
    };

    handleFieldChange = (event) => {
        const {name, value} = event.target;
        this.setState({
                [name]: value,
            }, (() => {
                if (name === "cep") {
                    this.handleCepFillUp(this.state.cep)
                } else if (name === "email") {
                    this.emailIsValid(this.state.email)
                }
            })
        );
    };

    handleInputChange = (e) => {
        const target = e.target;

        if (target.name === 'number') {
            this.setState({
                [target.name]: target.value.replace(/ /g, ''),
            });
        } else if (target.name === 'expiry') {
            this.setState({
                [target.name]: target.value.replace(/ |\//g, ''),
            });
        } else {
            this.setState({
                [target.name]: target.value,
            });
        }
    };

    handleCallback(type, isValid) {
        console.log(type, isValid);
    }

    handleDateChange = () => {
        this.setState({teste: new Date()})
        console.log(this.state.teste)
    };

    handleCepFillUp = (cepUnformaded) => {
        const cep = cepUnformaded.replace(/[-_]/g, "")

        console.log(cep, cep.length)
        if (cep.length === 8) {
            const request = axios.get(`http://viacep.com.br/ws/${cep}/json/`, {
                headers: {
                    "Content-Type": "application/json",
                }

            })

            request.then((response) => {
                console.log(response.data)
                this.setState({
                    tipoLogradouro: response.data.logradouro.substr(0, response.data.logradouro.indexOf(" ")),
                    logradouro: response.data.logradouro.substr(response.data.logradouro.indexOf(" ") + 1),
                    bairro: response.data.bairro,
                    cidade: response.data.localidade,
                    uf: response.data.uf,
                })
            }).catch((err) => {
                console.log(err)
            })
        }
    }
    handleMouseDownPassword = () => {
        if (!this.state.mostrarSenha) {
            this.setState({mostrarSenha: true});
        } else {
            this.setState({mostrarSenha: false});
        }
    };

    handleAdressSave = (tipoDeEndereco) => {
        const endereco = {
            logradouro: this.state.logradouro,
            cep: this.state.cep,
            endereco: this.state.endereco,
            bairro: this.state.bairro,
            numero: this.state.numero,
            complemento: this.state.complemento,
            tipoDeEndereco: tipoDeEndereco,
        }
        this.setState({
            adressList: [...this.state.listaDeEndereco, endereco],
        })
    }
    _next = () => {
        let currentStep = this.state.currentStep

        currentStep = currentStep >= 2 ? 3 : currentStep + 1
        this.setState({
            currentStep: currentStep
        })


    }

    _prev = () => {
        let currentStep = this.state.currentStep
        currentStep = currentStep <= 1 ? 1 : currentStep - 1
        this.setState({
            currentStep: currentStep
        })
    }


    previousButton() {
        let currentStep = this.state.currentStep;
        if (currentStep !== 1) {
            return (
                <Button
                    className="btn btn-secondary"
                    type="button" onClick={this._prev}>
                    Previous
                </Button>
            )
        }
        return null;
    }

    nextButton() {
        let currentStep = this.state.currentStep;
        if (currentStep < 3) {
            return (
                <Button
                    className="btn btn-primary float-right"
                    type="button" onClick={this._next}>
                    Next
                </Button>
            )
        }

        return null;
    }

    emailIsValid = () => {
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

        if (this.state.email !== undefined) {
            if (regex.test(this.state.email)) {

                this.setState({ emailIsOk: true})
            }
            else if (!regex.test(this.state.email)) {

                this.setState({ emailIsOk: false})
            }
        }
        return this.state.emailIsOk;
    }

    render() {
        const {
            email,
            senha,
            nomeCliente,
            cpf,
            testeSenha,
            telefone,
            mostrarSenha,
            genero,
            name,
            number,
            expiry,
            cvc,
            focused,
            descricaoEndereco,
            tipoLogradouro,
            tipoDeResidencia,
            cep,
            logradouro,
            bairro,
            numero,
            cidade,
            uf,
            complemento,
            tipoTelefone,
            dtNascimento,
            errorMessage,
            emailIsOk
        } = this.state;


        return (
            <>
                <SPS.MainDiv>
                    <Paper elevation={3}>
                        <SPS.CustomHeader>
                            <SPS.HomeLogo onClick={this.props.goToHomePage}><h3>aqui vai ficar o header</h3>
                            </SPS.HomeLogo>
                        </SPS.CustomHeader>
                    </Paper>

                    <SPS.SignupWrapper>
                        <h4>Dados para cadastro</h4>

                        <ClientDataFields
                            currentStep={this.state.currentStep}
                            handleFieldChange={this.handleFieldChange}
                            nomeCliente={nomeCliente}
                            email={email}
                            emailError={emailIsOk}
                            dtNascimento={dtNascimento}
                            cpf={cpf}
                            senha={senha}
                            testeSenha={testeSenha}
                            mostrarSenha={mostrarSenha}
                            telefone={telefone}
                            tipoTelefone={tipoTelefone}
                            genero={genero}
                            errorMessage={errorMessage}
                            handleMouseDownPassword={this.handleMouseDownPassword}
                        />
                        <AdressDataFields
                            currentStep={this.state.currentStep}
                            handleFieldChange={this.handleFieldChange}
                            descricaoEndereco={descricaoEndereco}
                            tipoLogradouro={tipoLogradouro}
                            tipoDeResidencia={tipoDeResidencia}
                            cep={cep}
                            logradouro={logradouro}
                            bairro={bairro}
                            numero={numero}
                            cidade={cidade}
                            uf={uf}
                            complemento={complemento}
                        />
                        <CrediCardDataFields
                            currentStep={this.state.currentStep}
                            handleInputChange={this.handleInputChange}
                            handleInputFocus={this.handleInputFocus}
                            handleCallback={this.handleCallback}
                            name={name}
                            number={number}
                            expiry={expiry}
                            cvc={cvc}
                            focused={focused}
                        />

                        {this.previousButton()}
                        {this.nextButton()}

                    </SPS.SignupWrapper>


                </SPS.MainDiv>
                <Paper elevation={3}>
                    <SPS.Footer>
                        <h3>aqui vai ficar o footer</h3>
                    </SPS.Footer>
                </Paper>
            </>
        );
    };
}

function ClientDataFields(props) {
    if (props.currentStep !== 1) {
        return null
    }

    const tipoDeTelefoneList = ["Residencial", "Celular", "Comercial", "Recado"]
    const tipoGeneroList = ["Masculino", "Feminino", "Não declarado"]
    return (
        <SPS.ClientWrapper>
            <SPS.ClientFieldsWrapper>
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
                    helperText={!props.emailError? "Digite um email valido" : ""}

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

                <FormControl style={{minWidth: 120}}>
                    <InputLabel>Genero</InputLabel>
                    <Select
                        name="genero"
                        value={props.genero}
                        onChange={props.handleFieldChange}
                        required
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
                        ),
                        pattern: "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$",
                        title: "A senha precisa ter entre 6 e 16 caracteres alfanumericos.",
                        autoComplete: 'new-password',
                    }}
                    name="senha"
                    label="Senha"
                    required
                    value={props.senha}
                    type={props.mostrarSenha ? "text" : "password"}
                    onChange={props.handleFieldChange}

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
                        ),
                        pattern: "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$",
                        title: "A senha precisa ter entre 6 e 16 caracteres alfanumericos.",
                        autoComplete: 'new-password',
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
                <InputMask
                    mask="(99)99999-9999"
                    value={props.telefone}
                    onChange={props.handleFieldChange}
                >
                    <TextField
                        name="telefone"
                        required
                        label="Telefone"
                        type="tel"
                    />
                </InputMask>

            </SPS.ClientFieldsWrapper>
        </SPS.ClientWrapper>
    )

}

function AdressDataFields(props) {
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
        <SPS.AdressWrapper>
            <SPS.AdressFieldsWrapper>
                <h5>Endereço</h5>

                <TextField
                    onChange={props.handleFieldChange}
                    name="descricaoEndereco"
                    type="text"
                    label="Descriçâo do Endereco"
                    required
                    value={props.descricaoEndereco}
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
                    name="bairro"
                    type="text"
                    label="Bairro"
                    required
                    value={props.bairro}
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
            </SPS.AdressFieldsWrapper>

        </SPS.AdressWrapper>
    )
}

function CrediCardDataFields(props) {
    if (props.currentStep !== 3) {
        return null
    }
    return (
        <SPS.CreditCardWrapper>
            <Cards
                locale={{valid: "Valido até"}}
                placeholders={{name: "Nome"}}
                cvc={props.cvc}
                expiry={props.expiry}
                focused={props.focused}
                name={props.name}
                number={props.number}
                callback={props.handleCallback}
            />

            <SPS.CreditCardFieldsWrapper>
                <input
                    type="tel"
                    name="number"
                    placeholder="Numero do Cartão"
                    onKeyUp={props.handleInputChange}
                    onFocus={props.handleInputFocus}
                    required
                />

                <input
                    type="text"
                    name="name"
                    placeholder="Nome"
                    onKeyUp={props.handleInputChange}
                    onFocus={props.handleInputFocus}
                    required
                />

                <input
                    type="tel"
                    name="expiry"
                    placeholder="MM/AA"
                    onKeyUp={props.handleInputChange}
                    onFocus={props.handleInputFocus}
                    required
                />

                <input
                    type="tel"
                    name="cvc"
                    placeholder="CVC"
                    onKeyUp={props.handleInputChange}
                    onFocus={props.handleInputFocus}
                    required
                />
            </SPS.CreditCardFieldsWrapper>
        </SPS.CreditCardWrapper>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        goToHomePage: () => dispatch(push(routes.HomePage)),
        goToSignupPage: () => dispatch(push(routes.SignupPage)),
    }
}

export default connect(null, mapDispatchToProps)(SignupPage)