import React, {Component} from "react";
import {push} from "connected-react-router";
import {routes} from '../Router';
import {connect} from "react-redux";
import Paper from '@material-ui/core/Paper';
import * as CPS from "./CheckOutPageStyled";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import DadosEndereco from "../Components/DadosCliente/DadosEndereco"
import AdressDataFields from "../Components/CadastroEndereço/CadastroEndereco"
import Button from "@material-ui/core/Button";
import DadosCartaoResumo from "../Components/DadosCliente/DadosCartaoResumo"
import CrediCardDataFields from "../Components/CadastroCartao/CadastroCartao"
import Payment from "payment"
import Visa from "../Images/CardLogo/visa.svg"
import MasterCard from "../Images/CardLogo/mastercard.svg"
import AmericanExpress from "../Images/CardLogo/amex.svg"
import Discover from "../Images/CardLogo/discover.svg"
import JCB from "../Images/CardLogo/jcb.svg"
import DinersClub from "../Images/CardLogo/diners.svg"
import Maestro from "../Images/CardLogo/maestro.svg"
import Elo from "../Images/CardLogo/elo.svg"
import Hipercard from "../Images/CardLogo/hipercard.svg"
import Checkbox from "@material-ui/core/Checkbox";
import TextField from '@material-ui/core/TextField';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import AdressValidation from "../Components/Validations/ValidationAdress";
import CardValidation from "../Components/Validations/ValidationCard"
import axios from "axios";
import CheckOutConfirm from "../Components/CheckOutConfirm/CheckOutConfirm"


class CheckOutPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            enderecos: [
                {
                    descricaoEndereco: "Minha casa",
                    tipoDeEndereco: "Residencial",
                    tipoDeResidencia: "Casa",
                    cep: "08790020",
                    tipoLogradouro: "Rua",
                    logradouro: "Vereador Jair salvarani ",
                    numero: "364",
                    complemento: "",
                    bairro: "Vila Oliveira",
                    cidade: "Mogi das Cruzes",
                    uf: "SP",
                    checked: false,
                },

            ],
            cartoes: [
                {
                    number: "4040404040404040",
                    name: "",
                    expiry: "12/28",
                    cvv: "",
                    bandeira: MasterCard,
                    checked: false,
                },
                {
                    number: "4040404040404545",
                    name: "",
                    expiry: "12/25",
                    cvv: "",
                    bandeira: Visa,
                    checked: false,
                },

            ],
            cardLogoName: [
                "visa",
                "mastercard",
                "american-express",
                "discover",
                "jcb",
                "diners-club",
                "maestro",
                "elo",
                "hipercard",
            ],
            cardLogo: [
                Visa,
                MasterCard,
                AmericanExpress,
                Discover,
                JCB,
                DinersClub,
                Maestro,
                Elo,
                Hipercard,
            ],
            endereco: {
                descricaoEndereco: "",
                tipoDeEndereco: "",
                tipoDeResidencia: "",
                cep: "",
                tipoLogradouro: "",
                logradouro: "",
                complemento: "",
                numero: "",
                bairro: "",
                cidade: "",
                uf: "",
                checked: false,
            },
            descricaoEndereco: "",
            tipoDeEndereco: "",
            tipoDeResidencia: "",
            cep: "",
            tipoLogradouro: "",
            logradouro: "",
            complemento: "",
            numero: "",
            bairro: "",
            cidade: "",
            uf: "",
            checked: false,
            name: "",
            number: "",
            expiry: "",
            cvc: "",
            bandeiraCard: "",
            focused: "",
            cupom: "",
            activeStep: 0,
            steps: ['Endereço para Envio', 'Forma de pagamento', 'Confirmação do Pedido'],
            adressShowInputButton: true,
            adressShowFields: false,
            adressShowData: true,
            adressSaveButtom: true,
            nextButtonVisibility: true,
            cardSplitTotal: true,
            stepButtom: true,
            cardTotal: [],
            cardTotalSum: "",
            cardFocus: [],
            totalValues: "",
            frete: 21.00,
            freteTotal: "",
            valorTotal: "",
            qtdeTotal: "",
            itemDescription: "",
            disableButton: true,

        };
    }

    componentDidMount() {
        const {carrinhoVenda} = this.props
        let freteTotal = 0.00
        let valorTotal = 0.00
        let qtdeTotal = 0.00
        let itemDescription = []
        if (carrinhoVenda.length > 0) {
            for (let i = 0; i < carrinhoVenda.length; i++) {
                valorTotal = valorTotal + ((carrinhoVenda[i].custo +
                    (carrinhoVenda[i].custo * carrinhoVenda[i].precificacao)) *
                    parseInt(carrinhoVenda[i].qtdeCarrinho))
                qtdeTotal = qtdeTotal + carrinhoVenda[i].qtdeCarrinho
                itemDescription.push({titulo: carrinhoVenda[i].titulo, qtde: carrinhoVenda[i].qtdeCarrinho})
            }
            for (let i = 0; i <= qtdeTotal; i += 5) {
                freteTotal = freteTotal + this.state.frete
            }

            this.setState({
                freteTotal: freteTotal,
                valorTotal: valorTotal,
                qtdeTotal: qtdeTotal,
                itemDescription: itemDescription,
            })

        }
    }

    handleFieldChange = event => {

        this.setState({
            [event.target.name]: event.target.value
        });
        //this.handleAdressChange(event.target.name, event.target.value)
        if (event.target.name === "cep") {
            this.handleCepFillUp(event.target.value)
        }
    };

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

    handleAdressChange = (name, value) => {
        const endereco = this.state.endereco

        if (name === "descricaoEndereco") {
            endereco.descricaoEndereco = value
            this.setState({endereco: endereco})
        }
        if (name === "tipoDeEndereco") {
            endereco.tipoDeEndereco = value
            this.setState({endereco: endereco})
        }
        if (name === "tipoDeResidencia") {
            endereco.tipoDeResidencia = value
            this.setState({endereco: endereco})
        }
        if (name === "cep") {
            endereco.cep = value
            this.setState({endereco: endereco})
        }
        if (name === "tipoLogradouro") {
            endereco.tipoLogradouro = value
            this.setState({endereco: endereco})
        }
        if (name === "logradouro") {
            endereco.logradouro = value
            this.setState({endereco: endereco})
        }
        if (name === "complemento") {
            endereco.complemento = value
            this.setState({endereco: endereco})
        }
        if (name === "numero") {
            endereco.numero = value
            this.setState({endereco: endereco})
        }
        if (name === "bairro") {
            endereco.bairro = value
            this.setState({endereco: endereco})
        }
        if (name === "cidade") {
            endereco.cidade = value
            this.setState({endereco: endereco})
        }
        if (name === "uf") {
            endereco.uf = value
            this.setState({endereco: endereco})
        }

    }

    saveAddress = () => {
        const {
            descricaoEndereco,
            tipoDeEndereco,
            tipoDeResidencia,
            cep,
            tipoLogradouro,
            logradouro,
            complemento,
            numero,
            bairro,
            cidade,
            uf,
        } = this.state
        let stateCopyAdress = {
            descricaoEndereco: descricaoEndereco,
            tipoDeEndereco: tipoDeEndereco,
            tipoDeResidencia: tipoDeResidencia,
            cep: cep,
            tipoLogradouro: tipoLogradouro,
            logradouro: logradouro,
            complemento: complemento,
            numero: numero,
            bairro: bairro,
            cidade: cidade,
            uf: uf,
            checked: false,
        }

        this.setState(({
            enderecos: [...this.state.enderecos, stateCopyAdress]
        }))
        this.handleShowHideAdressInput()
        this.clearAdressFields()

    }
    clearAdressFields = () => {
        this.setState({
            descricaoEndereco: "",
            tipoDeEndereco: "",
            tipoDeResidencia: "",
            cep: "",
            tipoLogradouro: "",
            logradouro: "",
            complemento: "",
            numero: "",
            bairro: "",
            cidade: "",
            uf: "",
        });
    }
    saveCard = () => {
        const {
            number,
            name,
            expiry,
            cvv,
            bandeiraCard,
        } = this.state
        let cardIndex = ""
        let logoImage = ""
        for (let i = 0; i < this.state.cardLogoName.length; i++) {
            if (this.state.cardLogoName[i] === bandeiraCard) {
                cardIndex = i
            }
        }

        for (let i = 0; i < this.state.cardLogo.length; i++) {
            if (i === parseInt(cardIndex)) {
                logoImage = this.state.cardLogo[i]
            }
        }

        let stateCopyCard = {
            number: number,
            name: name,
            expiry: expiry,
            cvv: cvv,
            bandeira: logoImage,
            checked: false,
        }

        this.setState(({
            cartoes: [...this.state.cartoes, stateCopyCard]
        }))
        this.handleShowHideAdressInput()
        this.clearCardFields()
    }
    clearCardFields = () => {
        this.setState({
            number: "",
            name: "",
            expiry: "",
            cvv: "",
            bandeira: "",
        });
    }
    handleShowHideAdressInput = () => {
        const {
            adressShowInputButton,
            adressShowFields,
            adressShowData,
            stepButtom,
        } = this.state

        this.setState({adressShowInputButton: !adressShowInputButton})
        this.setState({adressShowFields: !adressShowFields})
        this.setState({adressShowData: !adressShowData})
        this.setState({stepButtom: !stepButtom})
    }
    handleInputFocus = (e) => {
        const target = e.target;
        this.setState({
            focused: target.name,
        });
    };

    handleCallback(type, isValid) {

    }

    handleInputChange = (e) => {
        const target = e.target;
        if (target.name === 'number') {
            this.setState({
                [target.name]: target.value.replace(/[^0-9]/g, ''),
                cardNumberIsvalid: Payment.fns.validateCardNumber(target.value.replace(/[_.]/g, " ")),
            });
            if (target.value.replace(/[^0-9]/g, '') && target.value.replace(/[^0-9]/g, '').length > 3) {
                let creditCardType = require("credit-card-type");
                let cardType = creditCardType(target.value.substring(0, 4))
                this.setState({bandeiraCard: cardType[0].type})
            }
        } else {
            this.setState({
                [target.name]: target.value,
            });
        }
        /*const cardFieldsValidate = () => {
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
        if (cardFieldsValidate()) {
           this.setState({cardDateButtonDisable: true})
        } else {
            this.setState({cardDateButtonDisable: false})
        }

        if (target.name === 'number') {
            this.setState({
                [target.name]: target.value.replace(/[^0-9]/g, ''),
                cardNumberIsvalid: Payment.fns.validateCardNumber(target.value.replace(/[_.]/g, " ")),
            });
        } else if (target.name === 'name') {
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

        }*/
    };


    handleChangeCardValue = (event, index) => {
        let cardValues = this.state.cardTotal
        let checkedCard = 0
        let cardFocus = this.state.cardFocus

        this.state.cartoes.forEach(value => {
            if (value.checked) {
                return checkedCard++
            }
        })
        if (cardValues.length !== checkedCard) {
            for (let i = 0; i < cardValues; i++) {
                cardValues.push("")
                cardFocus.push(false)
            }
        }

        cardValues[index] = event.target.value.replace(/[^0-9.]/g,'')

        cardFocus[index] = true
        for (let i = 0; i < cardFocus.length; i++) {
            if (index !== i) {
                cardFocus[i] = false
            }
        }
        let total = 0

        for (let i = 0; i < cardValues.length; i++) {
            if (cardValues[i] !== "") {
                total = total + parseFloat(cardValues[i])
            }

        }

        this.setState({totalValues: new Intl.NumberFormat("pt-BR", {style: 'currency', currency: 'BRL'}).format(total)})
        this.setState({cardTotal: cardValues})
        this.setState({cardFocus: cardFocus})
        this.validadeCardPayment()
    }
    handleChangeCardChecked = (index) => {
        let stateCopy = this.state.cartoes
        stateCopy[index].checked = !stateCopy[index].checked;
        this.setState({cartoes: stateCopy});
        let countCardChecked = 0
        this.state.cartoes.forEach(card => {
            if (card.checked) {
                countCardChecked++
            }
        })
        if (countCardChecked < 2) {
            this.setState({cardSplitTotal: false, disableButton: false})

        } else {
            this.setState({cardSplitTotal: true, disableButton: true})
        }
        this.handleNexCard()
    }
    handleChangeAdressChecked = (index) => {
        let stateCopy = this.state.enderecos
        stateCopy[index].checked = !stateCopy[index].checked;
        for (let i = 0; i < stateCopy.length; i++) {
            if (index !== i) {
                stateCopy[i].checked = false
            }
        }
        this.setState({enderecos: stateCopy});
        this.handleNexAdress()
    }
    validadeCardPayment = () => {
        const {cardTotal, freteTotal, valorTotal} = this.state
        let cardArr = cardTotal

        if (cardArr.length === undefined) {
            this.setState({disableButton: false})
        } else {
            this.setState({disableButton: true})
            let total = 0
            let cardCount = 0
            cardArr.forEach(card => {
                    if (card > 10) {
                        cardCount ++
                        total += parseFloat(card)
                    }
                }
            )
            this.setState({cardTotalSum: total})
            if (total === (freteTotal + valorTotal) && cardCount === cardArr.length) {
                this.setState({disableButton: false})
            }
        }
    }
    validateCardValue = (index) => {
        const {cardTotal} = this.state
        let cardArr = cardTotal
        let countDot = 0
        if(cardArr[index]){
            for (let i = 0; i < cardArr[index].length; i++) {
                if(cardArr[index].charAt(i) ==="."){
                    countDot ++
                }
            }
            if(countDot <= 1){
                return false
            }
            else {
                return true
            }
        }
    }


    getStepContent(stepIndex) {
        const {
            descricaoEndereco,
            tipoDeEndereco,
            tipoDeResidencia,
            cep,
            tipoLogradouro,
            logradouro,
            complemento,
            numero,
            bairro,
            cidade,
            uf,
            name,
            number,
            expiry,
            cvc,
            focused,
            cupom,
            enderecos,
            cartoes,
            adressShowInputButton,
            adressShowFields,
            adressShowData,
            cardSplitTotal,
            cardTotal,
        } = this.state
        let endereco = {
            descricaoEndereco: descricaoEndereco,
            tipoDeEndereco: tipoDeEndereco,
            tipoDeResidencia: tipoDeResidencia,
            cep: cep,
            tipoLogradouro: tipoLogradouro,
            logradouro: logradouro,
            complemento: complemento,
            numero: numero,
            bairro: bairro,
            cidade: cidade,
            uf: uf,
            checked: false,
        }


        switch (stepIndex) {

            case 0:

                const logradouroList = [
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
                    "Vila",
                ]
                return (
                    <CPS.CheckOutPageWrapper>
                        {adressShowData ?
                            <div>
                                <CPS.CheckOutTopWrapper>
                                    <Typography color="textPrimary" variant="h5">
                                        Selecione um endereço de envio
                                    </Typography>
                                    <Divider orientation="horizontal" variant="middle"/>
                                </CPS.CheckOutTopWrapper>
                                <CPS.CheckOutAdressWrapper>
                                    <CPS.CheckOutAdressItemWrapper>
                                        {this.state.enderecos && this.state.enderecos.map((endereco, index) => {
                                            return (
                                                <CPS.CheckOutAdressItemWrapper key={Math.random() * (index + 1)}>
                                                    <Checkbox
                                                        key={Math.random() * (index + 1)}
                                                        style={{backgroundColor: 'transparent'}}
                                                        checked={endereco.checked}
                                                        disableRipple
                                                        onClick={() => {
                                                            this.handleChangeAdressChecked(index)
                                                        }}
                                                        inputProps={{'aria-label': 'primary checkbox'}}
                                                    />
                                                    <DadosEndereco key={index}
                                                                   descricao={endereco.descricaoEndereco}
                                                                   tipoEndereco={endereco.tipoDeEndereco}
                                                                   tipoResidencia={endereco.tipoDeResidencia}
                                                                   cep={endereco.cep}
                                                                   logradouro={endereco.tipoLogradouro}
                                                                   endereco={endereco.logradouro}
                                                                   numero={endereco.numero}
                                                                   bairro={endereco.bairro}
                                                                   cidade={endereco.cidade}
                                                                   uf={endereco.uf}
                                                    />
                                                </CPS.CheckOutAdressItemWrapper>
                                            )
                                        })}
                                    </CPS.CheckOutAdressItemWrapper>
                                </CPS.CheckOutAdressWrapper>
                            </div>
                            :
                            ""
                        }

                        {
                            adressShowInputButton ?
                                <CPS.CheckOutAdressButtomWrapper>
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        color="secondary"
                                        fullWidth={false}
                                        style={{margin: 10}}
                                        onClick={this.handleShowHideAdressInput}
                                    >Adicionar Endereço</Button>
                                </CPS.CheckOutAdressButtomWrapper>
                                :
                                ""
                        }
                        {
                            adressShowFields ?
                                <CPS.CheckOutAdressBottonWrapper>
                                    <Typography color="textPrimary" variant="h5" component={'span'}>
                                        Adicionar um novo endereço de envio
                                    </Typography>
                                    <AdressDataFields
                                        currentStep={3}
                                        handleFieldChange={this.handleFieldChange}
                                        tipoLogradouroList={logradouroList}
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
                                    <CPS.CheckOutAdressButtomWrapper>
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            color="secondary"
                                            style={{margin: 10}}
                                            onClick={this.handleShowHideAdressInput}
                                        >Voltar</Button>
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            color="secondary"
                                            style={{margin: 10}}
                                            onClick={this.saveAddress}
                                            disabled={!AdressValidation(endereco)}
                                        >Salvar</Button>
                                    </CPS.CheckOutAdressButtomWrapper>
                                </CPS.CheckOutAdressBottonWrapper>
                                :
                                ""

                        }

                    </CPS.CheckOutPageWrapper>
                )
            case 1:
                return (
                    <CPS.CheckOutPageWrapper>
                        {adressShowData ?
                            <div>
                                <CPS.CheckOutTopWrapper>
                                    <Typography color="textPrimary" variant="h5">
                                        Selecionar forma de pagamento
                                    </Typography>
                                    <Divider orientation="horizontal" variant="middle"/>
                                </CPS.CheckOutTopWrapper>
                                <CPS.CheckOutCardWrapper>
                                    <CPS.CheckOutCardsWrapper>
                                        {this.state.cartoes && this.state.cartoes.map((cartao, index) =>
                                            <CPS.CheckOutCardItemWrapper key={Math.random() * (index + 1)}>
                                                <Checkbox
                                                    key={Math.random() * (index + 1)}
                                                    style={{backgroundColor: 'transparent'}}
                                                    checked={cartao.checked}
                                                    disableRipple
                                                    onClick={() => {
                                                        this.handleChangeCardChecked(index)
                                                    }}
                                                    inputProps={{'aria-label': 'primary checkbox'}}
                                                />
                                                <DadosCartaoResumo key={Math.random() * (index + 1)}
                                                                   numero={cartao.number.slice(cartao.number.length - 4)}
                                                                   valText={"Validade: "}
                                                                   validade={cartao.expiry}
                                                                   bandeira={cartao.bandeira}
                                                />
                                            </CPS.CheckOutCardItemWrapper>
                                        )}

                                    </CPS.CheckOutCardsWrapper>
                                </CPS.CheckOutCardWrapper>
                            </div>
                            :
                            ""}
                        {
                            adressShowInputButton ?
                                <CPS.CheckOutAdressButtomWrapper>
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        color="secondary"
                                        fullWidth={false}
                                        style={{margin: 10}}
                                        onClick={this.handleShowHideAdressInput}
                                    >Adicionar Cartão</Button>
                                </CPS.CheckOutAdressButtomWrapper>
                                :
                                ""
                        }
                        {
                            adressShowFields ?
                                <CPS.CheckOutAdressBottonWrapper>
                                    <Typography color="textPrimary" variant="h5">
                                        Adicionar um novo cartao
                                    </Typography>
                                    <Divider orientation="horizontal" variant="middle"/>
                                    <CrediCardDataFields
                                        currentStep={4}
                                        handleInputChange={this.handleInputChange}
                                        handleInputFocus={this.handleInputFocus}
                                        handleCallback={this.handleCallback}
                                        name={name}
                                        number={number}
                                        expiry={expiry}
                                        cvc={cvc}
                                        focused={focused}
                                    />
                                    <CPS.CheckOutAdressButtomWrapper>
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            color="secondary"
                                            style={{margin: 10}}
                                            onClick={this.handleShowHideAdressInput}
                                        >Voltar</Button>
                                        <Button size="small" variant="outlined" color="secondary"
                                                onClick={this.saveCard}
                                                disabled={!CardValidation(name, number, expiry, cvc)}
                                                style={{margin: 10}}>Salvar</Button>
                                    </CPS.CheckOutAdressButtomWrapper>
                                </CPS.CheckOutAdressBottonWrapper>
                                :
                                ""}
                    </CPS.CheckOutPageWrapper>
                )
            case 2:

                return (
                    <CPS.CheckOutResumeWrapper>
                        <Typography color="textPrimary" variant="h5">
                            Confira e finalize o seu pedido
                        </Typography>
                        <Divider orientation="horizontal" variant="middle"/>
                        <CPS.CheckOutResumeItens>
                            <CPS.CheckOutResumeAdress>
                                <Typography variant="subtitle1" color="textPrimary" align="center"
                                            style={{marginLeft: 5}}>
                                    Endereço de Entrega
                                </Typography>
                                <Typography variant="subtitle2" color="textPrimary" align="left"
                                            style={{marginLeft: 5}}>
                                    {enderecos[0].descricaoEndereco}
                                </Typography>
                                <Typography variant="body1" color="textPrimary" component="div" align="left"
                                            style={{marginLeft: 5}}>
                                    {enderecos[0].tipoLogradouro} {enderecos[0].endereco}, {enderecos[0].numero}, {enderecos[0].complemento} {enderecos[0].bairro}
                                </Typography>
                                <Typography variant="body1" color="textPrimary" component="div" align="left"
                                            style={{marginLeft: 5}}>
                                    Cep: {enderecos[0].cep}
                                </Typography>
                                <Typography variant="body1" color="textPrimary" component="div" align="left"
                                            style={{marginLeft: 5}}>
                                    {enderecos[0].cidade} - {enderecos[0].uf}
                                </Typography>
                            </CPS.CheckOutResumeAdress>
                            <CPS.CheckOutResumeCard>

                                <Typography variant="subtitle1" color="textPrimary" align="center"
                                            style={{marginLeft: 5}}>
                                    Forma de pagamento
                                </Typography>
                                {!cardSplitTotal ?
                                    <CPS.CheckOutResumeCard>
                                        {cartoes && cartoes.map((cartao, index) => {
                                            if (cartao.checked) {
                                                return (
                                                    <CPS.CheckOutCardItemWrapper key={Math.random() * (index + 1)}>
                                                        <DadosCartaoResumo key={Math.random() * (index + 2)}
                                                                           numero={cartao.number.slice(cartao.number.length - 4)}
                                                                           bandeira={cartao.bandeira}
                                                        />
                                                    </CPS.CheckOutCardItemWrapper>
                                                )
                                            } else {
                                                return ("")
                                            }
                                        })}
                                    </CPS.CheckOutResumeCard>
                                    :
                                    <CPS.CheckOutResumeCard>
                                        {cartoes && cartoes.map((cartao, index) => {
                                            if (cartao.checked) {
                                                return (
                                                    <CPS.CheckOutCardItemWrapper key={Math.random() * (index + 1)}>
                                                        <DadosCartaoResumo key={Math.random() * (index + 2)}
                                                                           numero={cartao.number.slice(cartao.number.length - 4)}
                                                                           bandeira={cartao.bandeira}
                                                        />
                                                        <TextField
                                                            key={Math.random() * (index + 2)}
                                                            style={{width: 120}}
                                                            FormHelperTextProps={{style: {fontSize: 10}}}
                                                            name={"valueCardField" + index}
                                                            variant="outlined"
                                                            label="Valor"
                                                            type="text"
                                                            color="primary"
                                                            size="small"
                                                            required
                                                            autoFocus={this.state.cardFocus[index]}
                                                            error={(cardTotal[index] < 10 || this.validateCardValue(index)) || cardTotal[index] === ""}
                                                            helperText={(cardTotal[index] < 10 || this.validateCardValue(index)) || cardTotal[index] === "" ? "valor minimo R$10" : ""}
                                                            onChange={event => this.handleChangeCardValue(event, index)}
                                                            value={cardTotal[index]}
                                                        />
                                                    </CPS.CheckOutCardItemWrapper>
                                                )
                                            } else {
                                                return ("")
                                            }
                                        })}
                                        {this.state.disableButton ?
                                            <Typography
                                                variant="body1"
                                                color="error"
                                                component="div"
                                                align="center"
                                                style={{marginLeft: 5}}>
                                                Valor restante: {
                                                ((this.state.freteTotal + this.state.valorTotal)
                                                    - this.state.cardTotalSum).toFixed(2)}
                                            </Typography>
                                            :
                                            <></>
                                        }

                                    </CPS.CheckOutResumeCard>
                                }


                            </CPS.CheckOutResumeCard>
                            <CPS.CheckOutResumeCupom>
                                <Paper elevation={0}>
                                    <TextField
                                        variant="outlined"
                                        name="cupom"
                                        label="Cupom"
                                        type="text"
                                        color="primary"
                                        size="small"
                                        onChange={this.handleFieldChange}
                                        value={cupom}
                                    />
                                </Paper>
                            </CPS.CheckOutResumeCupom>
                            <CheckOutConfirm
                                qtdeTotal={this.state.qtdeTotal}
                                valorTotal={this.state.valorTotal}
                                buttomText={"Finalizar"}
                                frete={this.state.freteTotal}
                                itemDescription={this.state.itemDescription}
                                disableButtom={this.state.disableButton}
                            />
                        </CPS.CheckOutResumeItens>
                    </CPS.CheckOutResumeWrapper>
                )
            default:
                return 'Unknown stepIndex';
        }
    }


    handleNext = () => {
        this.setState({activeStep: this.state.activeStep + 1})
        this.handleNexCard()
    };

    handleBack = () => {
        this.setState({activeStep: this.state.activeStep - 1})
    };

    handleReset = () => {
        this.setState({activeStep: 0})
    };
    handleNexAdress = () => {
        for (let i = 0; i < this.state.enderecos.length; i++) {
            if (this.state.enderecos[i].checked) {
                this.setState({nextButtonVisibility: false});
                i = this.state.enderecos.length
            } else {
                this.setState({nextButtonVisibility: true});
            }
        }
    }
    handleNexCard = () => {
        for (let i = 0; i < this.state.cartoes.length; i++) {
            if (this.state.cartoes[i].checked) {
                this.setState({nextButtonVisibility: false});
                i = this.state.cartoes.length
            } else {
                this.setState({nextButtonVisibility: true});
            }
        }
    }


    render() {

        const {
            activeStep,
            steps,
        } = this.state

        return (
            <>
                <CPS.MainDiv>
                    <Paper elevation={3}>
                        <CPS.CustomHeader>
                            <CPS.HomeLogo onClick={this.props.goToHomePage}><h3>aqui vai ficar o header</h3>
                            </CPS.HomeLogo>
                        </CPS.CustomHeader>
                    </Paper>
                    <CPS.CheckOutPageWrapper>
                        <Stepper activeStep={activeStep} alternativeLabel>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>

                        <div>
                            {activeStep === steps.length ? (
                                <div>
                                    <Typography component={'span'}>All steps completed</Typography>
                                    <Button onClick={this.handleReset}>Reset</Button>
                                </div>
                            ) : (

                                <div>

                                    <Typography component={'span'}>{this.getStepContent(activeStep)}</Typography>

                                    <div style={{display: (this.state.stepButtom ? 'block' : 'none')}}>
                                        <Button
                                            disabled={activeStep === 0}
                                            onClick={this.handleBack}
                                        >
                                            Voltar
                                        </Button>
                                        <Button variant="contained" color="primary"
                                                onClick={this.handleNext}
                                                disabled={this.state.nextButtonVisibility}
                                                style={{display: (activeStep !== 2 ? 'inline' : 'none')}}
                                        >
                                            {activeStep === steps.length - 1 ? 'Finalizar' : 'Proximo'}
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </CPS.CheckOutPageWrapper>
                    <Paper elevation={3}>
                        <CPS.Footer>
                            <h3>aqui vai ficar o footer</h3>
                        </CPS.Footer>
                    </Paper>
                </CPS.MainDiv>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    estoque: state.estoque.estoque,
    carrinhoVenda: state.vendas.carrinhoVenda,
})

function mapDispatchToProps(dispatch) {
    return {
        goToHomePage: () => dispatch(push(routes.HomePage)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckOutPage)
