import {AbstractDao} from "./AbstractDao";
import {EntidadeDominio} from "../Model/Dominio/EntidadeDominio";
import {TipoLogradouro} from "../Model/Dominio/TipoLogradouro";

export class TipoLogradouroDao extends AbstractDao {
    private static TABLE_NAME = "tipo_logradouro"

    alterar(entidade: EntidadeDominio): void {
    }

    public async consultar(entidade: EntidadeDominio | undefined): Promise<any> {
        let response
        let tipoLogradouroData = []
        try{
            if (entidade?.getId() !== undefined) {

                response = await super.setConnection()
                    .select("*")
                    .into(TipoLogradouroDao.TABLE_NAME)
                    .where({id_usuario: entidade.getId()})
            } else {
                response = await super.setConnection()
                    .select("*")
                    .into(TipoLogradouroDao.TABLE_NAME)
            }
            for (let i = 0; i < response.length; i++) {


                const tipologradouro = new TipoLogradouro()
                tipologradouro.setNome(response[i].nome)

                tipoLogradouroData.push(tipologradouro.getNome())
            }

            return tipoLogradouroData

            await TipoLogradouroDao.desconnectDB()
        }catch (e) {
            console.log("TipoLogradouroDao search:" + e.message);
        }
    }

    inativar(entidade: EntidadeDominio): void {
    }

    salvar(entidade: EntidadeDominio): void {
    }
}