const request = require('request');
const server = require('../../src/server');
const base = 'http://localhost:3000/topics/';
const sequelize = require('../../src/db/models/index').sequelize;
const Topics = require('../../src/db/models').Topics;

describe('routes : topics', () => {

    beforeEach((done) => {
        this.topics;
        sequelize.sync({ force: true }).then((res) => {
            Topics.create({
                    title: 'JS Frameworks',
                    description: "There are a lot of them"
                })
                .then((topics) => {
                    this.topics = topics;
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
    describe('GET /topics', () => {
        it('should return a status code 200 and all topics', (done) => {
            request.get(base, (err, res, body) => {
                expect(res.statusCode).toBe(200);
                expect(err).toBeNull();
                expect(body).toContain('Topics');
                expect(body).toContain('JS Frameworks');
                done();
            });
        });
    });
    describe('GET /topics/new', () => {
        it('should render a new topic form', (done) => {
            request.get(`${base}new`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain('New Topic');
                done();
            });
        });
    });
    describe('POST /topics/create', () => {
        const options = {
            url: `${base}create`,
            form: {
                title: "blink-182 songs",
                description: "What's your favorite blink-182 song?"
            }
        };
        it('should create a new topic and redirect', (done) => {
            request.post(options,
                (err, res, body) => {
                    Topics.findOne({ where: { title: "blink-182 songs" } })
                        .then((topics) => {
                            expect(res.statusCode).toBe(303);
                            expect(topics.title).toBe("blink-182 songs");
                            expect(topics.description).toBe("What's your favorite blink-182 song?");
                            done();
                        })
                        .catch((err) => {
                            console.log(err);
                            done();
                        });
                });
        });
    });
});