
export class Genero{
    constructor(
        private name: string,
    ) {
    }

    public getName(): string {
        return this.name;
    }

    public setDName(name: string): void {
        this.name = name;
    }
}