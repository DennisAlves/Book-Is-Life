import React, {Component} from "react";
import * as UPS from "./UserPageStyles";
import {connect} from "react-redux";
import {push} from "connected-react-router";
import {routes} from '../Router';
import Paper from '@material-ui/core/Paper';
import {getClienteDetails} from "../../Actions/index"
import AbasDados from "../Components/DadosCliente/AbasDados";

class UserPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clienteData: "",
            genero: "",
            abasDados: false,
        };
    }

    async componentDidMount() {
        const {getClienteDetails, clienteId} = this.props
        await getClienteDetails(clienteId)
        let data = this.props.clienteDetails
        this.setState({clienteData: data})
        this.setState({genero: this.state.clienteData.genero})


    }

    handleFieldChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    editar = () =>{
        console.log("foi")
    }


    render() {

        return (
            <>
                <UPS.MainDiv>
                    <Paper elevation={3}>
                        <UPS.CustomHeader>
                            <UPS.HomeLogo onClick={this.props.goToHomePage}><h3>aqui vai ficar o header</h3>
                            </UPS.HomeLogo>
                        </UPS.CustomHeader>
                    </Paper>
                    <UPS.UserPageWrapper>

                        <AbasDados
                                   editar={this.editar}
                                   data={this.state.clienteData}
                                   clienteNome={this.state.clienteData.nome}
                                   clienteEmail={this.state.clienteData.email}
                                   clienteDtNascimento={this.state.clienteData.dtNascimento}
                                   clienteGenero={this.state.genero.name}
                                   clienteDataEndereco={this.state.clienteData.enderecos}
                                   clienteDataTelefone={this.state.clienteData.telefones}
                                   clienteDataDocumento={this.state.clienteData.documentos}
                                   clienteDataCartao={this.state.clienteData.cartoes}
                        />

                    </UPS.UserPageWrapper>
                </UPS.MainDiv>
                <Paper elevation={3}>
                    <UPS.Footer>
                        <h3>aqui vai ficar o footer</h3>
                    </UPS.Footer>
                </Paper>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    clienteDetails: state.cliente.clienteDetails,
    clienteId: state.cliente.clienteId,
})

function mapDispatchToProps(dispatch) {
    return {
        goToHomePage: () => dispatch(push(routes.HomePage)),
        getClienteDetails: (clienteId) => dispatch(getClienteDetails(clienteId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage)

