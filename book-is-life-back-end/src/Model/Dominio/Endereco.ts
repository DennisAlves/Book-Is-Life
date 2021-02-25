import {EntidadeDominio} from "./EntidadeDominio";
import {TipoResidencia} from "./TipoResidencia";
import {Cidade} from "./Cidade";
import {TipoLogradouro} from "./TipoLogradouro";
import {TipoEndereco} from "./TipoEndereco";

export class Endereco extends EntidadeDominio {
    constructor(
        private  descricao: string,
        private  tipoEndereco: TipoEndereco,
        private  tipoLogradouro: TipoLogradouro,
        private  tipoResidencia: TipoResidencia,
        private  endereco: string,
        private  numero: number,
        private  bairro: string,
        private  cep: string,
        private  cidade: Cidade,
        private  observacoes: string,
    ) {
        super();
    }

    public getNomeEnd(): string {
        return this.descricao;
    }

    public setNomeEnd(descricao: string): void {
        this.descricao = descricao;
    }

    public getTipoLogr(): TipoLogradouro {
        return this.tipoLogradouro;
    }

    public setTipoLogr(tipoLogradouro: TipoLogradouro): void {
        this.tipoLogradouro = tipoLogradouro;
    }

    public getTipoResid(): TipoResidencia {
        return this.tipoResidencia;
    }

    public setTipoResid(tipoResidencia: TipoResidencia): void {
        this.tipoResidencia = tipoResidencia;
    }

    public getEndereco(): string {
        return this.endereco;
    }

    public setEndereco(endereco: string): void {
        this.endereco = endereco;
    }

    public getTipoEnd(): TipoEndereco {
        return this.tipoEndereco;
    }

    public setTipoEnd(tipoEndereco: TipoEndereco): void {
        this.tipoEndereco = tipoEndereco;
    }

    public getNumero(): number {
        return this.numero;
    }

    public setNumero(numero: number): void {
        this.numero = numero;
    }

    public getBairro(): string {
        return this.bairro;
    }

    public setBairro(bairro: string): void {
        this.bairro = bairro;
    }

    public getCep(): string {
        return this.cep;
    }

    public setCepEnd(cep: string): void {
        this.cep = cep;
    }

    public getObservacoes(): string {
        return this.observacoes;
    }

    public setObservacoesEnd(observacoes: string): void {
        this.observacoes = observacoes;
    }
}

