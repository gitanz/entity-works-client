import ConnectionDriverFactory from "../Adapters/Connections/ConnectionDriverFactory";
import TestConnection from "../Application/DBPalette/TestConection";
import { Connection, type DBDriver } from "../Domain/Database/Connection";

export default class DBPaletteHandlers {

    async testConnection({driver, host, port, username, password}: {driver: DBDriver, host: string, port: number, username: string, password: string}): Promise<boolean> {
        const connection = new Connection(driver, host, port, username, password);
        const driverInstance = ConnectionDriverFactory.getConnectionDriver(driver);
        const application = new TestConnection(driverInstance);

        return await application.execute(connection);
    }
}