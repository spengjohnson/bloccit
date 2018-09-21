const topicQueries = require('../db/queries.topics.js');

module.exports = {
    index(req, res, next) {

        topicQueries.getAllTopics((err, topics) => {
            if (err) {
                res.redirect(500, 'static/index');
            } else {
                res.render('topics/index', { topics });
            }
        });
    },
    new(req, res, next) {
        res.render('topics/new');
    },
    create(req, res, next) {
        let newTopic = {
            title: req.body.title,
            description: req.body.description
        };
        topicQueries.addTopic(newTopic, (err, topics) => {
            if (err) {
                res.redirect(500, '/topics/new');
            } else {
                res.redirect(303, `/topics/${topics.id}`);
            }
        })
    },
    show(req, res, next) {
        topicQueries.getTopic(req.params.id, (err, topics) => {
            if (err || topics == null) {
                res.redirect(404, '/');
            } else {
                res.render('topics/show', { topics });
            }
        });
    },
    destroy(req, res, next) {
        topicQueries.deleteTopic(req.params.id, (err, topics) => {
            if (err) {
                res.redirect(500, `/topics/${topics.id}`)
            } else {
                res.redirect(303, '/topics')
            }
        });
    },
    edit(req, res, next) {
        topicQueries.getTopic(req.params.id, (err, topics) => {
            if (err || topics == null) {
                res.redirect(404, '/');
            } else {
                res.render('topics/edit', { topics });
            }
        });
    },
    update(req, res, next) {
        topicQueries.updateTopic(req.params.id, req.body, (err, topics) => {
            if (err || topics == null) {
                res.redirect(404, `/topics/${topics.id}`);
            }
        });
    }
}