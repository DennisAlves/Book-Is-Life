// @ts-ignore
import express from "express";
import {ClienteControl} from "../Control/ClienteControl";

export const clienteRouter = express.Router();

clienteRouter.post("/add-cliente", new ClienteControl().salvarCliente)