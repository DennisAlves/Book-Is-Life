// @ts-ignore
import dotenv from "dotenv";
// @ts-ignore
import express from "express";
import {AddressInfo} from "net";
import {clienteRouter} from "./Routers/ClienteRouter";
import {tipoDocumentoRouter} from "./Routers/TipoDocumentoRouter";
import {tipoLogradouroRouter} from "./Routers/TipoLogradouroRouter";;


dotenv.config();
const app = express();
const cors = require('cors');
app.use(express.json(),cors());


async function main(): Promise<void> {

    app.use("/cliente", clienteRouter);
    app.use("/tipo-documento",tipoDocumentoRouter)
    app.use("/tipo-logradouro",tipoLogradouroRouter)


}

main()

const server = app.listen(3001, () => {
    if (server) {
        const address = server.address() as AddressInfo;
        console.log(`Servidor rodando em http://localhost:${address.port}`);
    } else {
        console.error(`Falha ao rodar o servidor.`);
    }
});
