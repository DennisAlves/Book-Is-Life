// @ts-ignore
import dotenv from "dotenv";
// @ts-ignore
import express from "express";
import {AddressInfo} from "net";
import {clienteRouter} from "./Routers/ClienteRouter";



dotenv.config();
const app = express();
app.use(express.json());


async function main(): Promise<void> {

    app.use("/add-cliente", clienteRouter);


}

main()

const server = app.listen(3000, () => {
    if (server) {
        const address = server.address() as AddressInfo;
        console.log(`Servidor rodando em http://localhost:${address.port}`);
    } else {
        console.error(`Falha ao rodar o servidor.`);
    }
});
