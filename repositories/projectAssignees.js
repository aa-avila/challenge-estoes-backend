const db = require('../models');

const getAll = async () => {
  const response = await db.ProjectAssignees.findAll();
  return response;
};

const getById = async (id) => {
  const response = await db.ProjectAssignees.findByPk(id);
  return response;
};

const getByProjectId = async (projectId) => {
  const response = await db.ProjectAssignees.findAll({
    where: {
      userId: projectId
    }
  });
  return response;
};

const getByUserId = async (userId) => {
  const response = await db.ProjectAssignees.findAll({
    where: {
      userId: userId
    }
  });
  return response;
};

const create = async (data) => {
  const user = await db.ProjectAssignees.create(data);
  return user;
};

const remove = async (id) => {
  const respose = await db.ProjectAssignees.destroy({
    where: {
      id
    }
  });
  return respose;
};

module.exports = {
  getAll,
  getById,
  getByProjectId,
  getByUserId,
  create,
  remove
};
