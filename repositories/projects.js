const db = require('../models');

const getAll = async (limit, offset) => {
  const response = await db.Project.findAll({
    limit: limit,
    offset: offset
  });
  return response;
};

const getById = async (id) => {
  const response = await db.Project.findOne({
    where: {
      id: id
    },
    attributes: {
      exclude: ['projectManagerId', 'projectStatusId']
    },
    include: [
      {
        model: db.User,
        as: 'projectManager',
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'deletedAt', 'password']
        }
      },
      {
        model: db.User,
        as: 'assignees',
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      },
      {
        model: db.ProjectStatus,
        as: 'projectStatus',
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      }
    ]
  });
  return response;
};

const getCount = async () => {
  const response = await db.Project.count();
  return response;
};

const create = async (data) => {
  const response = await db.Project.create(data);
  return response;
};

const update = async (id, data) => {
  const response = await db.Project.update(data, {
    where: {
      id
    }
  });
  return response;
};

const remove = async (id) => {
  const response = await db.Project.destroy({
    where: {
      id
    }
  });
  return response;
};

module.exports = {
  getAll,
  getById,
  getCount,
  create,
  update,
  remove
};
