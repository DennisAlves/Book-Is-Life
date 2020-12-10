import React, {Component} from "react";
import * as SPS from "./SignupPageStyles";
import {IconButton, InputAdornment, TextField} from "@material-ui/core";
import {connect} from "react-redux";
import {push} from "connected-react-router";
import {routes} from '../Router';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";
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
import Payment from 'payment';
import axios from "axios";

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            senha: "",
            nomeCliente: "",
            testeSenha: "",
            telefone: "",
            mostrarSenha: false,
            entregaLogradouro: "",
            entregaCep: "",
            entregaEndereco: "",
            entregaBairro: "",
            entregaNumero: "",
            entregaComplemento: "",
            cobrancaLogradouro: "",
            cobrancaCep: "",
            cobrancaEndereco: "",
            cobrancaBairro: "",
            cobrancaNumero: "",
            cobrancaComplemento: "",
            tipoDeEndereco: "",
            listaDeEndereco: [],
            cvc: "",
            exp: "",
            foco: "",
            name: "",
            number: "",
            focused: "",

        };
    }

    componentDidMount() {
        Payment.formatCardNumber(document.querySelector('[name="number"]'));
        Payment.formatCardExpiry(document.querySelector('[name="expiry"]'));
        Payment.formatCardCVC(document.querySelector('[name="cvc"]'));
    }

    handleInputFocus = (e) => {
        const target = e.target;

        this.setState({
            focused: target.name,
        });
    };

    handleFieldChange = (event) => {
        const {name,value} = event.target;
        this.setState({
            [name]: value,
        }, (() => {
            if (name === "entregaCep") {
                this.handleCepFillUp(this.state.entregaCep)
            }
            else if (name === "cobrancaCep") {
                this.handleCepFillUp(this.state.cobrancaCep)
            }
                }));
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
        const cep = cepUnformaded.replace(/[-_]/g,"")

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
                       entregaLogradouro: response.data.logradouro.substr(0, response.data.logradouro.indexOf(" ")),
                       entregaEndereco: response.data.logradouro.substr(response.data.logradouro.indexOf(" ") + 1),
                       entregaBairro: response.data.bairro,
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
    handleDeliveryAdressSave = (tipoDeEndereco) => {
        const endereco = {
            logradouro: this.state.entregaLogradouro,
            cep: this.state.entregaCep,
            endereco: this.state.entregaEndereco,
            bairro: this.state.entregaBairro,
            numero: this.state.entregaNumero,
            complemento: this.state.entregaComplemento,
            tipoDeEndereco: tipoDeEndereco,
        }
        this.setState({
            adressList: [...this.state.listaDeEndereco, endereco],
        })
    }
    handlePaymentAdressSave = (tipoDeEndereco) => {
        const endereco = {
            logradouro: this.state.cobrancaLogradouro,
            cep: this.state.cobrancaCep,
            endereco: this.state.cobrancaEndereco,
            bairro: this.state.cobrancaBairro,
            numero: this.state.cobrancaNumero,
            complemento: this.state.cobrancaComplemento,
            tipoDeEndereco: tipoDeEndereco,
        }
        this.setState({
            adressList: [...this.state.listaDeEndereco, endereco],
        })

    }

    render() {
        const {
            email,
            senha,
            nomeCliente,
            testeSenha,
            telefone,
            mostrarSenha,
            name,
            number,
            expiry,
            cvc,
            focused
        } = this.state;
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
                        <SPS.ClientWrapper>
                            <SPS.ClientFieldsWrapper>
                                <TextField
                                    inputProps={{
                                        pattern: "[a-zA-Z.]{6,16}",
                                        title: "O Nome precisa ter entre 6 e 16 caracteres alfanumericos."
                                    }}
                                    onChange={this.handleFieldChange}
                                    name="nomeCliente"
                                    type="text"
                                    label="Nome"
                                    value={nomeCliente}
                                    required
                                />

                                <TextField
                                    onChange={this.handleFieldChange}
                                    name="email"
                                    type="email"
                                    label="E-mail"
                                    required
                                    value={email}
                                />

                                <TextField

                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onMouseDown={this.handleMouseDownPassword}
                                                    onMouseUp={this.handleMouseDownPassword}
                                                >
                                                    {mostrarSenha ? <Visibility/> : <VisibilityOff/>}
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
                                    value={senha}
                                    type={mostrarSenha ? "text" : "password"}
                                    onChange={this.handleFieldChange}

                                />

                                <TextField
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onMouseDown={this.handleMouseDownPassword}
                                                    onMouseUp={this.handleMouseDownPassword}
                                                >
                                                    {mostrarSenha ? <Visibility/> : <VisibilityOff/>}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                        pattern: "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$",
                                        title: "A senha precisa ter entre 6 e 16 caracteres alfanumericos.",
                                        autoComplete: 'new-password',
                                    }}
                                    onChange={this.handleFieldChange}
                                    name="testeSenha"
                                    type={mostrarSenha ? "text" : "password"}
                                    label="Digite novamente a senha"
                                    required
                                    error={this.state.senha !== this.state.testeSenha}
                                    helperText={this.state.senha !== this.state.testeSenha ? "senhas divergentes" : ""}
                                    value={testeSenha}
                                />
                                <InputMask
                                    mask="9999999-9999"
                                    value={telefone}
                                    onChange={this.handleFieldChange}
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
                        <SPS.AdressWrapper>
                            <SPS.AdressFieldsWrapper onSubmit={() => this.handleDeliveryAdressSave("entrega")}>
                                <h5>Endereço de Entrega</h5>
                                <FormControl style={{minWidth: 120}}>
                                    <InputLabel>Logradouro</InputLabel>
                                    <Select
                                        name="entregaLogradouro"
                                        value={this.state.entregaLogradouro}
                                        onChange={this.handleFieldChange}
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

                                <InputMask
                                    mask="99999-999"
                                    value={this.state.entregaCep}
                                    onChange={this.handleFieldChange}
                                >
                                    <TextField
                                        name="entregaCep"
                                        type="text"
                                        label="Cep"
                                        required
                                    />
                                </InputMask>

                                <TextField
                                    onChange={this.handleFieldChange}
                                    name="entregaEndereco"
                                    type="text"
                                    label="Endereço"
                                    required
                                    value={this.state.entregaEndereco}
                                />

                                <TextField
                                    onChange={this.handleFieldChange}
                                    name="entregaBairro"
                                    type="text"
                                    label="Bairro"
                                    required
                                    value={this.state.entregaBairro}
                                />

                                <TextField
                                    onChange={this.handleFieldChange}
                                    name="deliveryNumero"
                                    type="number"
                                    label="Numero"
                                    required
                                    value={this.state.deliveryNumero}
                                />

                                <TextField
                                    onChange={this.handleFieldChange}
                                    name="entregaComplemento"
                                    type="text"
                                    label="Complemento"
                                    value={this.state.entregaComplemento}
                                />
                            </SPS.AdressFieldsWrapper>
                            <SPS.AdressFieldsWrapper onSubmit={() => this.handlePaymentAdressSave("cobranca")}>
                                <h5>Endereço de Cobrança</h5>
                                <FormControl style={{minWidth: 120}}>
                                    <InputLabel>Logradouro</InputLabel>
                                    <Select
                                        name="cobrancaLogradouro"
                                        value={this.state.cobrancaLogradouro}
                                        onChange={this.handleFieldChange}
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
                                <InputMask
                                    mask="99999-999"
                                    value={this.state.cobrancaCep}
                                    onChange={this.handleFieldChange}
                                >
                                    <TextField
                                        name="cobrancaCep"
                                        type="text"
                                        label="Cep"
                                        required
                                    />
                                </InputMask>


                                <TextField
                                    onChange={this.handleFieldChange}
                                    name="cobrancaEndereco"
                                    type="text"
                                    label="Endereço"
                                    required
                                    value={this.state.cobrancaEndereco}
                                />

                                <TextField
                                    onChange={this.handleFieldChange}
                                    name="cobrancaBairro"
                                    type="text"
                                    label="Bairro"
                                    required
                                    value={this.state.cobrancaBairro}
                                />

                                <TextField
                                    onChange={this.handleFieldChange}
                                    name="cobrancaNumero"
                                    type="number"
                                    label="Numero"
                                    autoComplete="nope"
                                    required
                                    value={this.state.cobrancaNumero}
                                />

                                <TextField
                                    onChange={this.handleFieldChange}
                                    name="cobrancaComplemento"
                                    type="text"
                                    label="Complemento"
                                    value={this.state.cobrancaComplemento}
                                />
                            </SPS.AdressFieldsWrapper>
                        </SPS.AdressWrapper>
                        <SPS.CreditCardWrapper>
                            <Cards
                                locale={{valid: "Valido até"}}
                                placeholders={{name: "Nome"}}
                                cvc={cvc}
                                expiry={expiry}
                                focused={focused}
                                name={name}
                                number={number}
                                callback={this.handleCallback}
                            />

                            <SPS.CreditCardFieldsWrapper>
                                <input
                                    type="tel"
                                    name="number"
                                    placeholder="Numero do Cartão"
                                    onKeyUp={this.handleInputChange}
                                    onFocus={this.handleInputFocus}
                                    required
                                />

                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Nome"
                                    onKeyUp={this.handleInputChange}
                                    onFocus={this.handleInputFocus}
                                    required
                                />

                                <input
                                    type="tel"
                                    name="expiry"
                                    placeholder="MM/AA"
                                    onKeyUp={this.handleInputChange}
                                    onFocus={this.handleInputFocus}
                                    required
                                />

                                <input
                                    type="tel"
                                    name="cvc"
                                    placeholder="CVC"
                                    onKeyUp={this.handleInputChange}
                                    onFocus={this.handleInputFocus}
                                    required
                                />
                            </SPS.CreditCardFieldsWrapper>
                        </SPS.CreditCardWrapper>

                        <Button variant="contained" type="submit">Salvar</Button>

                    </SPS.SignupWrapper>

                </SPS.MainDiv>
                <Paper elevation={3}>
                    <SPS.Footer>
                        <h3>aqui vai ficar o footer</h3>
                    </SPS.Footer>
                </Paper>
            </>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        goToHomePage: () => dispatch(push(routes.HomePage)),
        goToSignupPage: () => dispatch(push(routes.SignupPage)),
    }
}

export default connect(null, mapDispatchToProps)(LoginPage)
