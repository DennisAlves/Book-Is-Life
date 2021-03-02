// @ts-ignore
import express from "express";
import {ClienteControl} from "../Control/ClienteControl";
import {TipoDocumentoDao} from "../Dao/TipoDocumentosDao";
import {TipoDocumentoControl} from "../Control/TipoDocumentoControl";
import {TipoLogradouroDao} from "../Dao/TipoLogradouroDao";
import {TipoLogradouroControl} from "../Control/TipoLogradouroControl";

export const tipoLogradouroRouter = express.Router();

tipoLogradouroRouter.get("/consultar-tipo-logradouro", new TipoLogradouroControl().consultarTipoLogradouro)