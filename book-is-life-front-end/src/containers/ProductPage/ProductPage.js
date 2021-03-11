import React, {Component} from "react";
import * as PPS from "./ProductPageStyles";
import {connect} from "react-redux";
import {push} from "connected-react-router";
import {routes} from '../Router';
import Paper from '@material-ui/core/Paper';
import ProductDetails from "../Components/ProductDetails/ProductDetails";
import HobbitCover from "../Images/hobbit.jpg"

class ProductPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {

    }

    handleFieldChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };


    render() {
        const textTest = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " +
            "Neque volutpat ac tincidunt vitae. Lorem ipsum dolor sit amet consectetur adipiscing elit. " +
            "Sed turpis tincidunt id aliquet. Tellus rutrum tellus pellentesque eu tincidunt tortor aliquam. " +
            "Lectus sit amet est placerat in. Nibh tellus molestie nunc non. Aenean vel elit scelerisque mauris. " +
            "Duis ut diam quam nulla porttitor massa id. Mi proin sed libero enim sed faucibus turpis in."

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
                        <ProductDetails
                            image={HobbitCover}
                            titulo={"The Hobbit"}
                            autor={"J. R. R. Tolkien"}
                            descricao={textTest}
                            editora={"HarperCollins"}
                            lancamento={"27 outubro 2011"}
                            edicao={"2"}
                            idioma={"Inglês"}
                            tipoCapa={"Comum"}
                            numeroPaginas={"400"}
                            isbn10={"0261103342"}
                            isbn13={"978-0261103344"}
                            largura={"12.5"}
                            altura={"2.2"}
                            profundidade={"19.5"}
                            peso={"0,6"}
                            valor={"41,99"}
                            frete={"21,00"}
                            qtdeItem={5}
                        />
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

const mapStateToProps = (state) => ({})

function mapDispatchToProps(dispatch) {
    return {
        goToHomePage: () => dispatch(push(routes.HomePage)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage)

