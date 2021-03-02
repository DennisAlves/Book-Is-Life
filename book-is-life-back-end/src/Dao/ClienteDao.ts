import {AbstractDao} from "./AbstractDao";
import {EntidadeDominio} from "../Model/Dominio/EntidadeDominio";
import {Cliente} from "../Model/Dominio/Cliente";
import {Genero} from "../Model/Dominio/Genero";
import {EnderecoDao} from "./EnderecoDao";
import {TelefoneDao} from "./TelefoneDao";
import {CartaoDao} from "./CartaoDao";
import {DocumentoDao} from "./DocumentoDao";

export class ClienteDao extends AbstractDao {
    private static TABLE_NAME = "usuario";

    public async salvar(cliente: Cliente): Promise<void> {

        try {
            await super.setConnection().raw(`
                INSERT INTO ${ClienteDao.TABLE_NAME} (
                id_usuario,
                dt_cadastro,
                nome,
                email,
                dt_nascimento,
                genero,
                senha,
                tipo_cliente,
                ativo
                )
                VALUES(
                    "${cliente.getId()}",
                    "${cliente.getDtCadastro()}",
                    "${cliente.getNome()}",
                    "${cliente.getEmail()}",
                    "${cliente.getDtNascimento()}",
                    "${cliente.getGenero()}",
                    "${cliente.getSenha()}",
                    "${cliente.getTipoCliente()}",
                    1
                );
                `)

        } catch (e) {
            console.log("ClienteDao save:" + e.message);
        }
            await ClienteDao.desconnectDB();


    }

    public async alterar(cliente: Cliente): Promise<void> {
        try {
            await super.setConnection().raw(`
                UPDATE ${ClienteDao.TABLE_NAME} 
                SET           
                nome = "${cliente.getNome()}",
                email = "${cliente.getEmail()}",
                dt_nascimento = "${cliente.getDtNascimento()}",
                genero = "${cliente.getGenero()}",
                tipo_cliente = ${cliente.getTipoCliente()}"                                       
                WHERE id_usuario ="${cliente.getId()}";                              
                `)
        } catch (e) {
            console.log("ClienteDao update:" + e.message);
        }
            await ClienteDao.desconnectDB();

    }

    public async consultar(entidade: EntidadeDominio | undefined): Promise<any> {
        let response
        let clienteData = []
        try {
            if (entidade?.getId() !== undefined) {

                response = await super.setConnection()
                    .select("*")
                    .into(ClienteDao.TABLE_NAME)
                    .where({id_usuario: entidade.getId()})
            } else {
                response = await super.setConnection()
                    .select("*")
                    .into(ClienteDao.TABLE_NAME)
            }
            for (let i = 0; i < response.length; i++) {

                const cliente = new Cliente(
                    response[i].senha,
                    response[i].email,
                    [],
                    [],
                    [],
                    response[i].tipo_cliente
                )

                cliente.setId(response[i].id_usuario);
                cliente.setDtCadastro(response[i].dt_cadastro);
                cliente.setDtNascimento(response[i].dt_nascimento);
                cliente.setNome(response[i].nome);
                cliente.setAtivo(response[i].ativo);
                const genero = new Genero(response[i].genero);
                cliente.setGenero(genero);

                cliente.setEnderecos(await new EnderecoDao().consultar(cliente))
                cliente.setTelefone(await new TelefoneDao().consultar(cliente))
                cliente.setDocumento(await new DocumentoDao().consultar(cliente))
                cliente.setCartao(await new CartaoDao().consultar(cliente))

                clienteData.push(cliente)
            }
            return clienteData
            console.log(clienteData)
            await ClienteDao.desconnectDB()
        } catch (e) {
            console.log("ClienteDao search:" + e.message);
        }

    }



    public async inativar(cliente: Cliente): Promise<void> {
        try {
            await super.setConnection().raw(`
                UPDATE ${ClienteDao.TABLE_NAME} 
                SET           
                ativo = 0                                      
                WHERE id_usuario ="${cliente.getId()}";                              
                `)
        } catch (e) {
            console.log("ClienteDao inative:" + e.message);
        }
            await ClienteDao.desconnectDB();

    }

}