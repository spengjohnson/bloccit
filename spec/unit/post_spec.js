const sequelize = require("../../src/db/models").sequelize;
const Topics = require("../../src/db/models").Topics;
const Post = require("../../src/db/models").Post;

describe('Post', () => {
    beforeEach((done) => {
        this.topics;
        this.post;
        sequelize.sync({ force: true }).then((res) => {
            Topics.create({
                    title: 'Expeditions to Alpha Centauri',
                    description: 'A complication of reports from recent visits to the star system.'
                })
                .then((topics) => {
                    this.topics = topics;
                    Post.create({
                            title: 'My first visit to Proxima Centauri b',
                            body: 'I saw some rocks.',
                            topicId: this.topics.id
                        })
                        .then((post) => {
                            this.post = post;
                            done();
                        });
                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
        });
    });
    describe('#create()', () => {
        it('should create a post object with a title, body and assigned topic', (done) => {
            Post.create({
                    title: 'Pros of Cryosleep during the long journey',
                    body: "1. Not having to answer 'are we there yet?' question.",
                    topicId: this.topics.id
                })
                .then((post) => {
                    expect(post.title).toBe('Pros of Cryosleep during the long journey');
                    expect(post.body).toBe("1. Not having to answer 'are we there yet?' question.");
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
        });

        it('should not create a post with missing title, body, or assigned topic', (done) => {
            Post.create({
                    title: 'Pros of Cryosleep during the long journey'
                })
                .then((post) => {
                    done();
                })
                .catch((err) => {
                    expect(err.message).toContain('Post.body cannot be null');
                    expect(err.message).toContain('Post.topicId cannot be null');
                    done();
                })
        });
    });

    describe('#setTopic()', () => {
        it('should associate a topic and a post together', (done) => {
            Topics.create({
                    title: 'Challenges of interstellar travel',
                    description: '1. The Wi-Fi is terrible'
                })
                .then((newTopic) => {
                    expect(this.post.topicId).toBe(this.topics.id);
                    this.post.setTopic(newTopic)
                        .then((post) => {
                            expect(post.topicId).toBe(newTopic.id);
                            done();
                        });
                });
        });
    });
    describe('#getTopic()', () => {
        it('should return the associated topic', (done) => {
            this.post.getTopic()
                .then((associatedTopic) => {
                    expect(associatedTopic.title).toBe('Expeditions to Alpha Centauri');
                    done();
                });
        });
    });
});