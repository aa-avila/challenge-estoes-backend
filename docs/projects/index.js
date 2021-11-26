const getAll = require('./getAll');
const getById = require('./getById');
const create = require('./create');
const update = require('./update');
const remove = require('./remove');

module.exports = {
  '/projects': {
    ...getAll,
    ...create
  },
  '/projects/{id}': {
    ...getById,
    ...update,
    ...remove
  }
};
