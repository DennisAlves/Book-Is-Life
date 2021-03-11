import React, {Component} from "react";
import * as CLPS from "./ClienteListPageStyles";
import {connect} from "react-redux";
import {push} from "connected-react-router";
import {routes} from '../Router';
import Paper from '@material-ui/core/Paper';
import {getCliente} from "../../Actions";
import TableGrid from "../Components/TableGrid/TableGrid";


class ClienteListPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        this.props.getCliente();
    }


    handleFieldChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleDataGrid() {
        let rows =[];
        if (this.props.clientes !== undefined) {

            this.props.clientes.forEach(data => {
                const cliente = {
                    id: data.id,
                    dtCadastro:data.dtCadastro,
                    nome: data.nome,
                    dtNascimento: data.dtNascimento,
                    genero: data.genero.name,
                    email: data.email,
                    senha: data.senha,
                    tipoCliente: data.tipoCliente,
                    ativo: data.ativo,
                    qtdeEnderecos: data.enderecos.length,
                    qtdeTelefone: data.telefones.length,
                    qtdeCartoes: data.cartoes.length,
                    qtdeDocumentos: data.documentos.length,
                }
                if(cliente.ativo === 1){
                    cliente.ativo = "Sim"
                }
                else {
                    cliente.ativo = "Não"
                }
                rows.push(cliente)
            })
        }
        return rows
    }

    render() {

        const rows = this.handleDataGrid()

        return (
            <>
                <CLPS.MainDiv>
                    <Paper elevation={3}>
                        <CLPS.CustomHeader>
                            <CLPS.HomeLogo onClick={this.props.goToHomePage}><h3>aqui vai ficar o header</h3>
                            </CLPS.HomeLogo>
                        </CLPS.CustomHeader>
                    </Paper>
                    <CLPS.ClienteListPagePageWrapper>
                        <TableGrid rows={rows}/>
                    </CLPS.ClienteListPagePageWrapper>
                </CLPS.MainDiv>
                <Paper elevation={3}>
                    <CLPS.Footer>
                        <h3>aqui vai ficar o footer</h3>
                    </CLPS.Footer>
                </Paper>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    clientes: state.cliente.clientes,
})

function mapDispatchToProps(dispatch) {
    return {
        goToHomePage: () => dispatch(push(routes.HomePage)),
        getCliente: () => dispatch(getCliente()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClienteListPage)
