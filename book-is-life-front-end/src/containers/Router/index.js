import React from "react";
import { ConnectedRouter } from "connected-react-router";
import { Switch, Route } from "react-router-dom";
import HomePage from "../HomePage/HomePage";




export const routes = {

  HomePage: "/",

  // Outras rotas aqui
};

function Router(props) {
  return (
    <ConnectedRouter history={props.history}>
      <Switch>
        <Route exact path={routes.HomePage} component={HomePage} />
      </Switch>
    </ConnectedRouter>
  );
}

export default Router;