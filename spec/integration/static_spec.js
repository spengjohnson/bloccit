const request = require('request');
const server = require('../../src/server');
const base = 'http://localhost:3000';

describe('routes: static', () => {
    describe('GET /', () => {
        it('should return status code 200 and have Welcome to Bloccit in the body of the response', (done) => {
            request.get(base, (err, result, body) => {
                expect(result.statusCode).toBe(200);
                expect(body).toContain('Welcome to Bloccit');
                done();
            });
        });
    });
    describe('GET /about', () => {
        it('should return status code 200 and have About us string in the body of the response', (done) => {
            request.get(base, (err, result, body) => {
                expect(result.statusCode).toBe(200); 
                expect(body).toContain('About Us'); 
                done(); 
            }); 
        }); 
    }); 
});