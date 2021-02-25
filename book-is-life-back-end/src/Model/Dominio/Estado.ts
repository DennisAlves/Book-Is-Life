

export class Estado {
    constructor(
        private  nome: string,
        private  uf: string,
    ) {
    }

    public getUf(): string {
        return this.uf;
    }

    public setUf(uf: string): void {
        this.uf = uf;
    }

    public getNome(): string {
        return this.nome;
    }

    public setNome(nome: string): void {
        this.nome = nome;
    }

}


