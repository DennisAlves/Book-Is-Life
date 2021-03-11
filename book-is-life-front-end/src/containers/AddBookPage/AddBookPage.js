import React, {Component} from "react";
import * as ABS from "./AddBookPageStyle";
import {connect} from "react-redux";
import {push} from "connected-react-router";
import {routes} from '../Router';
import Paper from '@material-ui/core/Paper';
import AddBookFields from "../Components/CadastroDeLivros/CadastroDeLivros"
import UploadButton from "../Components/UploadButton/UploadButton";
import noImage from "../Images/unnamed.png"
import Typography from "@material-ui/core/Typography";


class AddBookPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: noImage,
            titulo: "",
            autor: "",
            sinopse: "",
            editora: "",
            lancamento: "",
            edicao: "",
            idioma: "",
            tipoCapa: "",
            numeroPaginas: "",
            isbn10: "",
            isbn13: "",
            largura: "",
            altura: "",
            profundidade: "",
            peso: "",
            valor: "",
            qtde: "",
        };
        this.handleImageChange = this.handleImageChange.bind(this)
    }

    async componentDidMount() {

    }

    handleFieldChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleImageChange(event) {
        this.setState({
            image: URL.createObjectURL(event.target.files[0])
        })
    }


    render() {
        const {
            image,
            titulo,
            autor,
            sinopse,
            editora,
            lancamento,
            edicao,
            idioma,
            tipoCapa,
            numeroPaginas,
            isbn10,
            isbn13,
            largura,
            altura,
            profundidade,
            peso,
            valor,
            qtde,
        } = this.state

        return (
            <>
                <ABS.MainDiv>
                    <Paper elevation={3}>
                        <ABS.CustomHeader>
                            <ABS.HomeLogo onClick={this.props.goToHomePage}><h3>aqui vai ficar o header</h3>
                            </ABS.HomeLogo>
                        </ABS.CustomHeader>
                    </Paper>
                    <Typography style={{margin: 18}} variant="h4" color="textPrimary" component="div">
                        Cadastro de livro
                    </Typography>
                    <ABS.AddBookWrapper>
                        <ABS.AddBookPageWrapper>
                            <ABS.AddBookImageUploadWrapper>
                                <ABS.AddBookImageWrapper src={image}/>
                                <UploadButton onChange={this.handleImageChange}/>
                            </ABS.AddBookImageUploadWrapper>

                            <AddBookFields
                                handleFieldChange={this.handleFieldChange}
                                titulo={titulo}
                                autor={autor}
                                sinopse={sinopse}
                                editora={editora}
                                lancamento={lancamento}
                                edicao={edicao}
                                idioma={idioma}
                                tipoCapa={tipoCapa}
                                numeroPaginas={numeroPaginas}
                                isbn10={isbn10}
                                isbn13={isbn13}
                                largura={largura}
                                altura={altura}
                                profundidade={profundidade}
                                peso={peso}
                                valor={valor}
                                qtde={qtde}
                            />
                        </ABS.AddBookPageWrapper>
                    </ABS.AddBookWrapper>
                    <Paper elevation={3}>
                        <ABS.Footer>
                            <h3>aqui vai ficar o footer</h3>
                        </ABS.Footer>
                    </Paper>
                </ABS.MainDiv>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddBookPage)

