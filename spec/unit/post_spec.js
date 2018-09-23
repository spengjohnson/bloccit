const sequelize = require("../../src/db/models").sequelize;
const Topic = require("../../src/db/models").Topic;

describe('Post', () => {
    beforeEach((done) => {
        this.topics;
        this.post;
        sequelize.sync({ force: true }).then((res) => {
            Topics.create({
                    title: 'Expeditions to Alpha Centauri',
                    description: 'A complication of reports from recent visits to the star system.'
                })
                .then((topic) => {
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
    });
});