import mysql from 'mysql2/promise';
import type { Connection } from "../../Domain/Database/Connection";
import type iConnectionDriver from "../../Domain/Database/iConnectionDriver";

export default class MySQLConnectionDriver implements iConnectionDriver {
    async testConnection(connectionDetails: Connection): Promise<boolean> {
        
        try {
            const connection = await mysql.createConnection({
                host: connectionDetails.host,
                port: connectionDetails.port,
                user: connectionDetails.username,
                password: connectionDetails.password
            });
            connection.end();
            return true;
        } catch (error) {
            console.log("Connection failed:", error);
            return false;
        }
    }
}
