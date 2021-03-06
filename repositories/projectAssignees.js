const db = require('../models');

const getById = async (id) => {
  const response = await db.ProjectAssignees.findByPk(id);
  return response;
};

const getByProjectId = async (projectId) => {
  const response = await db.ProjectAssignees.findAll({
    where: {
      projectId: projectId
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

const remove = async (data) => {
  const respose = await db.ProjectAssignees.destroy({
    where: data
  });
  return respose;
};

module.exports = {
  getById,
  getByProjectId,
  getByUserId,
  create,
  remove
};
