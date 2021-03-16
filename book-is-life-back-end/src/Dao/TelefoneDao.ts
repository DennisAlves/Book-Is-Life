import {AbstractDao} from "./AbstractDao";
import {EntidadeDominio} from "../Model/Dominio/EntidadeDominio";
import {Telefone} from "../Model/Dominio/Telefone"
import {TipoTelefone} from "../Model/Dominio/TipoTelefone";

export class TelefoneDao extends AbstractDao{
    private static TABLE_NAME = "telefone"

    public async salvar(telefone: Telefone): Promise<void> {

        try{
            await super.setConnection().raw(`
                INSERT INTO ${TelefoneDao.TABLE_NAME} (
                id_usuario,
                tipo_telefone, 
                ddd,
                numero,
                ativo
                )
                VALUES(
                    "${telefone.getId()}",
                    "${telefone.getTipoTelefone()}",
                    "${telefone.getDdd()}",
                    "${telefone.getNumero()}",
                    1
                );
                `)
        }catch (e) {
            console.log("TelefoneDao save:" + e.message);
        }
            await TelefoneDao.desconnectDB();

    }

    public async alterar(telefone: Telefone): Promise<void> {

        try{
            await super.setConnection().raw(`
                UPDATE ${TelefoneDao.TABLE_NAME}
                SET
                 tipo_telefone = "${telefone.getTipoTelefone()}",
                 ddd = "${telefone.getDdd()}",
                 numero = "${telefone.getNumero()}"
                 WHERE id_usuario ="${telefone.getId()}";
            `)
        }catch (e) {
            console.log("TelefoneDao update:" + e.message);
        }
            await TelefoneDao.desconnectDB();

    }

    public async consultar(entidade: EntidadeDominio | undefined): Promise<any> {
        let response
        let telefoneData = []
        try{
            if (entidade?.getId() !== undefined) {

                response = await super.setConnection()
                    .select("*")
                    .into(TelefoneDao.TABLE_NAME)
                    .where({id_usuario: entidade.getId()})
            } else {
                response = await super.setConnection()
                    .select("*")
                    .into(TelefoneDao.TABLE_NAME)
            }
            for (let i = 0; i < response.length; i++) {

                const tipoTelefone = new TipoTelefone()
                tipoTelefone.setNome(response[i].tipo_telefone)

                const telefone = new Telefone()
                telefone.setTipoTelefone(tipoTelefone)
                telefone.setDdd(response[i].ddd)
                telefone.setNumero(response[i].numero)
                telefone.setAtivo(response[i].ativo)

                telefoneData.push(telefone)
            }
            return telefoneData
            await TelefoneDao.desconnectDB()
        }catch (e) {
            console.log("TelefoneDao search:" + e.message);
        }
    }

    public async inativar(entidade: EntidadeDominio): Promise<void> {
        try{
            await super.setConnection().raw(`
                UPDATE ${TelefoneDao.TABLE_NAME} 
                SET           
                ativo = 0                                      
                WHERE id_usuario ="${entidade.getId()}";                              
                `)
        }catch (e) {
            console.log("TelefoneDao inative:" + e.message);
        }
            await TelefoneDao.desconnectDB();

    }


}