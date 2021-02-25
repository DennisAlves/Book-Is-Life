import * as dotenv from "dotenv"
import * as knex from "knex";
import * as Knex from "knex";
import {IDao} from "./IDao";
import {EntidadeDominio} from "../Model/Dominio/EntidadeDominio";


dotenv.config();

export abstract class AbstractDao implements IDao {
    private static CONNECTION_KNEX: Knex | null = null

    protected setConnection() {
        if (AbstractDao.CONNECTION_KNEX === null) {
            AbstractDao.CONNECTION_KNEX = knex({
                client: "mysql",
                connection: {
                    host: "127.0.0.1",
                    port: Number("3306" || "3000"),
                    user: "root",
                    password: "1234",
                    database: "bookislife",
                    insecureAuth: true
                }
            })
        }
        return AbstractDao.CONNECTION_KNEX
    }

    public static async desconnectDB() {
        if (AbstractDao.CONNECTION_KNEX !== null) {
            await AbstractDao.CONNECTION_KNEX.destroy()
            AbstractDao.CONNECTION_KNEX = null
        }
    }

    abstract salvar(entidade: EntidadeDominio): void

    abstract alterar(entidade: EntidadeDominio): void

    abstract inativar(entidade: EntidadeDominio): void

    abstract consultar(entidade: EntidadeDominio | undefined): any

}