const Advertisements = require('./models').Advertisements;

module.exports = {
    getAllAdvertisements(callback) {
        return Advertisements.all()
            .then((advertisements) => {
                callback(null, advertisements);
            })
            .catch((err) => {
                callback(err);
            })
    },
    getAdvertisement(id, callback) {
        return Advertisements.findById(id)
            .then((advertisements) => {
                callback(null, advertisements);
            })
            .catch((err) => {
                callback(err);
            })
    },
    addAdvertisements(newAdvertisement, callback) {
        return Advertisements.create({
                title: newAdvertisement.title,
                description: newAdvertisement.description
            })
            .then((advertisements) => {
                callback(null, advertisements);
            })
            .catch((err) => {
                callback(err);
            })
    },
    deleteAdvertisements(id, callback) {
        return Advertisements.destroy({
                where: { id }
            })
            .then((advertisements) => {
                callback(null, advertisements);
            })
            .catch((err) => {
                callback(err);
            })
    },
    updateAdvertisements(id, updateAdvertisements, callback) {
        return Advertisements.findById(id)
            .then((advertisements) => {
                if (!advertisements) {
                    return callback('Ad not found');
                }
            })
            .then(() => {
                callback(null, advertisements)
            })
            .catch((err) => {
                callback(err);
            });
    }
}