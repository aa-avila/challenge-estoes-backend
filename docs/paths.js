const authPaths = require('./auth');
const projectsPaths = require('./projects');

module.exports = {
  paths: {
    ...authPaths,
    ...projectsPaths
  }
};
