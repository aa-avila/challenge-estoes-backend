const getAll = require('./getAll');
const getById = require('./getById');
const getFiltered = require('./getFiltered');
const create = require('./create');
const update = require('./update');
const remove = require('./remove');

module.exports = {
  '/projects': {
    ...getAll,
    ...create,
    ...getFiltered
  },
  '/projects/{id}': {
    ...getById,
    ...update,
    ...remove
  }
};
