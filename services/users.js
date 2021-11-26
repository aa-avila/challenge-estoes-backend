const usersRepository = require('../repositories/users');

const getAll = async () => {
  const users = await usersRepository.getAll();
  return users;
};

const getById = async (id) => {
  return await usersRepository.getById(id);
};

const existEmailUser = async (email) => {
  const user = await usersRepository.getByEmail(email);
  return user;
};

module.exports = {
  getAll,
  getById,
  existEmailUser
};
