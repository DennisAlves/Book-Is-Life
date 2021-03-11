import { v4 as uuid_v4 } from "uuid";

export class IdGenerator {
    public createID(): string {
        return uuid_v4();
    }
}