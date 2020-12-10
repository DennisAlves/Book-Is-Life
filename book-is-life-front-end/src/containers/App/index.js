import React from "react";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import {CssBaseline, MuiThemeProvider} from "@material-ui/core";
import Router from "../Router";
import {createBrowserHistory} from "history";
import {applyMiddleware, compose, createStore} from "redux";
import {generateReducers} from "../../reducers";
import {routerMiddleware} from "connected-react-router";
import {createMuiTheme} from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
//import orange from '@material-ui/core/colors/orange';


export const history = createBrowserHistory();

const theme = createMuiTheme({
    palette: {
        primary: purple,
        secondary: {main: '#9c27b0'},
    },
    status: {
        danger: 'red',
    },
});

const middlewares = [
    applyMiddleware(routerMiddleware(history), thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : f => f
];

const store = createStore(generateReducers(history), compose(...middlewares));

export const App = () => (

    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
            <CssBaseline/>
            <Router history={history}/>
        </MuiThemeProvider>
    </Provider>
);

export default App;
