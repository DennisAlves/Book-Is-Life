import {Estado} from "./Estado";

export class Cidade {
    constructor(
        private nome: string,
        private estado: Estado
    ) {
    }

    public getNome(): string {
        return this.nome;
    }

    public setNome(descricao: string): void {
        this.nome = descricao;
    }

    public getEstado(): Estado {
        return this.estado;
    }

    public setEstado(estado: Estado): void {
        this.estado = estado;
    }

}


