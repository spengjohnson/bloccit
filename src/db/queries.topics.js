const Topics = require('./models').Topics;

module.exports = {
    getAllTopics(callback) {
        return Topics.all()
            .then((topics) => {
                callback(null, topics);
            })
            .catch((err) => {
                callback(err);
            });
    },
    addTopic(newTopic, callback) {
        return Topics.create({
                title: newTopic.title,
                description: newTopic.description
            })
            .then((topic) => {
                callback(null, topics);
            })
            .catch((err) => {
                callback(err);
            });
    }
}