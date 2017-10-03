const passport = require('passport');
const Authentication = require('./controllers/Authentication');
const passportService = require('./services/passport');
const Yelp = require('node-yelp-api-v3');
var { yelpv3 } = require('../config.js');

const requireLogin = passport.authenticate('local', { session: false });

const yelp = new Yelp({
  consumer_key: yelpv3.app_id,
  consumer_secret: yelpv3.app_secret
})

module.exports = (app) => {
  app.post('/login', requireLogin, Authentication.login);
  app.post('/register', Authentication.register);

  app.post('/geolocation', (req, res) => {
    const latitude = req.body.geoCoords.lat;
    const longitude = req.body.geoCoords.lng;

    yelp.searchBusiness({ term: "food", latitude, longitude })
      .then(function(data) {
        res.send(data);
      })
      .catch(err => {
        console.error(err);
      });
  });
}