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

    describe('GET /advertisements/new', () => {
        it('should render a new advertisement form', (done) => {
            request.get(`${base}new`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain('New Advertisement');
                done();
            });
        });
    });

    describe('POST /advertisements/create', () => {
        const options = {
            url: `${base}create`,
            form: {
                title: 'songs',
                description: "What's your favorite song?"
            }
        };
        it('should create a new ad and redirect', (done) => {
            request.post(options,
                (err, res, body) => {
                    Advertisements.findOne({ where: { title: 'songs' } })
                        .then((advertisements) => {
                            expect(res.statusCode).toBe(303);
                            expect(advertisements.title).toBe('songs');
                            expect(advertisements.description).toBe("What's your favorite song?");
                            done();
                        })
                        .catch((err) => {
                            console.log(err);
                            done();
                        });
                });
        });
    });
    describe('GET /advertisements/:id', () => {
        it('should render a view with the selected advertisement', (done) => {
            request.get(`${base}${this.advertisements.id}`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain('Ad goes here.');
                done();
            });
        });
    });
});