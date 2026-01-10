import {describe, expect, it} from '@jest/globals'
import EntityFile from './EntityFile';

describe('EntityFile', () => {
    it('should throw an error if path is missing', () => {
        expect(() => {
            // @ts-ignore
            new EntityFile('', 'content');
        }).toThrow('Path is required');
    });

    it('should throw an error if file not yml', () => {
        expect(() => {
            new EntityFile('/path/to/entity.txt', 'content');
        }).toThrow('File must have a .yml or .yaml extension');
    });

    it('should throw an error if file does not end with .entity.yml', () => {
        expect(() => {
            new EntityFile('/path/to/entity.config.yml', 'content');
        }).toThrow('Entity files must have a .entity.yml extension');
    });

    it('should create an EntityFile with correct path and content', () => {
        const entityFile = new EntityFile('/path/to/entity.entity.yml', 'content');
        expect(entityFile.path).toBe('/path/to/entity.entity.yml');
        expect(entityFile.content).toBe('content');
    });

    it('should return correct name from getName()', () => {
        const entityFile = new EntityFile('/path/to/myEntity.entity.yml', 'content');
        expect(entityFile.getName()).toBe('myEntity');
    });

    it('should return correct path from getPath()', () => {
        const entityFile = new EntityFile('/path/to/myEntity.entity.yml', 'content');
        expect(entityFile.getPath()).toBe('/path/to/myEntity.entity.yml');
    }); 
});
