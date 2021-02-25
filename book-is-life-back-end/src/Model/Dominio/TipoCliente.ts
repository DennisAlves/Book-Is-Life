

export class TipoCliente {
    private nomeTipo: string = ""
    private decricao: string = ""

    public getNome(): string {
        return this.nomeTipo;
    }

    public setNome(nomeTipo: string): void {
        this.nomeTipo = nomeTipo;
    }

    public getDescricao(): string {
        return this.decricao;
    }

    public setDescricao(decricao: string): void {
        this.decricao = decricao;
    }
}