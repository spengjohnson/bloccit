module.exports = {
    index(req, res, next) {
        res.render('static/index', { title: 'Welcome to Bloccit' });
    }
}

// module.exports = {
//     index(req, res, next){
//         res.render('static.index', { about: 'About Us'}); 
//     }
// }