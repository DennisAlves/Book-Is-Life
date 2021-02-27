import {AbstractDao} from "./AbstractDao";
import {EntidadeDominio} from "../Model/Dominio/EntidadeDominio";
import {Endereco} from "../Model/Dominio/Endereco";
import {TipoEndereco} from "../Model/Dominio/TipoEndereco";
import {TipoLogradouro} from "../Model/Dominio/TipoLogradouro";
import {TipoResidencia} from "../Model/Dominio/TipoResidencia";
import {Cidade} from "../Model/Dominio/Cidade";
import {Estado} from "../Model/Dominio/Estado"

export class EnderecoDao extends AbstractDao {
    private static TABLE_NAME = "endereco";

    public async salvar(endereco: Endereco): Promise<void> {

        try {
            await super.setConnection().raw(`
                INSERT INTO ${EnderecoDao.TABLE_NAME}(
                id_usuario,
                descricao,
                tipo_endereco,
                tipo_logradouro,
                tipo_residencia,
                cep,
                endereco,
                numero,
                bairro,
                cidade,
                estado,
                complemento,
                ativo
                )
                VALUES(
                    "${endereco.getId()}",
                    "${endereco.getDescricao()}",
                    "${endereco.getTipoEnd()}",
                    "${endereco.getTipoLogr()}",
                    "${endereco.getTipoResid()}",
                    "${endereco.getCep()}",
                    "${endereco.getEndereco()}",
                    "${endereco.getNumero()}",
                    "${endereco.getBairro()}",
                    "${endereco.getCidade()}",
                    "${endereco.getEstado()}",
                    "${endereco.getComplemento()}",
                    1
                );
            `)

        }catch (e) {
            console.log("EnderecoDao save:" + e.message);
        }
            await EnderecoDao.desconnectDB();

    }

    public async alterar(endereco: Endereco): Promise<void> {
        try{
            await super.setConnection().raw(`
                UPDATE ${EnderecoDao.TABLE_NAME} 
                SET           
                descricao = "${endereco.getDescricao()}",
                tipo_endereco = "${endereco.getTipoEnd()}",
                tipo_logradouro = "${endereco.getTipoLogr()}",
                tipo_residencia = "${endereco.getTipoResid()}",
                cep = "${endereco.getCep()}",
                endereco = "${endereco.getEndereco()}",
                numero = "${endereco.getNumero()}",
                bairro = "${endereco.getBairro()}",
                cidade = "${endereco.getCidade()}",
                estado = "${endereco.getEstado()}",
                complemento = "${endereco.getComplemento()}",                               
                WHERE id_usuario ="${endereco.getId()}";                              
                `)
        }catch (e) {
            console.log("EnderecoDao update:" + e.message);
        }
            await EnderecoDao.desconnectDB()

    }

    public async consultar(entidade: EntidadeDominio | undefined): Promise<any> {
        let response
        let enderecoData = []
        try{
            if (entidade?.getId() !== undefined) {

                response = await super.setConnection()
                    .select("*")
                    .into(EnderecoDao.TABLE_NAME)
                    .where({id_usuario: entidade.getId()})
            } else {
                response = await super.setConnection()
                    .select("*")
                    .into(EnderecoDao.TABLE_NAME)
            }

            for (let i = 0; i < response.length; i++) {
                const tipoEndereco = new TipoEndereco()
                tipoEndereco.setNome(response[i].tipo_endereco)

                const tipoLogradouro = new TipoLogradouro()
                tipoLogradouro.setNome(response[i].tipo_logradouro)

                const tipoResidencia = new TipoResidencia()
                tipoResidencia.setNome(response[i].tipo_residencia)

                const estado = new Estado(response[i].uf)
                estado.setUf(response[i].estado)

                const cidade = new Cidade(response[i].cidade, estado)

                const endereco = new Endereco(
                    response[i].descricao,
                    tipoEndereco,
                    tipoLogradouro,
                    tipoResidencia,
                    response[i].endereco,
                    response[i].numero,
                    response[i].bairro,
                    response[i].cep,
                    cidade,
                    response[i].complemento,
                )
                endereco.setAtivo(response[i].ativo)

                enderecoData.push(endereco)
            }
            return enderecoData

        }catch (e) {
            console.log("EnderecoDao search:" + e.message);
        }
        await EnderecoDao.desconnectDB()
    }

    public async inativar(endereco: Endereco): Promise<void> {
        try{
            await super.setConnection().raw(`
                UPDATE ${EnderecoDao.TABLE_NAME} 
                SET           
                ativo = 0                                      
                WHERE id_usuario ="${endereco.getId()}";                              
                `)
        }catch (e) {
            console.log("EnderecoDao inative:" + e.message);
        }
            await EnderecoDao.desconnectDB();

    }


}