import {Request, Response} from "express";
import {TipoDocumentoDao} from "../Dao/TipoDocumentosDao";


export class TipoDocumentoControl {


    public async consultarTipoDocumento(req: Request, res: Response) {
        try {
            const consulta = await new TipoDocumentoDao().consultar(undefined)
            res.status(200).send({consulta});
        } catch (e) {
            res.status(400).send({erro: e.message})
        }
    }
}
