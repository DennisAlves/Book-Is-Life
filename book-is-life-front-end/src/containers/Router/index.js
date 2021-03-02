import React from "react";
import {ConnectedRouter} from "connected-react-router";
import {Route, Switch} from "react-router-dom";
import HomePage from "../HomePage/HomePage";
import LoginPage from "../LoginPage/LoginPage";
import SignupPage from "../SignupPage/SignupPage";
import UserPage from "../UserPage/UserPage";
import ClienteListPage from "../ClienteListPage/ClienteListPage";


export const routes = {

    HomePage: "/",
    LoginPage: "/login",
    SignupPage: "/signup",
    UserPage: "/userPage",
    ClienteListPage:"/cliente-list"

};

function Router(props) {
    return (
        <ConnectedRouter history={props.history}>
            <Switch>
                <Route exact path={routes.HomePage} component={HomePage}/>
                <Route exact path={routes.LoginPage} component={LoginPage}/>
                <Route exact path={routes.SignupPage} component={SignupPage}/>
                <Route exact path={routes.UserPage} component={UserPage}/>
                <Route exact path={routes.ClienteListPage} component={ClienteListPage}/>
            </Switch>
        </ConnectedRouter>
    );
}

export default Router;