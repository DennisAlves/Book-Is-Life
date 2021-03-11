import {Request, Response} from "express";
import {TipoLogradouroDao} from "../Dao/TipoLogradouroDao";


export class TipoLogradouroControl {


    public async consultarTipoLogradouro(req: Request, res: Response) {
        try {
            const consulta = await new TipoLogradouroDao().consultar(undefined)
            res.status(200).send({consulta});
        } catch (e) {
            res.status(400).send({erro: e.message})
        }
    }
}
