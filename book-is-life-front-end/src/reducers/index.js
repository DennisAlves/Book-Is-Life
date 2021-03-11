import {combineReducers} from "redux";
import {connectRouter} from "connected-react-router";
import cliente from "./cliente";

export const generateReducers = history =>
    combineReducers({
        router: connectRouter(history),
        cliente,
        // Outros reducers aqui
    });
