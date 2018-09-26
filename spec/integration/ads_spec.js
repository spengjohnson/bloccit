const request = require('request');
const server = require('../../src/server');
const base = 'http://localhost:3000/advertisements/';
const sequelize = require('../../src/db/models').sequelize;
const Advertisements = require('../../src/db/models').Advertisements;

describe('routes : advertisements', () => {

    beforeEach((done) => {
        this.advertisements;
        sequelize.sync({ force: true }).then((res) => {
            Advertisements.create({
                    title: 'Advertisements',
                    description: "There are a lot of them"
                })
                .then((advertisements) => {
                    this.advertisements = advertisements;
                    done();
                })
                .catch((err) => {
                    console.log((err) => {
                        console.log(err);
                        done();
                    });
                });
        });

    });
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
        it('should render a view with the advertisement page', (done) => {
            request.get(`${base}${this.advertisements.id}`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain('Ads go here.');
                done();
            });
        });
    });
    describe('POST /advertisements/:id/destroy', () => {
        it('should delete the topic with the associated ID', (done) => {
            Advertisements.all()
                .then((advertisements) => {
                    const advertisementCountBeforeDelete = advertisements.length;
                    expect(advertisementCountBeforeDelete).toBe(1);
                    request.post(`${base}${this.advertisements.id}/destroy`, (err, res, body) => {
                        Advertisements.all()
                            .then((advertisements) => {
                                expect(err).toBeNull();
                                expect(advertisements.length).toBe(advertisementCountBeforeDelete - 1);
                                done();
                            });
                    });
                });
        });
    });
    describe('GET /advertisements/:id/edit', () => {
        it('should render a view with an edit advertisement form', (done) => {
            request.get(`${base}${this.advertisements.id}`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain('Edit Advertisement');
                done();
            });
        });
    });

    describe('POST /advertisements/:id/update', () => {
        it('should update the ad with the given values', (done) => {
            const options = {
                url: `${base}${this.advertisements.id}/update`,
                form: {
                    title: 'JavaScript Frameworks',
                    description: 'There are a lot of tehm'
                }
            };
            request.post(options,
                (err, res, body) => {
                    expect(err).toBeNull();
                    Advertisements.findOne({
                            where: { id: this.advertisements.id }
                        })
                        .then((advertisements) => {
                            expect(advertisements.title).toBe('Advertisements');
                            done();
                        });
                });
        });
    });
});