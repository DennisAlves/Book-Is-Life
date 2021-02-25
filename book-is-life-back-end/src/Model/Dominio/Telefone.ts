import {TipoTelefone} from "./TipoTelefone";

export class Telefone{
    private ddd:string
    private numero:string
    private tipoTelefone: TipoTelefone

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

    public getTipoTelefone():TipoTelefone {
        return this.tipoTelefone;
    }
    public setTipoTelefone(tipoTelefone:TipoTelefone):void{
        this.tipoTelefone = tipoTelefone;
    }

}