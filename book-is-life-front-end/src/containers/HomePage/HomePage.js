import React, { Component } from "react";
import * as HPS from "./HomePageStyles";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { routes } from '../Router';
import Paper from '@material-ui/core/Paper';
import BookSimple from "../Book Simple/BookSimple";
import Image from "../Images/hobbit.jpg"

class HomePage extends Component {

  render() {
    return (
      <>
      <HPS.MainDiv>
        <Paper elevation={3}>
          <HPS.CustomHeader>
            <h3>aqui vai ficar o header</h3>
          </HPS.CustomHeader>
        </Paper>

        <HPS.BodyTitle>
          aqui alguma coisa como titulo
        </HPS.BodyTitle>

        <HPS.Mid>
          <BookSimple image={Image} title={"teste"} alt={"teste"} bookTitle={"teste"} shortResume={"teste teste teste"}/>
          <BookSimple image={Image} title={"teste"} alt={"teste"} bookTitle={"teste"} shortResume={"teste teste teste"}/>
          <BookSimple image={Image} title={"teste"} alt={"teste"} bookTitle={"teste"} shortResume={"teste teste teste"}/>
          <BookSimple image={Image} title={"teste"} alt={"teste"} bookTitle={"teste"} shortResume={"teste teste teste"}/>
          <BookSimple image={Image} title={"teste"} alt={"teste"} bookTitle={"teste"} shortResume={"teste teste teste"}/>
          <BookSimple image={Image} title={"teste"} alt={"teste"} bookTitle={"teste"} shortResume={"teste teste teste"}/>
          <BookSimple image={Image} title={"teste"} alt={"teste"} bookTitle={"teste"} shortResume={"teste teste teste"}/>
          <BookSimple image={Image} title={"teste"} alt={"teste"} bookTitle={"teste"} shortResume={"teste teste teste"}/>
          <BookSimple image={Image} title={"teste"} alt={"teste"} bookTitle={"teste"} shortResume={"teste teste teste"}/>
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
  }
}

export default connect(null, mapDispatchToProps)(HomePage)