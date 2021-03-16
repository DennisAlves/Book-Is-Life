import React, {Component} from "react";
import * as DBS from "./DashboardPageStyles";
import {connect} from "react-redux";
import {push} from "connected-react-router";
import {routes} from '../Router';
import Paper from '@material-ui/core/Paper';
import DashboardTabPanel from "../Components/DashboardData/AbasDados"


class DashboardPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataMock: {
                labels: ['01/02', '02/02', '03/02', '04/02', '05/02', '06/02', '07/02'],
                datasets: [
                    {
                        label: 'Vendas',
                        backgroundColor: 'rgb(134,236,110)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgb(103,183,84)',
                        hoverBorderColor: 'rgb(255,56,56)',
                        data: [65, 59, 80, 81, 56, 55, 40]
                    }
                ]
            },
            vendasGridMock: [
                {
                    id: Math.floor(Math.random() * 1000),
                    dtVenda: "01/02/2021 20:30",
                    nomeCliente: "Jaum pereira",
                    valor: "R$ 150,00",
                    status: "entregue",
                },
                {
                    id: Math.floor(Math.random() * 1000),
                    dtVenda: "01/02/2021 20:30",
                    nomeCliente: "Jaum pereira",
                    valor: "R$ 150,00",
                    status: "aguardando devolução",
                },
                {
                    id: Math.floor(Math.random() * 1000),
                    dtVenda: "01/02/2021 20:30",
                    nomeCliente: "Jaum pereira",
                    valor: "R$ 150,00",
                    status: "enviado",
                },
                {
                    id: Math.floor(Math.random() * 1000),
                    dtVenda: "01/02/2021 20:30",
                    nomeCliente: "Jaum pereira",
                    valor: "R$ 150,00",
                    status: "entregue",
                },
            ],
            estoqueGridMock: [
                {
                    id: Math.floor(Math.random() * 1000),
                    autor: " o cara",
                    dtLancamento: "10/02/2000",
                    edicao: "2º",
                    idioma: "ingles",
                    tipoCapa: "Dura",
                    paginas: "546",
                    ISBN10: "65465465465465465",
                    ISBN13: "9716976768687167",
                    largura: "15",
                    altura: "25",
                    profundidade: "8",
                    peso: "0.4",
                    valor: "R$ 85.50",
                    qtde: "15",
                },
                {
                    id: Math.floor(Math.random() * 1000),
                    autor: " o cara",
                    dtLancamento: "10/02/2000",
                    edicao: "2º",
                    idioma: "ingles",
                    tipoCapa: "Dura",
                    paginas: "546",
                    ISBN10: "65465465465465465",
                    ISBN13: "9716976768687167",
                    largura: "15",
                    altura: "25",
                    profundidade: "8",
                    peso: "0.4",
                    valor: "R$ 85.50",
                    qtde: "15",
                },
                {
                    id: Math.floor(Math.random() * 1000),
                    autor: " o cara",
                    dtLancamento: "10/02/2000",
                    edicao: "2º",
                    idioma: "ingles",
                    tipoCapa: "Dura",
                    paginas: "546",
                    ISBN10: "65465465465465465",
                    ISBN13: "9716976768687167",
                    largura: "15",
                    altura: "25",
                    profundidade: "8",
                    peso: "0.4",
                    valor: "R$ 85.50",
                    qtde: "15",
                },
                {
                    id: Math.floor(Math.random() * 1000),
                    autor: " o cara",
                    dtLancamento: "10/02/2000",
                    edicao: "2º",
                    idioma: "ingles",
                    tipoCapa: "Dura",
                    paginas: "546",
                    ISBN10: "65465465465465465",
                    ISBN13: "9716976768687167",
                    largura: "15",
                    altura: "25",
                    profundidade: "8",
                    peso: "0.4",
                    valor: "R$ 85.50",
                    qtde: "15",
                },
                {
                    id: Math.floor(Math.random() * 1000),
                    autor: " o cara",
                    dtLancamento: "10/02/2000",
                    edicao: "2º",
                    idioma: "ingles",
                    tipoCapa: "Dura",
                    paginas: "546",
                    ISBN10: "65465465465465465",
                    ISBN13: "9716976768687167",
                    largura: "15",
                    altura: "25",
                    profundidade: "8",
                    peso: "0.4",
                    valor: "R$ 85.50",
                    qtde: "15",
                },
            ],
        }
    }

    render() {
        return (
            <>
                <DBS.MainDiv>
                    <Paper elevation={3}>
                        <DBS.CustomHeader>
                            <DBS.HomeLogoWraper>
                                <DBS.HomeLogo onClick={this.props.goToHomePage}><h3>aqui vai ficar o header</h3>
                                </DBS.HomeLogo>
                            </DBS.HomeLogoWraper>
                            <DBS.HeaderLinks>
                            </DBS.HeaderLinks>
                        </DBS.CustomHeader>
                    </Paper>
                    <DBS.Mid>
                        <DashboardTabPanel
                            redCardTopText={"Title test"}
                            redCardMidText={"mid test"}
                            redCardBottomText={"bottom test"}
                            dataVendas={this.state.dataMock}
                            columnNames={this.state.columnNames}
                            rowsDataVendas={this.state.vendasGridMock}
                            rowsDataEstoque={this.state.estoqueGridMock}

                        />
                    </DBS.Mid>
                    <Paper elevation={3}>
                        <DBS.Footer>
                            <h3>aqui vai ficar o footer</h3>
                        </DBS.Footer>
                    </Paper>
                </DBS.MainDiv>
            </>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        goToHomePage: () => dispatch(push(routes.HomePage)),
    }
}

export default connect(null, mapDispatchToProps)(DashboardPage)