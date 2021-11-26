const db = require('../models');

const getAll = async () => {
  const roles = await db.UserRole.findAll();
  return roles;
};

const getById = async (id) => {
  const role = await db.UserRole.findByPk(id);
  return role;
};

const getByName = async (name) => {
  const role = await db.UserRole.findOne({
    where: {
      role: name
    }
  });
  return role;
};

module.exports = {
  getAll,
  getById,
  getByName
};
