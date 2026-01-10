export type DBDriver = 'mysql';

export class Connection {
    name: string | undefined;
    driver: DBDriver;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string | undefined;

    constructor (
        driver: DBDriver,
        host: string,
        port: number,
        username: string,
        password: string
    ) {
        this.driver = driver;
        this.host = host;
        this.port = port;
        this.username = username;
        this.password = password;
    }

    setName(name: string) {
        this.name = name;
    }

    setDatabase(database: string) {
        this.database = database;
    }
}
