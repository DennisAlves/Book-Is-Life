import React, {Component} from "react";
import * as CPS from "./CheckoutPageStyles";
import {connect} from "react-redux";
import {push} from "connected-react-router";
import {routes} from '../Router';
import Paper from '@material-ui/core/Paper';
import CheckOutItem from "../Components/CheckOutItem/CheckOutItem"
import CheckOutConfirm from "../Components/CheckOutConfirm/CheckOutConfirm"
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Checkbox from "@material-ui/core/Checkbox";


class CheckoutPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itens: [
                {
                    id: "teste",
                    titulo: "teste",
                    disponibilidade: "Em estoque",
                    tipoCapa: "Capa comum",
                    qtdeItem: 5,
                    valor: "10.50",
                    checked: true,
                }
            ],
        };
    }

    async componentDidMount() {

    }

    handleFieldChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    handleChangeChecked = (index) => {
        let stateCopy = this.state.itens
        stateCopy[index].checked = !stateCopy[index].checked;
        this.setState({itens: stateCopy});
    }


    render() {

        return (
            <>
                <CPS.MainDiv>
                    <Paper elevation={3}>
                        <CPS.CustomHeader>
                            <CPS.HomeLogo onClick={this.props.goToHomePage}><h3>aqui vai ficar o header</h3>
                            </CPS.HomeLogo>
                        </CPS.CustomHeader>
                    </Paper>
                    <CPS.CheckOutWrapper>
                        <CPS.CheckOutItensWrapper>
                            <CPS.CheckOutItensTopWrapper>
                                <Typography color="textPrimary" variant="h5">
                                    Carrinho de compras
                                </Typography>
                                <Typography color="textPrimary" variant="caption">
                                    Selecionar todos os itens
                                </Typography>
                                <CPS.CheckOutItensPriceWrapper>
                                    <Typography color="textPrimary" variant="caption">
                                        Preço
                                    </Typography>
                                </CPS.CheckOutItensPriceWrapper>
                            </CPS.CheckOutItensTopWrapper>
                            <Divider orientation="horizontal" variant="middle"/>
                            <CPS.CheckOutItenWrapper>

                                <Checkbox
                                    style={{backgroundColor: 'transparent'}}
                                    checked={this.state.itens[0].checked}
                                    disableRipple
                                    onClick={()=>{this.handleChangeChecked(0)}}
                                    inputProps={{'aria-label': 'primary checkbox'}}
                                />
                                <CheckOutItem
                                    titulo={this.state.itens[0].title}
                                    disponibilidade={this.state.itens[0].disponibilidade}
                                    tipoCapa={this.state.itens[0].tipoCapa}
                                    qtdeItem={this.state.itens[0].qtdeItem}
                                    valor={this.state.itens[0].valor}
                                />
                            </CPS.CheckOutItenWrapper>
                            <Divider orientation="horizontal" variant="middle"/>
                            <CPS.CheckOutItensBottonWrapper>
                                <Typography color="textPrimary" variant="body1">
                                    Sub Total: R$
                                </Typography>
                            </CPS.CheckOutItensBottonWrapper>
                        </CPS.CheckOutItensWrapper>
                        <CPS.CheckOutConfirmWrapper>
                            <CheckOutConfirm/>
                        </CPS.CheckOutConfirmWrapper>
                    </CPS.CheckOutWrapper>

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

const mapStateToProps = (state) => ({})

function mapDispatchToProps(dispatch) {
    return {
        goToHomePage: () => dispatch(push(routes.HomePage)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage)

