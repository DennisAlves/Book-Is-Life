import React from "react";
import {ConnectedRouter} from "connected-react-router";
import {Route, Switch} from "react-router-dom";
import HomePage from "../HomePage/HomePage";
import LoginPage from "../LoginPage/LoginPage";
import SignupPage from "../SignupPage/SignupPage";
import UserPage from "../UserPage/UserPage";
import ClienteListPage from "../ClienteListPage/ClienteListPage";
import ProductPage from "../ProductPage/ProductPage";
import AddBookPage from "../AddBookPage/AddBookPage"
import CheckOutPage from "../CheckOutPage/CheckOutPage"
import CartPage from "../CartPage/CartPage"
import DashboardPage from "../DashboardPage/DashboardPage"

export const routes = {

    HomePage: "/",
    LoginPage: "/login",
    SignupPage: "/signup",
    UserPage: "/userPage",
    ClienteListPage:"/cliente-list",
    ProductPage:"/product",
    AddBookPage:"/add-book",
    CheckOutPage:"/checkout",
    CartPage:"/cart",
    DashboardPage: "/dashboard",

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
                <Route exact path={routes.ProductPage} component={ProductPage}/>
                <Route exact path={routes.AddBookPage} component={AddBookPage}/>
                <Route exact path={routes.CheckOutPage} component={CheckOutPage}/>
                <Route exact path={routes.CartPage} component={CartPage}/>
                <Route exact path={routes.DashboardPage} component={DashboardPage}/>
            </Switch>
        </ConnectedRouter>
    );
}

export default Router;