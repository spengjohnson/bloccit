const adQueries = require('../db/queries.advertisements.js');

module.exports = {
    index(req, res, next) {
        adQueries.getAllAdvertisements((err, advertisements) => {
            if (err) {
                res.redirect(500, 'advertisements/index');
            } else {
                res.render('advertisements/index', { advertisements });
            }
        })
    },
    new(req, res, next) {
        res.render('advertisements/new');
    },
    create(req, res, next) {
        let newAdvertisement = {
            title: req.body.title,
            description: req.body.description
        };
        adQueries.addAdvertisements(newAdvertisement, (err, advertisements) => {
            if (err) {
                res.redirect(500, '/advertisements/new');
            } else {
                res.redirect(303, `/advertisements/${advertisements.id}`);
            }
        });
    },
    show(req, res, next) {
        adQueries.getAdvertisement(req.params.id, (err, advertisements) => {
            if (err || advertisements == null) {
                res.redirect(404, '/');
            } else {
                res.render('advertisements/show', { advertisements });
            }
        });
    },
    destroy(req, res, next) {
        adQueries.deleteAdvertisements(req.params.id, (err, advertisements) => {
            if (err) {
                res.redirect(500, `/advertisements/${advertisements.id}`)
            } else {
                res.redirect(303, '/advertisements')
            }
        });
    },
    edit(req, res, next) {
        adQueries.getAdvertisement(req.params.id, (err, advertisements) => {
            if (err || advertisements == null) {
                console.log(err);
                res.redirect(404, '/');
            } else {
                res.render('advertisements/edit', { advertisements });
            }
        });
    },
    update(req, res, next) {
        adQueries.updateAdvertisements(req.params.id, req.body, (err, advertisements) => {
            if (err || advertisements == null) {
                res.redirect(404, `/advertisements/${req.params.id}/edit`);
            } else {
                res.redirect(`/advertisements/${advertisements.id}`);
            }
        });
    }
}