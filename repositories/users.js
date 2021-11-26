const db = require('../models');

const getAll = async () => {
  const response = await db.User.findAll();
  return response;
};

const getById = async (id) => {
  const response = await db.User.findByPk(id, {
    attributes: {
      exclude: ['password']
    }
  });
  return response;
};

const getByEmail = async (email) => {
  const response = await db.User.findOne({
    where: {
      email
    }
  });
  return response;
};

const create = async (userData) => {
  const user = await db.User.create(userData);
  return user;
};

module.exports = {
  getAll,
  getById,
  create,
  getByEmail
};
