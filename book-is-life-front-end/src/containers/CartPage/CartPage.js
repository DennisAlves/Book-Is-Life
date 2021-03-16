import React, {Component} from "react";
import * as CPS from "./CartPageStyles";
import {connect} from "react-redux";
import {push} from "connected-react-router";
import {routes} from '../Router';
import Paper from '@material-ui/core/Paper';
import CheckOutConfirm from "../Components/CheckOutConfirm/CheckOutConfirm"
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Checkbox from "@material-ui/core/Checkbox";
import CardMedia from "@material-ui/core/CardMedia";
import * as CIS from "../Components/CartItem/CartItemStyle";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from '@material-ui/core/MenuItem';
import Hobbit from "../Images/hobbit.jpg"
import SemImagem from "../Images/unnamed.png"


class CartPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itens: [
                {
                    id: "teste",
                    imagem: Hobbit,
                    titulo: "teste",
                    disponibilidade: "Em estoque",
                    tipoCapa: "Capa comum",
                    qtdeEstoque: 5,
                    qtde: 2,
                    valor: 10.50,
                    checked: true,
                },
                {
                    id: "teste",
                    imagem: SemImagem,
                    titulo: "teste",
                    disponibilidade: "Em estoque",
                    tipoCapa: "Capa comum",
                    qtdeEstoque: 5,
                    qtde: 1,
                    valor: 10.50,
                    checked: true,
                },
                {
                    id: "teste",
                    imagem: SemImagem,
                    titulo: "teste",
                    disponibilidade: "Em estoque",
                    tipoCapa: "Capa comum",
                    qtdeEstoque: 5,
                    qtde: 3,
                    valor: 10.50,
                    checked: true,
                },
                {
                    id: "teste",
                    imagem: SemImagem,
                    titulo: "teste",
                    disponibilidade: "Em estoque",
                    tipoCapa: "Capa comum",
                    qtdeEstoque: 4,
                    qtde: 1,
                    valor: 10.50,
                    checked: true,
                },
                {
                    id: "teste",
                    imagem: SemImagem,
                    titulo: "teste",
                    disponibilidade: "Em estoque",
                    tipoCapa: "Capa comum",
                    qtdeEstoque: 5,
                    qtde: 4,
                    valor: 10.50,
                    checked: true,
                },
            ],
            valorTotal: 0,
            qtdeTotal: 0,
        };
    }

    async componentDidMount() {
        this.handleChangeTotal()
        this.handleChangeQtdeTotal()
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
        this.handleChangeTotal()
        this.handleChangeQtdeTotal()
    }

    handleChangeTotal() {
        let total = 0.00
        this.state.itens.forEach(item => {
            if (item.checked) {
                total = total + item.valor * item.qtde;
            }
        })
        this.setState({valorTotal: total});
    }

    handleChangeQtdeTotal() {
        let qtde = 0
        this.state.itens.forEach(item => {
            if (item.checked) {
                qtde = qtde + item.qtde;
            }
        })
        this.setState({qtdeTotal: qtde});
    }


    handleChangeQtde = (e, index) => {
        let stateCopy = this.state.itens
        stateCopy[index].qtde = e.target.value;
        this.setState({itens: stateCopy});
        this.handleChangeTotal()
        this.handleChangeQtdeTotal()
    }

    menuItem = (qtdeEstoque) => {
        let arr = [];
        for (let i = 1; i <= qtdeEstoque; i++) {
            arr.push(<MenuItem style={{fontSize: 15}} key={i} value={i}> {i} </MenuItem>)
        }
        return arr;
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
                    <CPS.CartPageWrapper>
                        <CPS.CartPageItensWrapper>
                            <CPS.CartPageItensTopWrapper>
                                <Typography color="textPrimary" variant="h5">
                                    Carrinho de compras
                                </Typography>
                                <Typography color="textPrimary" variant="caption">
                                    Selecionar todos os itens
                                </Typography>
                                <CPS.CartPageItensPriceWrapper>
                                    <Typography color="textPrimary" variant="caption">
                                        Preço
                                    </Typography>
                                </CPS.CartPageItensPriceWrapper>
                            </CPS.CartPageItensTopWrapper>
                            <Divider orientation="horizontal" variant="middle"/>
                            {this.state.itens && this.state.itens.map((itens, index) => {
                                return (
                                    <div key={Math.random() * (index + 1)}>
                                        <CPS.CartPageItenWrapper key={Math.random() * (index + 1)}>
                                            <Checkbox
                                                key={Math.random() * (index + 1)}
                                                style={{backgroundColor: 'transparent'}}
                                                checked={itens.checked}
                                                disableRipple
                                                onClick={() => {
                                                    this.handleChangeChecked(index)
                                                }}
                                                inputProps={{'aria-label': 'primary checkbox'}}
                                            />
                                            <CIS.CartItemWrapper>
                                                <CardMedia
                                                    style={{
                                                        objectFit: 'contain',
                                                        height: 160,
                                                        width: 100,
                                                        marginRight: 15
                                                    }}
                                                    component="img"
                                                    alt={""}
                                                    image={itens.imagem}
                                                />

                                                <CIS.CartItemMidWrapper>
                                                    <CIS.CartItemTopWrapper>
                                                        <Typography gutterBottom variant="body2" component="p">
                                                            {itens.titulo}
                                                        </Typography>
                                                        <CIS.CartItemPrice>
                                                            <Typography gutterBottom variant="body2" component="p">
                                                                R$ {parseFloat(itens.valor).toFixed(2)}
                                                            </Typography>
                                                        </CIS.CartItemPrice>
                                                    </CIS.CartItemTopWrapper>
                                                    <Typography variant="caption" component="p">
                                                        {itens.disponibilidade}
                                                    </Typography>
                                                    <Typography variant="caption" component="p">
                                                        {itens.tipoCapa}
                                                    </Typography>
                                                    <FormControl size="small">
                                                        <InputLabel>Qtde</InputLabel>
                                                        <Select
                                                            value={itens.qtde}
                                                            onChange={(e) => {
                                                                this.handleChangeQtde(e, index)
                                                            }}
                                                            autoWidth
                                                        >
                                                            {this.menuItem(itens.qtdeEstoque)}
                                                        </Select>
                                                    </FormControl>
                                                    <CIS.CartItemOptionsWrapper>
                                                        <Typography variant="caption" component="p">
                                                            Excluir
                                                        </Typography>
                                                        <Divider orientation="vertical" variant="middle" flexItem/>
                                                        <Typography variant="caption" component="p">
                                                            Salvar para mais tarde
                                                        </Typography>
                                                    </CIS.CartItemOptionsWrapper>
                                                </CIS.CartItemMidWrapper>
                                            </CIS.CartItemWrapper>
                                        </CPS.CartPageItenWrapper>
                                        <Divider orientation="horizontal" variant="middle"/>
                                    </div>
                                )
                            })}

                            <Divider orientation="horizontal" variant="middle"/>
                            <CPS.CartPageItensBottonWrapper>
                                <Typography color="textPrimary" variant="body1">
                                    Sub Total({this.state.qtdeTotal} itens):
                                    R$ {parseFloat(this.state.valorTotal).toFixed(2)}
                                </Typography>
                            </CPS.CartPageItensBottonWrapper>
                        </CPS.CartPageItensWrapper>
                        <CPS.CartPageConfirmWrapper>
                            <CheckOutConfirm
                                qtdeTotal={this.state.qtdeTotal}
                                valorTotal={this.state.valorTotal}
                                buttomText={"Fazer Pedido"}
                            />
                        </CPS.CartPageConfirmWrapper>
                    </CPS.CartPageWrapper>

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

export default connect(mapStateToProps, mapDispatchToProps)(CartPage)

