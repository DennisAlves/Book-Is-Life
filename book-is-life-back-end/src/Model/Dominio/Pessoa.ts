import {EntidadeDominio} from "./EntidadeDominio";
import {Documento} from "./Documento";
import {Genero} from "./Genero";


export class Pessoa extends EntidadeDominio{

    private documento: Documento[]
    private genero: Genero

   public getDocumento(): Documento[] {
        return this.documento;
    }

    public setDocumento(documento: Documento[]) {
        this.documento = documento;
    }

    public getgenero(): Genero {
        return this.genero;
    }

    public setgenero(genero: Genero) {
        this.genero = genero;
    }
}