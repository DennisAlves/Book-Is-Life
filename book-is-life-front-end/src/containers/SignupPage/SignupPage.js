import React, {Component} from "react";
import * as SPS from "./SignupPageStyles";
import {Button} from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import {push} from "connected-react-router";
import {routes} from '../Router';
import {connect} from "react-redux";
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import axios from "axios";
import CadastroCliente from "../Components/CadastroCliente/CadastroCliente"
import CadastroEndereco from "../Components/CadastroEndereço/CadastroEndereco"

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
            emailIsOk: false,
            passwordIsOk: false,
            isCell: true,
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
                } else if (name === "senha") {
                    this.passwordIsValid(this.state.senha)
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
        const regex = /^([\w-\.])+@([\w-]+\.)+[\w-]{3,4}$/g;
        if (this.state.email !== undefined) {
            if (regex.test(this.state.email)) {

                this.setState({emailIsOk: true})
            } else if (!regex.test(this.state.email)) {

                this.setState({emailIsOk: false})
            }
        }
        return this.state.emailIsOk;
    }
    passwordIsValid = (senha) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/g;

        if (senha !== undefined) {
            if (regex.test(senha)) {
                this.setState({passwordIsOk: true})
            } else if (!regex.test(senha)) {
                this.setState({passwordIsOk: false})
            }
        }
        return this.state.passwordIsOk;
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
            complemento,
            bairro,
            numero,
            cidade,
            uf,
            tipoTelefone,
            dtNascimento,
            errorMessage,
            emailIsOk,
            passwordIsOk,
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

                        <CadastroCliente
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
                            passwordIsOk={passwordIsOk}
                            telefone={telefone}
                            tipoTelefone={tipoTelefone}
                            genero={genero}
                            errorMessage={errorMessage}
                            handleMouseDownPassword={this.handleMouseDownPassword}
                        />
                        <CadastroEndereco
                            currentStep={this.state.currentStep}
                            handleFieldChange={this.handleFieldChange}
                            descricaoEndereco={descricaoEndereco}
                            tipoLogradouro={tipoLogradouro}
                            tipoDeResidencia={tipoDeResidencia}
                            cep={cep}
                            logradouro={logradouro}
                            complemento={complemento}
                            bairro={bairro}
                            numero={numero}
                            cidade={cidade}
                            uf={uf}
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