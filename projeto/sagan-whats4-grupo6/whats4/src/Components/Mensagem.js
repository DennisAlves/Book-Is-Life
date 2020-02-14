import React from 'React'
import PropTypes from 'prop-types'

class Mensagem extends React.Component{
        constructor(props){
            super(props)
            this.states = {
                usuario: "",
                mensagem:"",
            }
        }

        enviarMenssagem = () =>{
            const imputUsuario = this.state.usuario
            const imputMenssagem = this.state.mensagem
            this.setState({
                usuario: imputUsuario,
                mensagem: imputMenssagem,
            })
        }

        

        render(){
            return(
                <div>
                    <input type="text" className="nome-usuario"/>
                    <input type="text" className="menssagem"/>
                    <button className="enviar" onClick={this.enviarMenssagem}>Enviar</button>
                    <p>{this.usuario}</p>
                </div>
            )
        }

}


// proptypes
Mensagem.propTypes = {
    nome: PropTypes.string.isRequired,
    mensagem: PropTypes.string.isRequired
}

export default Mensagem