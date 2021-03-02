import {EntidadeDominio} from "./EntidadeDominio";
import {Documento} from "./Documento";
import {Genero} from "./Genero";


export class Pessoa extends EntidadeDominio {
    private nome: string = ""
    private dtNascimento: string = ""
    private documentos: any[] = []
    private genero: any = ""

    public getNome(): string {
        return this.nome;
    }

    public setNome(nome: string) {
        this.nome = nome;
    }

    public setDtNascimento(dtNascimento: string) {
        this.dtNascimento = dtNascimento;
    }

    public getDtNascimento(): string {
        return this.dtNascimento;
    }

    public getDocumento(): Documento[] {
        return this.documentos;
    }

    public setDocumento(documentos: Documento[]) {
        this.documentos = documentos;
    }

    public getGenero(): string {
        return this.genero.getName();
    }

    public setGenero(genero: Genero) {
        this.genero = genero;
    }
}