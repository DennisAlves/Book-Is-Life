import {Request, Response} from "express";
import {Cliente} from "../Model/Dominio/Cliente";
import {IdGenerator} from "../services/IdGenerator"
import {Endereco} from "../Model/Dominio/Endereco";
import {TipoEndereco} from "../Model/Dominio/TipoEndereco";
import {TipoLogradouro} from "../Model/Dominio/TipoLogradouro";
import {TipoResidencia} from "../Model/Dominio/TipoResidencia";
import {Estado} from "../Model/Dominio/Estado";
import {Cidade} from "../Model/Dominio/Cidade";
import {TipoTelefone} from "../Model/Dominio/TipoTelefone";
import {Telefone} from "../Model/Dominio/Telefone";
import {Cartao} from "../Model/Dominio/Cartao";
import {Bandeira} from "../Model/Dominio/Bandeira";
import {Documento} from "../Model/Dominio/Documento";
import {TipoDocumento} from "../Model/Dominio/TipoDocumento";
import {ClienteDao} from "../Dao/ClienteDao";
import {EnderecoDao} from "../Dao/EnderecoDao";
import {TelefoneDao} from "../Dao/TelefoneDao";
import {CartaoDao} from "../Dao/CartaoDao";
import {DocumentoDao} from "../Dao/DocumentoDao";
import {Genero} from "../Model/Dominio/Genero";
// @ts-ignore
import moment from "moment/moment";
import {EntidadeDominio} from "../Model/Dominio/EntidadeDominio";

moment.locale('pt-br');

export class ClienteControl {

    public async salvarCliente(req: Request, res: Response) {
        try {
            let cliente = new Cliente(
                req.body.senha,
                req.body.email,
                [],
                [],
                [],
                req.body.tipoCliente,
            );
            cliente.setId(await new IdGenerator().createID())
            cliente.setDtCadastro(moment(new Date()).format("YYYY-MM-DD HH:mm:ss"))
            cliente.setNome(req.body.nome)
            cliente.setDtNascimento(req.body.dtNascimento)
            const genero = new Genero(req.body.genero)
            cliente.setGenero(genero)

            let enderecos = req.body.enderecos
            let enderecoData: Endereco[] = []

            for (let i = 0; i < enderecos.length; i++) {
                let tipoEndereco = new TipoEndereco()
                tipoEndereco.setNome(enderecos[i].tipoEndereco)

                let tipoLogradouro = new TipoLogradouro()
                tipoLogradouro.setNome(enderecos[i].tipoLogradouro)

                let tipoResidencia = new TipoResidencia()
                tipoResidencia.setNome(enderecos[i].tipoResidencia)

                let estado = new Estado(enderecos[i].uf)
                let cidade = new Cidade(enderecos[i].cidade, estado)

                let endereco = new Endereco(
                    enderecos[i].descricao,
                    tipoEndereco,
                    tipoLogradouro,
                    tipoResidencia,
                    enderecos[i].endereco,
                    enderecos[i].numero,
                    enderecos[i].bairro,
                    enderecos[i].cep,
                    cidade,
                    enderecos[i].complemento
                )
                endereco.setId(cliente.getId())

                enderecoData.push(endereco)
            }
            cliente.setEnderecos(enderecoData)

            let telefones = req.body.telefones
            let telefoneData = []

            for (let i: number = 0; i < telefones.length; i++) {

                let tipoTelefone = new TipoTelefone()
                tipoTelefone.setNome(telefones[i].tipoTelefone)

                let telefone = new Telefone()
                telefone.setDdd(telefones[i].ddd)
                telefone.setNumero(telefones[i].numero)
                telefone.setTipoTelefone(tipoTelefone)
                telefone.setId(cliente.getId())

                telefoneData.push(telefone)
            }
            cliente.setTelefone(telefoneData)

            let cartoes = req.body.cartoes
            let cartaoData = []

            for (let i = 0; i < cartoes.length; i++) {

                let bandeira = new Bandeira()
                bandeira.setNome(cartoes[i].bandeira)

                let cartao = new Cartao(
                    cartoes[i].numero,
                    cartoes[i].nome,
                    cartoes[i].validade,
                    cartoes[i].cvv,
                    bandeira
                )
                cartao.setId(cliente.getId())
                cartaoData.push(cartao)
            }
            cliente.setCartao(cartaoData)

            let documentos = req.body.documentos
            let documentoData = []

            for (let i: number = 0; i < documentos.length; i++) {

                let tipoDocumento = new TipoDocumento()
                tipoDocumento.setNome(documentos[i].tipoDocumento)

                let documento = new Documento()
                documento.setCodigo(documentos[i].codigo)
                documento.setValidade(documentos[i].validade)
                documento.setId(cliente.getId())
                documento.setTipoDocumento(tipoDocumento)

                documentoData.push(documento)
            }
            cliente.setDocumento(documentoData)


            await new ClienteDao().salvar(cliente)

            for (let i = 0; i < enderecoData.length; i++) {
                await new EnderecoDao().salvar(enderecoData[i])
            }

            for (let i = 0; i < telefoneData.length; i++) {
                await new TelefoneDao().salvar(telefoneData[i])
            }

            for (let i = 0; i < cartaoData.length; i++) {
                await new CartaoDao().salvar(cartaoData[i])
            }

            for (let i = 0; i < documentoData.length; i++) {
                await new DocumentoDao().salvar(documentoData[i])
            }
            res.status(200).send({menssagem: "cliente criado!"});
        } catch (e) {
            res.status(400).send({erro: e.message})
        }
    }
    public async consultarCliente(req: Request, res: Response) {
        try {
            let consulta = ""
            console.log(req.body)
            if(req.body === undefined){
                consulta = await new ClienteDao().consultar(undefined)
            }
            else{
                const entidade = new EntidadeDominio()
                entidade.setId(req.body.id)
                consulta = await new ClienteDao().consultar(entidade)
            }

            res.status(200).send({consulta});
        } catch (e) {
        res.status(400).send({erro: e.message})
    }
}
}
