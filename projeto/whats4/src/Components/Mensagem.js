import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'



const Main = styled.div`
    border: 1px solid black;
    width: 60%;
    height: 100vh;
    margin: auto;
    display:flex;
    flex-direction: column-reverse;
    
`
const LogContainer = styled.div`
    margin: 10px;

`

const EntradaDeMensagem = styled.input`
    width: 70%;
`

const EntradaDeNome = styled.input`
    width: 20%;
`

const Botao = styled.button`

`

const ContainerEntrada = styled.div`
    
    width: 100%;
   
    display: flex;
    flex-direction: row;
    
`

class Mensagem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            usuario: "",
            mensagem: "",
            log: []
        }
    }

    onChangeInputUsuario = event => {
        this.setState({ usuario: event.target.value });
    };
    onChangeInputMensagem = event => {
        this.setState({ mensagem: event.target.value });
    };

    mostrarLog = () => {
        this.state.log.map(element => {
            return (
                console.log(element.usuario + " " + element.mensagem)
            )
        });
    }

    onClickEnviar = () => {
        this.logMensagem();
        this.setState({
            mensagem: ""
        })
    }

    logMensagem = () => {
        const newLog = {
            usuario: this.state.usuario,
            mensagem: this.state.mensagem
        }
        const newLogList = [...this.state.log, newLog];
        this.setState({
            log: newLogList,
            mensagem: "",
            newLog: false
        })
    }

    render() {

        this.mostrarLog();
        return (

            <Main>
               
                <ContainerEntrada>
                    
                        <EntradaDeNome
                            type="text"
                            className="nome-usuario"
                            placeholder="Nome"
                            onChange={this.onChangeInputUsuario}
                        />
                        <EntradaDeMensagem
                            type="text"
                            className="mensagem"
                            onChange={this.onChangeInputMensagem}
                            placeholder="Mensagem"
                            value={this.state.mensagem}
                        />
                        <Botao
                            className="enviar"
                            onClick={this.onClickEnviar}>Enviar
                        </Botao>

                </ContainerEntrada>
                <LogContainer>
                    {this.state.log.map((mensagem) => <p><strong>{mensagem.usuario}:</strong> {mensagem.mensagem}</p>)}
                </LogContainer>

            </Main>
        )
    }
}



// proptypes
Mensagem.propTypes = {
    nome: PropTypes.string.isRequired,
    mensagem: PropTypes.string.isRequired
}

export default Mensagem