export class EntidadeDominio{
    private id: string = ""
    private dtCadastro: string = ""


    public getId(): string {
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
    }

    public getDtCadastro(): string {
        return this.dtCadastro;
    }

    public setDtCadastro(dtCadastro: string): void {
        this.dtCadastro = dtCadastro;
    }
}