import {AbstractDao} from "./AbstractDao";
import {EntidadeDominio} from "../Model/Dominio/EntidadeDominio";
import {HashManager} from "../services/HashManager";
import {Cliente} from "../Model/Dominio/Cliente";

export class ClienteDao extends AbstractDao{
    private static TABLE_NAME = "usuario";

    public async salvar(cliente: Cliente): Promise<void> {
        const senhaCripto = await new HashManager().hash(cliente.getSenha());
        await super.setConnection().raw(`
        INSERT INTO ${ClienteDao.TABLE_NAME} (
        id_usuario,
        dt_cadastro,
        nome,
        email,
        dt_nascimento,
        genero,
        senha
        )
        VALUES(
        
        )
        `)
    }

    alterar(cliente: Cliente): void {
    }

    consultar(entidade: EntidadeDominio | undefined): any {
    }

    inativar(entidade: EntidadeDominio): void {
    }

}