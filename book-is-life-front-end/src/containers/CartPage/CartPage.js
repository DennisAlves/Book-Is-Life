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
import {setCarrinho, setCarrinhoVenda, setEstoque} from "../../Actions";


class CartPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itens: "",
            valorTotal: 0,
            qtdeTotal: 0,
            carrinhoVazio: true,
            frete: 21.00,
            freteTotal: 0,
            disableButtom: true,
        };
    }

    async componentDidMount() {

        const items = []
        const {estoque, carrinho} = this.props
        if (carrinho.length > 0) {
            estoque.forEach(item => {
                for (let i = 0; i < carrinho.length; i++) {
                    if (item.id === carrinho[i].id) {
                        Object.assign(item, {checked: false})
                        Object.assign(item, {qtdeCarrinho: carrinho[i].qtde})
                        items.push(item)
                    }
                }
            })
            this.setState({carrinhoVazio: false})
            this.handleChangeTotal()
            this.handleChangeQtdeTotal()
            this.setState({itens: items})
        }


    }

    handleFieldChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });

    };
    handleChangeChecked = (index) => {
        let stateCopy = this.state.itens
        stateCopy[index].checked = !stateCopy[index].checked;
        if (stateCopy[index].checked) {
            this.setState({disableButtom: false})
        } else {
            this.setState({disableButtom: true})
        }
        this.setState({itens: stateCopy});
        this.handleChangeTotal()
        this.handleChangeQtdeTotal()
    }

    handleChangeTotal() {
        let total = 0
        let qtdeCarrinho = 0

        if (this.state.itens.length > 0) {

            this.state.itens.forEach(item => {

                if (item.checked) {
                    let frete = 0
                    qtdeCarrinho += item.qtdeCarrinho
                    for (let i = 0; i <= qtdeCarrinho; i += 5) {
                        frete += this.state.frete
                    }
                    this.setState({freteTotal: frete})
                    total = total + (((item.custo + (item.custo * item.precificacao)) * item.qtdeCarrinho));
                }
            })
            this.setState({valorTotal: total});
        }

    }

    handleChangeQtdeTotal() {
        let qtde = 0
        if (this.state.itens.length > 0) {
            this.state.itens.forEach(item => {

                if (item.checked) {
                    qtde += item.qtdeCarrinho;
                }
            })
            this.setState({qtdeTotal: qtde});
        }

    }

    handleClickFazerPedido = () => {
        let itemsCarrinhoVenda = []
        if (this.state.itens.length > 0) {
            this.state.itens.forEach(item => {
                if (item.checked) {
                    itemsCarrinhoVenda.push(item)
                }
            })
            console.log(itemsCarrinhoVenda)
            this.props.setCarrinhoVenda(itemsCarrinhoVenda)
            this.props.goToCheckOutPage()

        }
    }
    handleChangeQtde = (e, id) => {
        const {carrinho, setCarrinho,estoque} = this.props;
        const copyEstoque = estoque
        const itens = this.state.itens
        let carrinhoCopy = carrinho
        let prevQtdeCarrinho = ""
        carrinhoCopy.forEach(item => {
            if (item.id === id) {
                item.qtde = e.target.value;
            }
        })
        itens.forEach((item => {
            if (item.id === id) {
                prevQtdeCarrinho = item.qtdeCarrinho
                item.qtdeCarrinho = e.target.value;

                if (item.qtde > item.qtdeCarrinho) {
                    if ((item.qtdeCarrinho - item.qtde) < 0) {
                        item.qtde = prevQtdeCarrinho + item.qtde
                        item.qtde -= item.qtdeCarrinho
                    } else {
                        item.qtde -= item.qtdeCarrinho
                        console.log("maior " + item.qtde)
                    }
                }
                else{
                    if ((item.qtde - item.qtdeCarrinho) <= 0) {
                        item.qtde = prevQtdeCarrinho + item.qtde
                        item.qtde -= item.qtdeCarrinho
                    } else {
                        item.qtde += item.qtdeCarrinho
                        console.log("maior " + item.qtde)
                    }
                }
            }
        }))
        this.setState({itens: itens})
        setCarrinho(carrinhoCopy)
        for(let i = 0; i < copyEstoque.length; i++) {
            for(let j = 0;j < itens.length; j++){
                if(copyEstoque[i].id === itens[j].id){
                    copyEstoque[i] = itens[j]
                }
            }
        }
        this.props.setEstoque(copyEstoque)
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
    removeItem = (id) => {
        const copyEstoque = this.props.estoque
        let copyItems = this.state.itens.filter(function (item) {
            return item.id !== id
        })
        let copyCarrinho = this.props.carrinho.filter(function (item) {
            return item.id !== id
        })
        this.props.setCarrinho(copyCarrinho)
        copyEstoque.forEach((item) =>{
            if(item.id === id){
                item.qtde += item.qtdeCarrinho
                item.qtdeCarrinho = 0
            }
        })
        this.props.setEstoque(copyEstoque)
        this.setState({itens: copyItems})
        if (copyCarrinho.length === 0) {
            this.setState({carrinhoVazio: true})
        }
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
                    {this.state.carrinhoVazio ?
                        <CPS.CartPageWrapper>
                            <Typography color="textPrimary" variant="h3">
                                Sem itens no Carrinho!!
                            </Typography>
                        </CPS.CartPageWrapper>
                        :
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
                                                        image={itens.image}
                                                    />

                                                    <CIS.CartItemMidWrapper>
                                                        <CIS.CartItemTopWrapper>
                                                            <Typography gutterBottom variant="body2" component="p">
                                                                {itens.titulo}
                                                            </Typography>
                                                            <CIS.CartItemPrice>
                                                                <Typography gutterBottom variant="body2" component="p">
                                                                    R$ {(itens.custo + (itens.custo * itens.precificacao)).toFixed(2)}
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
                                                                value={itens.qtdeCarrinho}
                                                                onChange={(e) => {
                                                                    this.handleChangeQtde(e, itens.id)
                                                                }}
                                                                autoWidth
                                                            >
                                                                {this.menuItem((itens.qtde + itens.qtdeCarrinho))}
                                                            </Select>
                                                        </FormControl>
                                                        <CIS.CartItemOptionsWrapper>
                                                            <Typography variant="caption" component="p" onClick={() => {
                                                                this.removeItem(itens.id)
                                                            }}>
                                                                Excluir
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
                                        Sub Total({parseInt(this.state.qtdeTotal)} itens):
                                        R$ {parseFloat(this.state.valorTotal).toFixed(2)}
                                    </Typography>
                                </CPS.CartPageItensBottonWrapper>
                            </CPS.CartPageItensWrapper>
                            <CPS.CartPageConfirmWrapper>
                                {this.state.qtdeTotal > 0 ?
                                    <CheckOutConfirm
                                        qtdeTotal={parseInt(this.state.qtdeTotal)}
                                        valorTotal={this.state.valorTotal}
                                        frete={this.state.freteTotal}
                                        buttomText={"Fazer Pedido"}
                                        salvar={this.handleClickFazerPedido}
                                    />
                                    :
                                    <CheckOutConfirm
                                        qtdeTotal={parseInt(this.state.qtdeTotal)}
                                        valorTotal={this.state.valorTotal}
                                        buttomText={"Fazer Pedido"}
                                        disableButtom={this.state.disableButtom}
                                    />
                                }
                            </CPS.CartPageConfirmWrapper>
                        </CPS.CartPageWrapper>
                    }

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
    carrinho: state.vendas.carrinho,
    carrinhoVenda: state.vendas.carrinhoVenda,
})

function mapDispatchToProps(dispatch) {
    return {
        goToHomePage: () => dispatch(push(routes.HomePage)),
        goToCheckOutPage: () => dispatch(push(routes.CheckOutPage)),
        setCarrinho: (carrinho) => dispatch(setCarrinho(carrinho)),
        setCarrinhoVenda: (carrinhoVenda) => dispatch(setCarrinhoVenda(carrinhoVenda)),
        setEstoque: (estoque) => dispatch(setEstoque(estoque)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPage)

