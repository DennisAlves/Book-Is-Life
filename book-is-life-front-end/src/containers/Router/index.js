import React from "react";
import {ConnectedRouter} from "connected-react-router";
import {Route, Switch} from "react-router-dom";
import HomePage from "../HomePage/HomePage";
import LoginPage from "../LoginPage/LoginPage";
import SignupPage from "../SignupPage/SignupPage";


export const routes = {

    HomePage: "/",
    LoginPage: "/login",
    SignupPage: "/signup",

};

function Router(props) {
    return (
        <ConnectedRouter history={props.history}>
            <Switch>
                <Route exact path={routes.HomePage} component={HomePage}/>
                <Route exact path={routes.LoginPage} component={LoginPage}/>
                <Route exact path={routes.SignupPage} component={SignupPage}/>
            </Switch>
        </ConnectedRouter>
    );
}

export default Router;