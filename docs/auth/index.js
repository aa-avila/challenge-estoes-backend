const login = require('./login');

module.exports = {
  '/auth/login': {
    ...login
  }
};
