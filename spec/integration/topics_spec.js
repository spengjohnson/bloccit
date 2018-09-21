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
            topics: {
                title: "blink-182 songs",
                description: "What's your favorite blink-182 song?"
            }
        };
        it('should create a new topic and redirect', (done) => {
            request.post(options,
                (err, res, body) => {
                    Topics.findOne({ where: { title: "blink-182 songs" } })
                        .then((topics) => {
                            //console.log("DEBUG - topics.title: " + topics.title);
                            //console.log(res);
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

    describe('GET /topics/:id', () => {
        it('should render a view with the selected topic', (done) => {
            request.get(`${base}${this.topics.id}`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain('JS Frameworks');
                done();
            });
        });
    });

    describe('POST /topics/:id/destroy', () => {
        it('should delete the topic with the associated ID', (done) => {
            Topics.all()
                .then((topics) => {
                    const topicCountBeforeDelete = topics.length;
                    expect(topicCountBeforeDelete).toBe(1);
                    request.post(`${base}${this.topics.id}/destroy`, (err, res, body) => {
                        Topics.all()
                            .then((topics) => {
                                expect(err).toBeNull();
                                expect(topics.length).toBe(topicCountBeforeDelete - 1);
                                done();
                            })
                    });
                });
        });
    });

    describe('GET /topics/:id/edit', () => {
        it('should render a view with an edit topic form', (done) => {
            request.get(`${base}${this.topics.id}/edit`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain('Edit Topic');
                expect(body).toContain('JS Frameworks');
                done();
            });
        });
    });

    describe('POST /topics/:id/update', () => {
        it('should update the topic with the given values', (done) => {
            const options = {
                url: `${base}${this.topics.id}/update`,
                form: {
                    title: 'JavaScript Frameworks',
                    description: 'There are a lot of them'
                }
            };
            request.post(options,
                (err, res, body) => {
                    expect(err).toBeNull();
                    Topics.findOne({
                            where: { id: this.topics.id }
                        })
                        .then((topics) => {
                            expect(topics.title).toBe('JavaScript Frameworks');
                            done();
                        });
                });
        });
    });
});