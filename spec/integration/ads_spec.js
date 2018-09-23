const request = require('request');
const server = require('../../src/server');
const base = 'http://localhost:3000/advertisements/';
const sequelize = require('../../src/db/models').sequelize;
const Advertisements = require('../../src/db/models').Advertisements;

describe('routes : advertisements', () => {
    describe('GET /advertisements', () => {
        it('should return a status code 200 and all the ads', (done) => {
            request.get(base, (err, res, body) => {
                expect(res.statusCode).toBe(200);
                expect(err).toBeNull();
                expect(body).toContain('Advertisements');
                done();
            });
        });
    });
});