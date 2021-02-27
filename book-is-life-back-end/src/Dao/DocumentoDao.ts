import {AbstractDao} from "./AbstractDao";
import {EntidadeDominio} from "../Model/Dominio/EntidadeDominio";
import {Documento} from "../Model/Dominio/Documento";
import {TipoTelefone} from "../Model/Dominio/TipoTelefone";
import {Telefone} from "../Model/Dominio/Telefone";
import {TipoDocumento} from "../Model/Dominio/TipoDocumento";

export class DocumentoDao extends AbstractDao{
    private static TABLE_NAME = "documento";

    public async salvar(documento: Documento): Promise<void> {
        try{
            await super.setConnection().raw(`
                INSERT INTO ${DocumentoDao.TABLE_NAME} (
                id_usuario,
                tipo_documento,
                codigo,
                validade,
                ativo
                )
                VALUES(
                    "${documento.getId()}",
                    "${documento.getTipoDocumento()},
                    "${documento.getCodigo()}",
                    "${documento.getValidade()}",  
                    1
                );
                `)
        }catch (e) {
            console.log("DocumentoDao save:" + e.message);
        }
        await DocumentoDao.desconnectDB();
    }

    public async alterar(documento: Documento): Promise<void> {
        try{
            await super.setConnection().raw(`
                UPDATE ${DocumentoDao.TABLE_NAME}
                SET
                 tipo_documento = "${documento.getTipoDocumento()},
                 codigo = ${documento.getCodigo()}",
                 validade = "${documento.getValidade()}",   
                 WHERE id_usuario ="${documento.getId()}";
            `)
        }catch (e) {
            console.log("DocumentoDao update:" + e.message);
        }
        await DocumentoDao.desconnectDB();
    }

    public async consultar(entidade: EntidadeDominio | undefined): Promise<any> {
        let response
        let documentoData = []
        try{
            if (entidade?.getId() !== undefined) {

                response = await super.setConnection()
                    .select("*")
                    .into(DocumentoDao.TABLE_NAME)
                    .where({id_usuario: entidade.getId()})
            } else {
                response = await super.setConnection()
                    .select("*")
                    .into(DocumentoDao.TABLE_NAME)
            }
            for (let i = 0; i < response.length; i++) {

                const tipoDocumento = new TipoDocumento()
                tipoDocumento.setNome(response[i].tipo_documento)

                const documento = new Documento()
                documento.getTipoDocumento()
                documento.getCodigo()
                documento.getValidade()

                    documentoData.push(documento)
            }
            return documentoData
            await DocumentoDao.desconnectDB()
        }catch (e) {
            console.log("DocumentoDao search:" + e.message);
        }

    }

    public async inativar(entidade: EntidadeDominio): Promise<void> {
        try{
            await super.setConnection().raw(`
                UPDATE ${DocumentoDao.TABLE_NAME} 
                SET           
                ativo = 0                                      
                WHERE id_usuario ="${entidade.getId()}";                              
                `)
        }catch (e) {
            console.log("TelefoneDao inative:" + e.message);
        }
        await DocumentoDao.desconnectDB();
    }


}