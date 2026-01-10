import { Connection } from "./Connection";

describe('Connection', () => {
    it('should create a Connection with correct properties', () => {
        const connection = new Connection('mysql', 'localhost', 3306, 'user', 'password');
        expect(connection.driver).toBe('mysql');
        expect(connection.host).toBe('localhost');
        expect(connection.port).toBe(3306);
        expect(connection.username).toBe('user');
        expect(connection.password).toBe('password');
        expect(connection.name).toBeUndefined();
        expect(connection.database).toBeUndefined();
    });

    it('should set name correctly', () => {
        const connection = new Connection('mysql', 'localhost', 3306, 'user', 'password');
        connection.setName('MyConnection');
        expect(connection.name).toBe('MyConnection');
    });

    it('should set database correctly', () => {
        const connection = new Connection('mysql', 'localhost', 3306, 'user', 'password');
        connection.setDatabase('my_database');
        expect(connection.database).toBe('my_database');
    });
});