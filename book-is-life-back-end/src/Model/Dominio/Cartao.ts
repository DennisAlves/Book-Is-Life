import {Bandeira} from "./Bandeira";
import {EntidadeDominio} from "./EntidadeDominio";

export class Cartao extends EntidadeDominio{
    constructor(
        private numero: string,
        private nome: string,
        private validade: string,
        private cvv: string,
        private bandeira: Bandeira,

    ) {
        super()
    }
    private ativo: boolean = false

    public getNumero(): string{
        return this.numero;
    }
    public setNumero(numero: string):void{
        this.numero = numero;
    }

    public getNome(): string{
        return this.nome;
    }
    public setNome(nome: string):void{
        this.nome = nome;
    }

    public getValidade(): string{
        return this.validade;
    }
    public setValidade(validade: string):void{
        this.validade = validade;
    }

    public getCvv(): string{
        return this.cvv;
    }
    public setCvv(cvv: string):void{
        this.cvv = cvv;
    }
    public getBandeira(): string{
        return this.bandeira.getNome();
    }
    public setBandeira(bandeira: Bandeira):void{
        this.bandeira = bandeira;
    }
    public getAtivo() :boolean {
        return this.ativo
    }
    public setAtivo(ativo: boolean) {
        this.ativo = ativo
    }
}