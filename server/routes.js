/*const passport = require('passport');
const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');*/
const Yelp = require('node-yelp-api-v3');
const { foursquare, yelpv3 } = require('../config.js');
const axios = require('axios');
const querystring = require('querystring');

/*const requireLogin = passport.authenticate('local', { session: false });*/

const yelp = new Yelp({
  consumer_key: yelpv3.app_id,
  consumer_secret: yelpv3.app_secret
})

module.exports = (app) => {
  /*app.post('/login', requireLogin, Authentication.login);
  app.post('/register', Authentication.register);*/

/********************************************************************
  Yelp API Calls
********************************************************************/

  app.post('/yelp/area', (req, res) => {
    const latitude = req.body.geoCoords.lat;
    const longitude = req.body.geoCoords.lng;
    
    yelp.searchBusiness({ term: "food, restaurants", latitude, longitude, radius: 8046, limit: 30 })
      .then(function (data) {
        res.send(data);
    })
    .catch(err => {
      console.error(err);
    });
  });

  app.post('/yelp/business-details', (req, res) => {
    const id = req.body.id;
    yelp.getBusinessById(id)
      .then(function (data) {
        res.send(data);
    })
    .catch(err => {
      console.error(err);
    });
  });

/********************************************************************
  Foursquare API Calls
********************************************************************/

  app.get('/foursquare', (req, res) => {
    const exploreHostStr = `https://api.foursquare.com/v2/venues/explore?`;
    const params = querystring.stringify({
      v: 20170101,
      client_id: foursquare.clientId,
      client_secret: foursquare.clientSecret,
      ll: '33.7701,-118.1937',
      section: 'food',
      limit: 50
    });
    
    const queryStr = exploreHostStr.concat(params);
    axios.get(queryStr)
      .then(response => {
        res.send(response.data);
      })
      .catch(err => {
        console.error(err);
      })
  })

  app.get('/trending', (req, res) => {
    const trendingHostStr = `https://api.foursquare.com/v2/venues/trending?`;
    const params = querystring.stringify({
      v: 20170101,
      client_id: foursquare.clientId,
      client_secret: foursquare.clientSecret,
      ll: '33.7701,-118.1937',
      limit: 50
    });

    const queryStr = trendingHostStr.concat(params);
    axios.get(queryStr)
      .then(response => {
        res.send(response.data);
      })
      .catch(err => {
        console.error(err);
      })
  })

  app.get('/new', (req, res) => {
    const latitude = 33.7701;
    const longitude = -118.1937;

    yelp.searchBusiness({ term: "food, restaurants", latitude, longitude, radius: 8046, limit: 30 })
      .then(function(data) {
        //console.log('DATA: ', data)
        res.send(data);
      })
      .catch(err => {
        console.error(err);
      });
  })

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

/*  app.post('/api/hours', (req, res) => {
    const id = req.body.id;
    yelp.getBusinessById(id)
      .then(function (data) {
        res.send(data);
      })
      .catch(err => {
        console.error(err);
      });
    });*/

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