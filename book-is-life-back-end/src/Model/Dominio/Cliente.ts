import {Pessoa} from "./Pessoa";
import {Endereco} from "./Endereco";
import {Cartao} from "./Cartao";
import {TipoCliente} from "./TipoCliente";
import {Telefone} from "./Telefone";

export class Cliente extends Pessoa{
    constructor(
        private senha: string,
        private email: string,
        private enderecos: Endereco[],
        private cartao: Cartao[],
        private telefone: Telefone[],
        private tipoCliente: TipoCliente,
    ) {
        super();
    }

    public getSenha(): string {
        return this.senha;
    }

    public setSenha(senha: string): void {
        this.senha = senha;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public getEnderecos() {
        return this.enderecos;
    }

    public setEnderecos(enderecos: Endereco[]):void {
        this.enderecos = enderecos;
    }

    public getCartaos() {
        return this.cartao;
    }

    public setTelefone(telefone: Telefone[]) {
        this.telefone = telefone;
    }
    public getTelefone() {
        return this.telefone;
    }

    public setCartaos(cartao: Cartao[]) {
        this.cartao = cartao;
    }
    public getTipoCliente() {
        return this.tipoCliente;
    }

    public addTipoCliente(tipoCliente: TipoCliente) {
        this.tipoCliente = tipoCliente;
    }
}