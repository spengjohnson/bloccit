const sequelize = require("../../src/db/models").sequelize;
const Topics = require("../../src/db/models").Topics;
const Post = require("../../src/db/models").Post;

describe('Topics', () => {
    beforeEach((done) => {
        this.topics;
        this.post;
        sequelize.sync({ force: true }).then((res) => {
            Topics.create({
                    title: "New Topic",
                    description: "text about new topic"
                })
                .then((topics) => {
                    this.topics = topics;

                    Post.create({
                            title: "My first post",
                            body: "this is text about my first post",
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
        it('should create a topic object that is created and stored in the database', (done) => {
            Topics.create({
                    //object goes here 
                    title: 'Topic of discussion',
                    description: 'Here is what I have to say'
                })
                .then((topics) => {
                    expect(topics.title).toBe('Topic of discussion');
                    expect(topics.description).toBe('Here is what I have to say');
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
        });
    });

    describe('#getPosts()', () => {
        it('should create and associate a post with the topic in scope', (done) => {
            this.topics.getPosts(newPost)
                .then((newPost) => {
                    expect(newPost.topicId).toBe(this.topics.id);
                });
        });
        it('should return an array of Post objects that are associated with the topic', (done) => {
            this.Topics.getPosts()
                .then((arrayOfPosts) => {
                    expect(arrayOfPosts.title).toBe('New Topic');
                    done();
                });
        });
        it('should confirm that the associated post is returned when called', (done) => {
            this.topics.getPosts().then((posts) => {
                expect(posts[0].title).toContain("My first post");
                expect(posts[0].body).toContain("this is text about my first post");
                done();
            });

        });
    });
});

//Will return an array of Post objects that are associated with the topic that the method was called on.