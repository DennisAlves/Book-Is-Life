import {TipoTelefone} from "./TipoTelefone";
import {EntidadeDominio} from "./EntidadeDominio";

export class Telefone extends EntidadeDominio{
    private ddd:string = ""
    private numero:string = ""
    private tipoTelefone: TipoTelefone = new TipoTelefone()
    private ativo: boolean = false

    public getDdd():string {
        return this.ddd;
    }
    public setDdd(ddd:string):void{
        this.ddd = ddd;
    }

    public getNumero():string {
        return this.numero;
    }
    public setNumero(numero:string):void{
        this.numero = numero;
    }

    public getTipoTelefone():string {
        return this.tipoTelefone.getNome();
    }
    public setTipoTelefone(tipoTelefone:TipoTelefone):void{
        this.tipoTelefone = tipoTelefone;
    }
    public getAtivo() :boolean {
        return this.ativo
    }
    public setAtivo(ativo: boolean) {
        this.ativo = ativo
    }
}