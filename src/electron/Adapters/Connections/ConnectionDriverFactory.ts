import type { DBDriver } from "../../Domain/Database/Connection";
import MySQLConnectionDriver from "./MySQLConnectionDriver";

export default class ConnectionDriverFactory {
    static getConnectionDriver(driver: DBDriver): any {
        switch (driver) {
            case 'mysql':
                return new MySQLConnectionDriver();
            // Add more drivers as needed
            default:
                throw new Error(`Unsupported driver: ${driver}`);
        }
    }
}