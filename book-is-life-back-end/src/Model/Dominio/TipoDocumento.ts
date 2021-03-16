

export class TipoDocumento{

    private nome: string = ""


    public getNome(): string {
        return this.nome;
    }

    public setNome(nome: string): void {
        this.nome = nome;
    }
}