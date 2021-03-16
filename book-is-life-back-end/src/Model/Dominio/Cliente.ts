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
        private cartoes: Cartao[],
        private telefones: Telefone[],
        private tipoCliente: TipoCliente,
    ) {
        super();
    }
    private ativo :boolean = false;

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
        return this.cartoes;
    }

    public setTelefone(telefones: Telefone[]) {
        this.telefones = telefones;
    }
    public getTelefone() {
        return this.telefones;
    }

    public setCartao(cartoes: Cartao[]) {
        this.cartoes = cartoes;
    }
    public getTipoCliente() {
        return this.tipoCliente;
    }

    public addTipoCliente(tipoCliente: TipoCliente) {
        this.tipoCliente = tipoCliente;
    }
    public getAtivo() :boolean {
        return this.ativo
    }
    public setAtivo(ativo: boolean) {
        this.ativo = ativo
    }
}