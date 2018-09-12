const request = require('request');
const server = require('../../src/server');
const base = 'http://localhost:3000';

describe('routes: static', () => {
    describe('GET /', () => {
        it('should return status code 200', (done) => {
            request.get(base, (err, result, body) => {
                expect(result.statusCode).toBe(200);
                done();
            });
        });
    });
    describe('GET /marco', () => {
        it('should return status code 200', (done) => {
            request.get(base + '/marco', (err, result, body) => {
                expect(result.statusCode).toBe(200);
                expect(body).toContain('polo');
                done();
            });
        });
    });
});