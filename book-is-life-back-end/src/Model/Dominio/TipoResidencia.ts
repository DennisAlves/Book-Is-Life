
export class TipoResidencia  {
    private nomeTipo: string = ""


    public getNome(): string {
        return this.nomeTipo;
    }

    public setNome(nomeTipo: string): void {
        this.nomeTipo = nomeTipo;
    }

}