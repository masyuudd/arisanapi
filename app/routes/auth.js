'use strict';

module.exports = function(app) {
  const Auth = require('../controller/auth');

  // get all users
  app.route('/api/auth/login').post(Auth.login);

}
