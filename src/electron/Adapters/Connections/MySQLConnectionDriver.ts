import type { Connection } from "../../Domain/Database/Connection";
import type iConnectionDriver from "../../Domain/Database/iConnectionDriver";
import { Sequelize } from "sequelize";

export default class MySQLConnectionDriver implements iConnectionDriver {
    async testConnection(connection: Connection): Promise<boolean> {
        const sequelize = new Sequelize('', connection.username, connection.password, {
            host: connection.host,
            port: connection.port,
            dialect: 'mysql',
        });

        try {
            await sequelize.authenticate();
            return true;
        } catch (error) {
            return false;
        } finally {
            await sequelize.close();
        }
    }
}
