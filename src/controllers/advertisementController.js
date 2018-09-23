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
    }
}