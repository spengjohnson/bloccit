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
    getTopic(id, callback) {
        return Topics.findById(id)
            .then((topics) => {
                callback(null, topics);
            })
            .catch((err) => {
                callback(err);
            })
    },
    addTopic(newTopic, callback) {
        return Topics.create({
                title: newTopic.title,
                description: newTopic.description
            })
            .then((topics) => {
                callback(null, topics);
            })
            .catch((err) => {});
    },
    deleteTopic(id, callback) {
        return Topics.destroy({
                where: { id }
            })
            .then((topics) => {
                callback(null, topics);
            })
            .catch((err) => {
                callback(err);
            })
    },
    updateTopic(id, updatedTopic, callback) {
        return Topics.findById(id)
            .then((topics) => {
                if (!topics) {
                    return callback('Topic not found');
                }
                topics.update(updatedTopic, {
                    fields: Object.keys(updatedTopic)
                })

                .then(() => {
                        callback(null, topics);
                    })
                    .catch((err) => {
                        callback(err);
                    });
            });
    }
}