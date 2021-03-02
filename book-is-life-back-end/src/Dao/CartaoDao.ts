import {AbstractDao} from "./AbstractDao";
import {EntidadeDominio} from "../Model/Dominio/EntidadeDominio";
import {Cartao} from "../Model/Dominio/Cartao";
import {Bandeira} from "../Model/Dominio/Bandeira";

export class CartaoDao extends AbstractDao {
    private static TABLE_NAME = "cartao"

    public async salvar(cartao: Cartao): Promise<void> {
        try {
            await super.setConnection().raw(`
                INSERT INTO ${CartaoDao.TABLE_NAME}(
                id_usuario,
                numero,
                nome,
                validade,
                cvv,
                bandeira,
                ativo
                )VALUES(
                    "${cartao.getId()}",
                    "${cartao.getNumero()}",
                    "${cartao.getNome()}",
                    "${cartao.getValidade()}",
                    "${cartao.getCvv()}",
                    "${cartao.getBandeira()}",
                    1
                );
            `)
        } catch (e) {
            console.log("CartaoDao save:" + e.message);
        }
        await CartaoDao.desconnectDB();

    }

    public async alterar(cartao: Cartao): Promise<void> {
        try{
            await super.setConnection().raw(`
                UPDATE ${CartaoDao.TABLE_NAME}
                SET
                 numero = "${cartao.getNumero()}",
                 nome = "${cartao.getNome()}",
                 validade="${cartao.getValidade()}",
                 cvv = "${cartao.getCvv()}",
                 bandeira = "${cartao.getBandeira()}"
                 WHERE id_usuario ="$"${cartao.getId()};
            `)
        }catch (e) {
            console.log("TelefoneDao update:" + e.message);
        }
        await CartaoDao.desconnectDB();
    }

    public async consultar(entidade: EntidadeDominio | undefined): Promise<any> {
        let response
        let cartaoData = []
        try{
            if (entidade?.getId() !== undefined) {

                response = await super.setConnection()
                    .select("*")
                    .into(CartaoDao.TABLE_NAME)
                    .where({id_usuario: entidade?.getId()})
            } else {
                response = await super.setConnection()
                    .select("*")
                    .into(CartaoDao.TABLE_NAME)
            }
            for (let i = 0; i < response.length; i++) {

                const bandeira = new Bandeira()
                bandeira.setNome(response[i].bandeira)

                const cartao = new Cartao(
                    response[i].numero,
                    response[i].nome,
                    response[i].validade,
                    response[i].cvv,
                    bandeira
                )
                cartaoData.push(cartao)
                cartao.setAtivo(response[i].ativo)
            }
            return cartaoData
            await CartaoDao.desconnectDB()
        }catch (e) {
            console.log("CartaoDao search:" + e.message);
        }
    }

    public async inativar(entidade: EntidadeDominio): Promise<void> {
        try{
            await super.setConnection().raw(`
                UPDATE ${CartaoDao.TABLE_NAME} 
                SET           
                ativo = 0                                      
                WHERE id_usuario ="${entidade.getId()}";                              
                `)
        }catch (e) {
            console.log("CartaoDao inative:" + e.message);
        }
        await CartaoDao.desconnectDB();
    }

}
