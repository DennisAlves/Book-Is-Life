import React, {Component} from "react";
import * as HPS from "./HomePageStyles";
import {connect} from "react-redux";
import {push} from "connected-react-router";
import {routes} from '../Router';
import Paper from '@material-ui/core/Paper';
import BookSimple from "../Components/Book Simple/BookSimple";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {setCarrinho, setEstoque, setSelectedProductIDAndPush} from "../../Actions/index"
import Badge from '@material-ui/core/Badge';
import BookDataGenerator from "../Components/DataGenerator/BookDataGenerator";
import semImagem from "../Images/unnamed.png"

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            estoqueData: "",
            carrinhoData: "",
            carrinhoQtde: "",
        };
    }

    componentDidMount() {
        const {estoque, carrinho} = this.props
        let copyEstoque = estoque
        let Qtde = 0
        carrinho.forEach((item) => {
            Qtde = Qtde + item.qtde
        })
        copyEstoque = copyEstoque.concat(BookDataGenerator(semImagem))
        this.props.setEstoque(copyEstoque)
        this.setState({estoqueData: copyEstoque, carrinhoData: carrinho, carrinhoQtde: Qtde})
    }

    addToCart = (id) => {
        const {estoque, carrinho} = this.props
        let copyCarrinho = carrinho;
        let copyEstoque = estoque;
        let qtde = 0
        let itemExist = false

        copyCarrinho.forEach(item => {
            if (item.id === id) {
                itemExist = true
            }
        })
        if (itemExist) {
            copyCarrinho.forEach(item => {
                if (item.id === id) {
                    item.qtde++
                    copyEstoque.forEach(item => {
                        if (item.id === id) {
                            item.qtde --
                        }
                    })
                }
            })
        } else {
            copyCarrinho.push({id: id, qtde: 1})
            copyEstoque.forEach(item => {
                if (item.id === id) {
                    item.qtde --
                }
            })
        }
        copyCarrinho.forEach(item => {
            qtde = qtde + item.qtde
        })
        this.setState({carrinhoQtde: qtde})
        this.props.setCarrinho(copyCarrinho)
    }
    validarAtivo = (index) =>{
        if(this.props.estoque[index].qtde === 0){
            return false
        }
        else{
            return this.props.estoque[index].ativo
        }
    }

    render() {
        const {estoqueData} = this.state
        return (
            <>
                <HPS.MainDiv>
                    <Paper elevation={3}>
                        <HPS.CustomHeader>
                            <HPS.HomeLogoWraper>
                                <HPS.HomeLogo onClick={this.props.goToHomePage}><h3>aqui vai ficar o header</h3>
                                </HPS.HomeLogo>
                            </HPS.HomeLogoWraper>
                            <HPS.HeaderLinks>
                                <HPS.HeaderLink onClick={this.props.goToLoginPage}> Entrar </HPS.HeaderLink>
                                <HPS.HeaderLink> Devoluções e Pedidos </HPS.HeaderLink>
                                <HPS.HeaderLink> <Badge badgeContent={this.state.carrinhoQtde}
                                                        onClick={this.props.goToCartPage} color="secondary">
                                    <ShoppingCartIcon/>
                                </Badge></HPS.HeaderLink>
                            </HPS.HeaderLinks>
                        </HPS.CustomHeader>
                    </Paper>

                    <HPS.BodyTitle>
                        aqui alguma coisa como titulo
                    </HPS.BodyTitle>
                    <HPS.Mid>
                        <HPS.HomePageProductWrapper>
                            {estoqueData && estoqueData.map((item, index) => {

                                return (
                                    <BookSimple key={index}
                                                image={item.image}
                                                title={item.titulo}
                                                alt={item.titulo}
                                                bookTitle={item.titulo}
                                                author={item.autor}
                                                ativo={this.validarAtivo(index)}
                                                value={(item.custo + (item.custo * item.precificacao)).toFixed(2)}
                                                onClickProduct={() => {
                                                    this.props.goToProductPage({productId: item.id})
                                                }}
                                                onClickButtom={() => {
                                                    this.addToCart(item.id)
                                                }}
                                    />
                                )
                            })}
                        </HPS.HomePageProductWrapper>
                    </HPS.Mid>


                    <Paper elevation={3}>
                        <HPS.Footer>
                            <h3>aqui vai ficar o footer</h3>
                        </HPS.Footer>
                    </Paper>
                </HPS.MainDiv>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    estoque: state.estoque.estoque,
    carrinho: state.vendas.carrinho,
})

function mapDispatchToProps(dispatch) {
    return {
        goToHomePage: () => dispatch(push(routes.HomePage)),
        goToLoginPage: () => dispatch(push(routes.LoginPage)),
        goToCartPage: () => dispatch(push(routes.CartPage)),
        goToProductPage: (productId) => dispatch(setSelectedProductIDAndPush(productId)),
        setCarrinho: (carrinho) => dispatch(setCarrinho(carrinho)),
        setEstoque: (estoque)=> dispatch(setEstoque(estoque)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)