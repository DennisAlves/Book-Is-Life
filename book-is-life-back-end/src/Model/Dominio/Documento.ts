import {EntidadeDominio} from "./EntidadeDominio";
import {TipoDocumento} from "./TipoDocumento";


export class Documento extends EntidadeDominio {

    private codigo: string
    private validade: string
    private tipoDocumento: TipoDocumento

    public getCodigo(): string {
        return this.codigo;
    }

    public setCodigo(codigo: string): void {
        this.codigo = codigo;
    }

    public getValidade(): string {
        return this.validade;
    }

    public setValidade(validade: string): void {
        this.validade = validade;
    }

    public getTipoDocumento(): TipoDocumento {
        return this.tipoDocumento;
    }

    public setTipoDocumento(tipoDocumento: TipoDocumento): void {
        this.tipoDocumento = tipoDocumento;
    }
}