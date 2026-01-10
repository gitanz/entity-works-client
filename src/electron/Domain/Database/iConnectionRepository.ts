import type { Connection } from "./Connection";

export default interface iConnectionRepository {
    saveConnection(connection: Connection): Promise<void>;
    getConnections(): Promise<Connection[]>;
    getConnectionByName(name: string): Promise<Connection>;
}
