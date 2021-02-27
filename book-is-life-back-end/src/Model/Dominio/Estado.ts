

export class Estado {
    constructor(
        private  uf: string,
    ) {
    }

    public getUf(): string {
        return this.uf;
    }

    public setUf(uf: string): void {
        this.uf = uf;
    }


}


