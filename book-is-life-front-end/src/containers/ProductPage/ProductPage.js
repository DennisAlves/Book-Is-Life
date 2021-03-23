import React, {Component} from "react";
import * as PPS from "./ProductPageStyles";
import {connect} from "react-redux";
import {push} from "connected-react-router";
import {routes} from '../Router';
import Paper from '@material-ui/core/Paper';
import * as PD from "../Components/ProductDetails/ProductDetailsStyles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import MenuItem from '@material-ui/core/MenuItem';
import {setCarrinho,setEstoque} from "../../Actions";
import {withStyles} from "@material-ui/core/styles";

const RedTextTypography = withStyles({
    root: {
        color: "#ff1b1c"
    }
})(Typography);
const GreenTextTypography = withStyles({
    root: {
        color: "#00CC66"
    }
})(Typography);

class ProductPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: "",
            qtdeCarrinho: "",
            qtde: "",
            frete: 21.00,
        };
    }

    async componentDidMount() {
        let itemData = ""
        let qtdeCarrinho = ""
        this.props.estoque.forEach(item => {
            if (item.id === this.props.product.productId) {
                itemData = item
            }
        })
        this.props.carrinho.forEach(item => {
            if (item.id === this.props.product.productId) {
                qtdeCarrinho = item.qtde
            }
        })
        this.setState({item: itemData, qtdeCarrinho: qtdeCarrinho})
    };

    menuItem = () => {
        let arr = [];

        for (let i = 1; i <= (this.state.item.qtde); i++) {
            arr.push(<MenuItem style={{justifyContent: "Center"}} key={i} value={i}> {i} </MenuItem>)
        }
        return arr;
    };
    handleSelectChange = event => {
        let qtdeItems = event.target.value
        this.setState({qtde: qtdeItems})


    };

    handleAddItem = () => {
        let copyEstoque = this.props.estoque
        let carrinho = this.props.carrinho;
        let qtde = this.state.qtde
        let itemExist = false

        carrinho.forEach(item => {
            if (item.id === this.props.product.productId) {
                itemExist = true
            }
        })
        if (itemExist) {
            carrinho.forEach(item => {
                if (item.id === this.props.product.productId) {
                    item.qtde += qtde
                    copyEstoque.forEach(item => {
                        if(item.id === this.props.product.productId){
                            item.qtde -= qtde
                        }
                    })

                }
            })
        } else {
            carrinho.push({id: this.props.product.productId, qtde: qtde})
            copyEstoque.forEach(item => {
                if(item.id === this.props.product.productId){
                    item.qtde -= qtde
                }
            })
        }
        this.props.setEstoque(copyEstoque)
        this.props.setCarrinho(carrinho)
        this.props.goToHomePage()
    }
    handleFieldChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    validarAtivo = () =>{
        if(this.state.item.qtde === 0){
            return false
        }
        else{
            return this.state.item.ativo
        }
    }

    render() {
        const {qtde, item, frete} = this.state
        return (
            <>
                <PPS.MainDiv>
                    <Paper elevation={3}>
                        <PPS.CustomHeader>
                            <PPS.HomeLogo onClick={this.props.goToHomePage}><h3>aqui vai ficar o header</h3>
                            </PPS.HomeLogo>
                        </PPS.CustomHeader>
                    </Paper>
                    <PPS.ProductPageWrapper>
                        <PD.ProductDetailsMainDiv>
                            <PD.ProductDetailsImageDiv src={item.image}/>
                            <PD.ProductDetails>
                                <PD.ProductDetailsContentDiv>
                                    <Typography variant="h3" color="textPrimary" gutterBottom>
                                        {item.titulo}
                                    </Typography>
                                    <Typography variant="h6" color="textPrimary" gutterBottom>
                                        Autor: {item.autor}
                                    </Typography>

                                    <Typography variant="subtitle1" color="textPrimary" style={{marginTop: 15}}
                                                align="left"
                                                gutterBottom>
                                        Descrição: {item.descricao}
                                    </Typography>
                                </PD.ProductDetailsContentDiv>

                                <PD.ProductDetailsInfoDiv>
                                    <Typography variant="subtitle1" color="textPrimary" align="left" gutterBottom>
                                        Editora : {item.editora}
                                    </Typography>
                                    <Typography variant="subtitle1" color="textPrimary" align="left" gutterBottom>
                                        Lançamento : {item.dtLancamento}
                                    </Typography>
                                    <Typography variant="subtitle1" color="textPrimary" align="left" gutterBottom>
                                        Edição : {item.edicao}
                                    </Typography>
                                    <Typography variant="subtitle1" color="textPrimary" align="left" gutterBottom>
                                        Idioma : {item.idioma}
                                    </Typography>
                                    <Typography variant="subtitle1" color="textPrimary" align="left" gutterBottom>
                                        Capa {item.tipoCapa} : {item.paginas} páginas
                                    </Typography>
                                    <Typography variant="subtitle1" color="textPrimary" align="left" gutterBottom>
                                        ISBN-10 : {item.ISBN10}
                                    </Typography>
                                    <Typography variant="subtitle1" color="textPrimary" align="left" gutterBottom>
                                        ISBN-13 : {item.ISBN13}
                                    </Typography>
                                    <Typography variant="subtitle1" color="textPrimary" align="left" gutterBottom>
                                        Dimensões : Largura: {item.largura} cm Altura: {item.altura} cm
                                        Profundidade: {item.profundidade} cm
                                    </Typography>
                                    <Typography variant="subtitle1" color="textPrimary" align="left" gutterBottom>
                                        Peso: {item.peso}Kg
                                    </Typography>
                                </PD.ProductDetailsInfoDiv>
                            </PD.ProductDetails>
                            <PD.ProductDetailsCardDiv>
                                <Card>
                                    <CardContent style={{width: 250}}>
                                        <Typography color="textSecondary" gutterBottom>
                                            Valor unitario:
                                            R${(item.custo + (item.custo * item.precificacao)).toFixed(2)}
                                        </Typography>
                                        <Typography variant="h5" component="h2">
                                        </Typography>

                                            {this.validarAtivo() ?
                                                <GreenTextTypography>
                                                    Em Estoque
                                                </GreenTextTypography>
                                                :
                                                <RedTextTypography>
                                                    Sem Estoque
                                                </RedTextTypography>

                                            }

                                        <Typography variant="subtitle1" color="textPrimary" gutterBottom>
                                            Frete: R${frete}
                                        </Typography>

                                        {qtde > 0 ?
                                            <Typography color="textSecondary" gutterBottom>
                                                Total:
                                                R${(((item.custo + (item.custo * item.precificacao)) * qtde) + frete).toFixed(2)}
                                            </Typography>
                                            :
                                            ""
                                        }
                                        <FormControl variant="outlined" style={{minWidth: 140}}>
                                            <InputLabel>Quantidade</InputLabel>
                                            <Select
                                                disabled={!this.validarAtivo()}
                                                value={qtde}
                                                onChange={this.handleSelectChange}
                                                label="quantidade"
                                            >
                                                {this.menuItem()}

                                            </Select>
                                        </FormControl>

                                    </CardContent>
                                    <CardActions align="center" style={{justifyContent: "Center"}}>
                                        <Button color="primary" onClick={this.handleAddItem} disabled={!this.validarAtivo()} size="small">Adicionar
                                            ao Carrinho</Button>
                                    </CardActions>
                                </Card>
                            </PD.ProductDetailsCardDiv>
                        </PD.ProductDetailsMainDiv>
                    </PPS.ProductPageWrapper>

                    <Paper elevation={3}>
                        <PPS.Footer>
                            <h3>aqui vai ficar o footer</h3>
                        </PPS.Footer>
                    </Paper>
                </PPS.MainDiv>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    estoque: state.estoque.estoque,
    product: state.estoque.productId,
    carrinho: state.vendas.carrinho,
})

function mapDispatchToProps(dispatch) {
    return {
        goToHomePage: () => dispatch(push(routes.HomePage)),
        setCarrinho: (carrinho) => dispatch(setCarrinho(carrinho)),
        setEstoque: (estoque)=> dispatch(setEstoque(estoque)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage)

