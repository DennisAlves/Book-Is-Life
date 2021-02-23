import React, {Component} from "react";
import * as SPS from "./SignupPageStyles";
import {Button} from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import {push} from "connected-react-router";
import {routes} from '../Router';
import {connect} from "react-redux";
import axios from "axios";
import Payment from "payment"
import CadastroCliente from "../Components/CadastroCliente/CadastroCliente"
import CadastroEndereco from "../Components/CadastroEndereço/CadastroEndereco"
import CadastroCartao from "../Components/CadastroCartao/CadastroCartao"
import moment from "moment";

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
            cardNumberIsvalid: false,
            cardNameIsvalid: false,
            clientDateButtonDisable: false,
            adressDateButtonDisable: false,
            cardDateButtonDisable: false,
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
                } else if (name === "nomeCLiente") {

                } else if (name === "email") {
                    this.emailIsValid(this.state.email)
                } else if (name === "senha") {
                    this.passwordIsValid(this.state.senha)
                }
            })
        );
        if (this.clientFieldsValidation()) {
            this.setState({clientDateButtonDisable: true})
        } else {
            this.setState({clientDateButtonDisable: false})
        }
    };

    handleInputChange = (e) => {
        const target = e.target;
        const cardFieldsValidate =()=>{
            if (
                this.state.cardNameIsvalid &&
                this.state.cardNumberIsvalid &&
                Payment.fns.validateCardExpiry(this.state.expiry) &&
                this.state.cvc.replace(/[_]/g, "").length === 3
            ) {
                return false
            } else {
                return true
            }
        }
        if (cardFieldsValidate()){
            this.setState({cardDateButtonDisable: true})
        } else {
            this.setState({cardDateButtonDisable: false})
        }

        if (target.name === 'number') {
            this.setState({
                [target.name]: target.value.replace(/[^0-9]/g, ''),
                cardNumberIsvalid: Payment.fns.validateCardNumber(target.value.replace(/[_.]/g, " ")),
            });
        }
        else if (target.name === 'name') {
            this.setState({
                [target.name]: target.value,
            });
            if (target.value !== undefined) {
                if (target.value.length > 8) {
                    this.setState({
                        cardNameIsvalid: true
                    })
                }
            }

        } else {
            this.setState({
                [target.name]: target.value,
            });
        }
    };

    handleCallback(type, isValid) {

    }

    handleCepFillUp = (cepUnformated) => {
        const cep = cepUnformated.replace(/[-_]/g, "")

        if (cep.length === 8) {
            const request = axios.get(`https://viacep.com.br/ws/${cep}/json/`, {
                headers: {
                    "Content-Type": "application/json",
                }

            })

            request.then((response) => {

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
                    Voltar
                </Button>
            )
        }
        return null;
    }

    nextButton() {
        let currentStep = this.state.currentStep;

        if (currentStep <= 3) {
            if (currentStep === 1) {
                return (
                    <Button
                        className="btn btn-primary float-right"
                        type="button" onClick={this._next} disabled={this.state.clientDateButtonDisable}>
                        Proximo
                    </Button>
                )
            }
            if (currentStep === 2) {
                return (
                    <Button
                        className="btn btn-primary float-right"
                        type="button" onClick={this._next} disabled={this.state.adressDateButtonDisable}>
                        Proximo
                    </Button>
                )
            }
            if (currentStep === 3) {
                return (
                    <Button
                        className="btn btn-primary float-right"
                        type="button" onClick={()=>this.goToLogin()} disabled={this.state.cardDateButtonDisable}>
                        Enviar
                    </Button>
                )
            }
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

    clientFieldsValidation() {
        const CPF = require('cpf');
        if (
            !this.emailIsOk &&
            /^([a-zA-Z][\w ]{4,})$/.test(this.state.nomeCliente) &&
            moment().isSameOrAfter(this.state.dtNascimento) &&
            CPF.isValid(this.state.cpf) &&
            this.passwordIsValid(this.state.senha) &&
            this.passwordIsValid(this.state.testeSenha) &&
            this.state.telefone.replace(/[-_()]/g, "").length > 8 &&
            this.state.tipoTelefone !== "" &&
            this.state.genero !== ""
        ) {
            return false
        } else {
            return true
        }
    }
     goToLogin() {
        alert("Dados Salvos!");
         this.props.goToLoginPage()
    }


    render() {
        const {
            email,
            nomeCliente,
            cpf,
            senha,
            testeSenha,
            telefone,
            tipoTelefone,
            dtNascimento,
            genero,
            mostrarSenha,
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
            errorMessage,
            name,
            number,
            expiry,
            cvc,
            focused,
            emailIsOk,
            passwordIsOk,
            cardNumberIsvalid,
            cardNameIsvalid,
        } = this.state;


        return (
            <>
                <SPS.MainDiv>
                    <Paper elevation={3}>
                        <SPS.CustomHeader>
                            <SPS.HomeLogo onClick={this.props.goToHome}><h3>aqui vai ficar o header</h3>
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
                        <CadastroCartao
                            currentStep={this.state.currentStep}
                            handleInputChange={this.handleInputChange}
                            handleInputFocus={this.handleInputFocus}
                            handleCallback={this.handleCallback}
                            name={name}
                            number={number}
                            expiry={expiry}
                            cvc={cvc}
                            focused={focused}
                            cardNumberValidation={cardNumberIsvalid}
                            cardNameValidation={cardNameIsvalid}
                            //cardExpiryValidation={}
                            //cardCvcValidation={}
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


function mapDispatchToProps(dispatch) {

    return {
        goToHomePage: () => dispatch(push(routes.HomePage)),
        goToSignupPage: () => dispatch (push(routes.SignupPage)),
        goToLoginPage: () => dispatch(push(routes.LoginPage)),
    }
}

export default connect(null, mapDispatchToProps)(SignupPage)