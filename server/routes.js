const passport = require('passport');
const Authentication = require('./controllers/Authentication');
const passportService = require('./services/passport');

const requireLogin = passport.authenticate('local', { session: false });

module.exports = (app) => {
  app.post('/login', requireLogin, Authentication.login);
  app.post('/register', Authentication.register);
}