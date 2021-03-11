import {AbstractDao} from "./AbstractDao";
import {EntidadeDominio} from "../Model/Dominio/EntidadeDominio";
import {TipoDocumento} from "../Model/Dominio/TipoDocumento";

export class TipoDocumentoDao extends AbstractDao {
    private static TABLE_NAME = "tipo_documento"

    alterar(entidade: EntidadeDominio): void {
    }

    public async consultar(entidade: EntidadeDominio | undefined): Promise<any> {
        let response
        let tipoDocumentoData = []
        try{
            if (entidade?.getId() !== undefined) {

                response = await super.setConnection()
                    .select("*")
                    .into(TipoDocumentoDao.TABLE_NAME)
                    .where({id_usuario: entidade.getId()})
            } else {
                response = await super.setConnection()
                    .select("*")
                    .into(TipoDocumentoDao.TABLE_NAME)
            }
            for (let i = 0; i < response.length; i++) {


                const tipoDocumento = new TipoDocumento()
                tipoDocumento.setNome(response[i].nome)

                tipoDocumentoData.push(tipoDocumento.getNome())
            }

            return tipoDocumentoData

            await TipoDocumentoDao.desconnectDB()
        }catch (e) {
            console.log("TipoDocumentoDao search:" + e.message);
        }
    }

    inativar(entidade: EntidadeDominio): void {
    }

    salvar(entidade: EntidadeDominio): void {
    }
}