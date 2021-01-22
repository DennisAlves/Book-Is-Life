import React, {Component} from "react";
import * as SPS from "./SignupPageStyles";
import {IconButton, InputAdornment, TextField} from "@material-ui/core";
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
import Payment from 'payment';
import axios from "axios";

class LoginPage extends Component {
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
        const {name, value} = event.target;
        this.setState({
            [name]: value,
        }, (() => {
            if (name === "cep") {
                this.handleCepFillUp(this.state.cep)
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
        } = this.state;

        const tipoDeTelefoneList = ["Residencial", "Celular", "Comercial", "Recado"]
        const tipoGeneroList = ["Masculino", "Feminino", "Não declarado"]
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
                                    onChange={this.handleFieldChange}
                                    name="dtNascimento"
                                    type="date"
                                    label="Data de Nascimento"
                                    required
                                    value={dtNascimento}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />

                                <FormControl style={{minWidth: 120}}>
                                    <InputLabel>Genero</InputLabel>
                                    <Select
                                        name="genero"
                                        value={genero}
                                        onChange={this.handleFieldChange}
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
                                    value={cpf}
                                    onChange={this.handleFieldChange}
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
                                    error={senha !== testeSenha}
                                    helperText={senha !== testeSenha ? "senhas divergentes" : ""}
                                    value={testeSenha}
                                />
                                <FormControl style={{minWidth: 120}}>
                                    <InputLabel>Tipo de telefone</InputLabel>
                                    <Select
                                        name="tipoTelefone"
                                        value={tipoTelefone}
                                        onChange={this.handleFieldChange}
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
                            <SPS.AdressFieldsWrapper>
                                <h5>Endereço</h5>

                                <TextField
                                    onChange={this.handleFieldChange}
                                    name="descricaoEndereco"
                                    type="text"
                                    label="Descriçâo do Endereco"
                                    required
                                    value={descricaoEndereco}
                                />

                                <InputMask
                                    mask="99999-999"
                                    value={cep}
                                    onChange={this.handleFieldChange}
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
                                        value={tipoDeResidencia}
                                        onChange={this.handleFieldChange}
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
                                        value={tipoLogradouro}
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
                                    name="logradouro"
                                    type="text"
                                    label="Endereço"
                                    required
                                    value={logradouro}
                                />

                                <TextField
                                    onChange={this.handleFieldChange}
                                    name="numero"
                                    type="number"
                                    label="Numero"
                                    required
                                    value={numero}
                                />

                                <TextField
                                    onChange={this.handleFieldChange}
                                    name="bairro"
                                    type="text"
                                    label="Bairro"
                                    required
                                    value={bairro}
                                />

                                <TextField
                                    onChange={this.handleFieldChange}
                                    name="complemento"
                                    type="text"
                                    label="Complemento"
                                    value={complemento}
                                />
                                <TextField
                                    onChange={this.handleFieldChange}
                                    name="cidade"
                                    type="text"
                                    label="Cidade"
                                    value={cidade}
                                    required
                                />
                                <FormControl style={{minWidth: 120}}>
                                    <InputLabel>Estado</InputLabel>
                                    <Select
                                        name="uf"
                                        value={uf}
                                        onChange={this.handleFieldChange}
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