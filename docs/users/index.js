const getAll = require('./getAll');
const getById = require('./getById');

module.exports = {
  '/users': {
    ...getAll,
    ...getById
  }
};
