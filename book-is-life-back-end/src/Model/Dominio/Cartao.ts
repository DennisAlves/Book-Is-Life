import {Bandeira} from "./Bandeira";

export class Cartao{
    constructor(
        private numero: string,
        private nome: string,
        private validade: string,
        private cvc: string,
        private bandeira: Bandeira
    ) {
    }
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

    public getCvc(): string{
        return this.cvc;
    }
    public setCvc(cvc: string):void{
        this.cvc = cvc;
    }
    public getBandeira(): Bandeira{
        return this.bandeira;
    }
    public setBandeira(bandeira: Bandeira):void{
        this.bandeira = bandeira;
    }
}