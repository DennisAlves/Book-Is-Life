import {uuid} from "uuidv4";

export class IdGenerator {
    public createID(): string {
        return uuid();
    }
}