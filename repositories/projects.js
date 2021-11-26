const db = require('../models');
const { Op } = require('sequelize');

const getAll = async (limit, offset, filter) => {
  let query = {};
  if (filter) {
    query = {
      name: {
        [Op.substring]: filter // permite que el name no este completo, es decir que sea una subcadena
      }
    };
  }
  const response = await db.Project.findAll({
    limit: limit,
    offset: offset,
    where: query,
    attributes: {
      exclude: ['deletedAt', 'projectManagerId', 'projectStatusId']
    },
    include: [
      {
        model: db.User,
        as: 'projectManager',
        attributes: {
          exclude: [
            'createdAt',
            'updatedAt',
            'deletedAt',
            'password',
            'email',
            'userRoleId'
          ]
        }
      },
      {
        model: db.User,
        as: 'assignees',
        attributes: {
          exclude: [
            'createdAt',
            'updatedAt',
            'deletedAt',
            'password',
            'email',
            'userRoleId'
          ]
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

const getById = async (id) => {
  const response = await db.Project.findOne({
    where: {
      id: id
    },
    attributes: {
      exclude: ['deletedAt', 'projectManagerId', 'projectStatusId']
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
          exclude: ['createdAt', 'updatedAt', 'deletedAt']
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

const getByName = async (name) => {
  const response = await db.Project.findOne({
    where: {
      name: name
    },
    attributes: {
      exclude: ['deletedAt', 'projectManagerId', 'projectStatusId']
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
          exclude: ['createdAt', 'updatedAt', 'deletedAt']
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
  getByName,
  getCount,
  create,
  update,
  remove
};
