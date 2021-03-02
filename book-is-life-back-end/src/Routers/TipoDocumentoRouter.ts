// @ts-ignore
import express from "express";
import {ClienteControl} from "../Control/ClienteControl";
import {TipoDocumentoDao} from "../Dao/TipoDocumentosDao";
import {TipoDocumentoControl} from "../Control/TipoDocumentoControl";

export const tipoDocumentoRouter = express.Router();

tipoDocumentoRouter.get("/consultar-tipo-documento", new TipoDocumentoControl().consultarTipoDocumento)