import type { Connection } from "./Connection";

export default interface iConnectionDriver {
    testConnection(connection: Connection): Promise<boolean>;
}