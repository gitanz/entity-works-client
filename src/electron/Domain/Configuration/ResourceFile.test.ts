import {describe, expect, it} from '@jest/globals'
import ResourceFile from './ResourceFile';

describe('ResourceFile', () => {
    it('should throw an error if path is missing', () => {
        expect(() => {
            // @ts-ignore
            new ResourceFile('', 'content');
        }).toThrow('Path is required');
    });

    it('should throw an error if file not yml', () => {
        expect(() => {
            new ResourceFile('/path/to/resource.txt', 'content');
        }).toThrow('File must have a .yml or .yaml extension');
    });

    it('should throw an error if file does not end with .resource.yml', () => {
        expect(() => {
            new ResourceFile('/path/to/resource.config.yml', 'content');
        }).toThrow('Resource files must have a .resource.yml extension');
    });

    it('should create a ResourceFile with correct path and content', () => {
        const resourceFile = new ResourceFile('/path/to/resource.resource.yml', 'content');
        expect(resourceFile.path).toBe('/path/to/resource.resource.yml');
        expect(resourceFile.content).toBe('content');
    });

    it('should return correct name from getName()', () => {
        const resourceFile = new ResourceFile('/path/to/resource.resource.yml', 'content');
        expect(resourceFile.getName()).toBe('resource');
    });

    it('should return correct path from getPath()', () => {
        const resourceFile = new ResourceFile('/path/to/resource.resource.yml', 'content');
        expect(resourceFile.getPath()).toBe('/path/to/resource.resource.yml');
    }); 
});
