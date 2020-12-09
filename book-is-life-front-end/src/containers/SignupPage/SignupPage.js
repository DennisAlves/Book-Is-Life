import React, {Component} from "react";
import * as SPS from "./SignupPageStyles";
import {IconButton, InputAdornment, TextField} from "@material-ui/core";
import {connect} from "react-redux";
import {push} from "connected-react-router";
import {routes} from '../Router';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';


class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            signupUsername: "",
            passwordCheck: "",
            phone: "",
            showPassword: false,
            deliveryLogradouro: "",
            deliveryCep: "",
            deliveryEndereco: "",
            deliveryBairro: "",
            deliveryNumero: "",
            deliveryComplemento: "",
            paymentLogradouro: "",
            paymentCep: "",
            paymentEndereco: "",
            paymentBairro: "",
            paymentNumero: "",
            paymentComplemento: "",
            adressType: "",
            adressList: [],
            cvc: "",
            expiry: "",
            focus: "",
            name: "",
            number: "",

        };
    }

    handleFieldChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    handleInputFocus = (e) => {
        this.setState({focus: e.target.name});
    }

    handleMouseDownPassword = () => {
        if (!this.state.showPassword) {
            this.setState({showPassword: true});
        } else {
            this.setState({showPassword: false});
        }
    };
    handleDeliveryAdressSave = (adressType) => {
        const endereco = {
            logradouro: this.state.deliveryLogradouro,
            cep: this.state.deliveryCep,
            endereco: this.state.deliveryEndereco,
            bairro: this.state.deliveryBairro,
            numero: this.state.deliveryNumero,
            complemento: this.state.deliveryComplemento,
            adressType: adressType,
        }
        this.setState({
            adressList: [...this.state.adressList, endereco],
            showAdressFields: !this.state.showAdressFields
        })
    }
    handlePaymentAdressSave = (adressType) => {
        const endereco = {
            logradouro: this.state.paymentLogradouro,
            cep: this.state.paymentCep,
            endereco: this.state.paymentEndereco,
            bairro: this.state.paymentBairro,
            numero: this.state.paymentNumero,
            complemento: this.state.paymentComplemento,
            adressType: adressType,
        }
        this.setState({
            adressList: [...this.state.adressList, endereco],
            showAdressFields: !this.state.showAdressFields
        })

    }

    render() {
        const {
            email,
            password,
            signupUsername,
            passwordCheck,
            showPassword,
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

                    <SPS.SignupWrapper onSubmit={() => {
                        console.log(JSON.stringify(this.state.adressList))
                    }}>
                        <h4>Dados para cadastro</h4>
                        <SPS.ClientWrapper>
                            <SPS.ClientFieldsWrapper>
                                <TextField
                                    inputProps={{
                                        pattern: "[a-zA-Z.]{6,16}",
                                        title: "O Nome precisa ter entre 6 e 16 caracteres alfanumericos."
                                    }}
                                    onChange={this.handleFieldChange}
                                    name="signupUsername"
                                    type="username"
                                    label="Nome"
                                    value={signupUsername}
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
                                    name="password"
                                    label="Password"
                                    required
                                    value={password}
                                    type={showPassword ? "text" : "password"}
                                    onChange={this.handleFieldChange}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onMouseDown={this.handleMouseDownPassword}
                                                    onMouseUp={this.handleMouseDownPassword}
                                                >
                                                    {showPassword ? <Visibility/> : <VisibilityOff/>}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                        pattern: "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$",
                                        title: "A senha precisa ter entre 6 e 16 caracteres alfanumericos.",
                                        autoComplete: 'new-password',
                                    }}

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
                                                    {showPassword ? <Visibility/> : <VisibilityOff/>}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                        pattern: "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$",
                                        title: "A senha precisa ter entre 6 e 16 caracteres alfanumericos.",
                                        autoComplete: 'new-password',
                                    }}
                                    onChange={this.handleFieldChange}
                                    name="passwordCheck"
                                    type={showPassword ? "text" : "password"}
                                    label="Password check"
                                    required
                                    error={this.state.password !== this.state.passwordCheck}
                                    helperText={this.state.password !== this.state.passwordCheck ? "senhas divergentes" : ""}
                                    value={passwordCheck}
                                />
                                <PhoneInput
                                    inputProps={{
                                        name: 'phone',
                                        required: true,
                                        autoFocus: false
                                    }}
                                    isValid={(value,) => {
                                        if (value.length < 13 && value.length > 2) {
                                            return 'numero invalido';
                                        } else if (value.length < 13 && value.length > 2) {
                                            return false;
                                        } else {
                                            return true;
                                        }
                                    }}
                                    country={'br'}
                                    value={this.state.phone}
                                    onChange={phone => this.setState({phone})}
                                />
                            </SPS.ClientFieldsWrapper>
                        </SPS.ClientWrapper>

                        <SPS.AdressWrapper>

                            <SPS.AdressFieldsWrapper onSubmit={() => this.handleDeliveryAdressSave("entrega")}>
                                <h5>Endereço de Entrega</h5>
                                <FormControl style={{minWidth: 120}}>
                                    <InputLabel>Logradouro</InputLabel>
                                    <Select
                                        name="deliveryLogradouro"
                                        value={this.state.deliveryLogradouro}
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
                                <TextField
                                    onChange={this.handleFieldChange}
                                    name="deliveryCep"
                                    type="text"
                                    label="Cep"
                                    required
                                    value={this.state.deliveryCep}
                                />

                                <TextField
                                    onChange={this.handleFieldChange}
                                    name="deliveryEndereco"
                                    type="text"
                                    label="Endereço"
                                    required
                                    value={this.state.deliveryEndereco}
                                />

                                <TextField
                                    onChange={this.handleFieldChange}
                                    name="deliveryBairro"
                                    type="text"
                                    label="Bairro"
                                    required
                                    value={this.state.deliveryBairro}
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
                                    name="deliveryComplemento"
                                    type="text"
                                    label="Complemento"
                                    required
                                    value={this.state.deliveryComplemento}
                                />
                            </SPS.AdressFieldsWrapper>


                            <SPS.AdressFieldsWrapper onSubmit={() => this.handlePaymentAdressSave("cobranca")}>
                                <h5>Endereço de Cobrança</h5>
                                <FormControl style={{minWidth: 120}}>
                                    <InputLabel>Logradouro</InputLabel>
                                    <Select
                                        name="paymentLogradouro"
                                        value={this.state.paymentLogradouro}
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
                                <TextField
                                    onChange={this.handleFieldChange}
                                    name="paymentCep"
                                    type="text"
                                    label="Cep"
                                    required
                                    value={this.state.paymentCep}
                                />

                                <TextField
                                    onChange={this.handleFieldChange}
                                    name="paymentEndereco"
                                    type="text"
                                    label="Endereço"
                                    required
                                    value={this.state.paymentEndereco}
                                />

                                <TextField
                                    onChange={this.handleFieldChange}
                                    name="paymentBairro"
                                    type="text"
                                    label="Bairro"
                                    required
                                    value={this.state.paymentBairro}
                                />

                                <TextField
                                    onChange={this.handleFieldChange}
                                    name="paymentNumero"
                                    type="number"
                                    label="Numero"
                                    required
                                    value={this.state.paymentNumero}
                                />

                                <TextField
                                    onChange={this.handleFieldChange}
                                    name="paymentComplemento"
                                    type="text"
                                    label="Complemento"
                                    required
                                    value={this.state.paymentComplemento}
                                />
                            </SPS.AdressFieldsWrapper>
                        </SPS.AdressWrapper>
                        <SPS.CreditCardWrapper>
                            <Cards
                                cvc={this.state.cvc}
                                expiry={this.state.expiry}
                                focused={this.state.focus}
                                name={this.state.name}
                                number={this.state.number}
                            />

                            <SPS.CreditCardFieldsWrapper>
                                <input
                                    type="tel"
                                    name="number"
                                    placeholder="Numero do Cartão"
                                    onChange={this.handleFieldChange}
                                    onFocus={this.handleInputFocus}
                                    required
                                    autoComplete="off"
                                />

                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Nome"
                                    onChange={this.handleFieldChange}
                                    onFocus={this.handleInputFocus}
                                    required
                                />

                                <input
                                    type="text"
                                    name="expiry "
                                    placeholder="Validade"
                                    onChange={this.handleFieldChange}
                                    onFocus={this.handleInputFocus}
                                    required
                                />

                                <input
                                    type="text"
                                    name="cvc "
                                    placeholder="CVC"
                                    onChange={this.handleFieldChange}
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
