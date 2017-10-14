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

  app.post('/api/geolocation', (req, res) => {
    const latitude = req.body.geoCoords.lat;
    const longitude = req.body.geoCoords.lng;

    yelp.searchBusiness({ term: "food", latitude, longitude, radius: 8046 })
      .then(function(data) {
        res.send(data);
      })
      .catch(err => {
        console.error(err);
      });
  });

  app.post('/api/search', (req, res) => {
    const area = req.body.area;
    yelp.searchBusiness({ term: "food, restaurants", location: area })
      .then(function (data) {
        res.send(data);
    })
    .catch(err => {
      console.error(err);
    });
  });

  app.post('/api/hours', (req, res) => {
    const id = req.body.id;
    yelp.getBusinessById(id)
      .then(function (data) {
        res.send(data);
      })
      .catch(err => {
        console.error(err);
      });
    });

  app.post('/api/reviews', (req, res) => {
    const id = req.body.id;
    yelp.getReviews(id)
      .then(function(data) {
        res.send(data);
      })
      .catch(err => {
        console.error(err);
      });
    });

  app.post('/api/yelplink', (req, res) => {
    const yelpUrl = req.body.urlLink;
    axios.get(yelpUrl)
      .then((resp) => {
        $ = cheerio.load(resp.data);

        const dailyHours = $('.u-space-r-half').text().trim();
        const healthGrade = $('.score-block').text().trim();

        let businessInfo = {};
        let keyArray = [];
        let valueArray = [];
        $('.short-def-list dl dt').each((i, element) => {
          const childArray = element.children;
          childArray.forEach(item => {
            const attributeKey = item.data.trim();
            keyArray.push(attributeKey);
          });
        });

        $('.short-def-list dl dd').each((i,element) =>  {
          const childArray = element.children;
          childArray.forEach(item => {
            const attributeValue = item.data.trim();
            valueArray.push(attributeValue);
          });
        });

        for(let i = 0; i < keyArray.length; i++) {
          businessInfo[keyArray[i]] = valueArray[i];
        };

        const summary = {
          dailyHours,
          healthGrade,
          businessInfo
        }

        res.send(summary);
      })
      .catch(err => {
        console.error(err);
      });
  })
}