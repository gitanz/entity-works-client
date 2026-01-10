import type { Connection } from "../../Domain/Database/Connection";
import type iConnectionDriver from "../../Domain/Database/iConnectionDriver";
import type { Application } from "../Application";

export default class TestConnection implements Application<[Connection], boolean>{
    connectionDriver: iConnectionDriver

    constructor(connectionDriver: iConnectionDriver) {
        this.connectionDriver = connectionDriver;
    }

    async execute(connection: Connection): Promise<boolean> {
        return this.connectionDriver.testConnection(connection);
    }
}
