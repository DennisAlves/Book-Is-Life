import React, { Component } from "react";
import * as HPS from "./HomePageStyles";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { routes } from '../Router';
import Paper from '@material-ui/core/Paper';
import BookSimple from "../Components/Book Simple/BookSimple";
import Image from "../Images/hobbit.jpg"
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

class HomePage extends Component {

  render() {
    return (
      <>
      <HPS.MainDiv>
        <Paper elevation={3}>
          <HPS.CustomHeader>
            <HPS.HomeLogoWraper>
              <HPS.HomeLogo onClick={this.props.goToHomePage}><h3>aqui vai ficar o header</h3></HPS.HomeLogo>
            </HPS.HomeLogoWraper>
            <HPS.HeaderLinks>
              <HPS.HeaderLink onClick={this.props.goToLoginPage}> Entrar </HPS.HeaderLink>
              <HPS.HeaderLink> Devoluções e Pedidos </HPS.HeaderLink>
              <HPS.HeaderLink> <ShoppingCartIcon/></HPS.HeaderLink>
            </HPS.HeaderLinks>
          </HPS.CustomHeader>
        </Paper>

        <HPS.BodyTitle>
          aqui alguma coisa como titulo
        </HPS.BodyTitle>

        <HPS.Mid>
          <BookSimple image={Image} title={"nome do item"} alt={"nome do livro"} bookTitle={"nome do livro grande pra caraleo gigante que nem vai"} author={"author"} value={"25.00"}/>
          <BookSimple image={Image} title={"nome do item"} alt={"nome do livro"} bookTitle={"nome do livro"} author={"author"} value={"25.00"}/>
          <BookSimple image={Image} title={"nome do item"} alt={"nome do livro"} bookTitle={"nome do livro"} author={"author"} value={"25.00"}/>
          <BookSimple image={Image} title={"nome do item"} alt={"nome do livro"} bookTitle={"nome do livro"} author={"author"} value={"25.00"}/>
          <BookSimple image={Image} title={"nome do item"} alt={"nome do livro"} bookTitle={"nome do livro"} author={"author"} value={"25.00"}/>
          <BookSimple image={Image} title={"nome do item"} alt={"nome do livro"} bookTitle={"nome do livro"} author={"author"} value={"25.00"}/>
          <BookSimple image={Image} title={"nome do item"} alt={"nome do livro"} bookTitle={"nome do livro"} author={"author"} value={"25.00"}/>
          <BookSimple image={Image} title={"nome do item"} alt={"nome do livro"} bookTitle={"nome do livro"} author={"author"} value={"25.00"}/>
        </HPS.Mid>

      </HPS.MainDiv>
      <Paper elevation={3}>
        <HPS.Footer>
          <h3>aqui vai ficar o footer</h3>
        </HPS.Footer>
      </Paper>
      </>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return {
    goToHomePage: () => dispatch(push(routes.HomePage)),
    goToLoginPage: () => dispatch(push(routes.LoginPage)),
  }
}

export default connect(null, mapDispatchToProps)(HomePage)