const projectsRepository = require('../repositories/projects');
const usersRepository = require('../repositories/users');
const paginateRequest = require('../services/paginateRequest');

const getAll = async (req) => {
  const limit = Number(req.query.limit);
  const maxCount = await projectsRepository.getCount();
  const paginationData = paginateRequest.pagination(
    limit,
    maxCount,
    req,
    'projects'
  );
  const projects = await projectsRepository.getAll(
    limit,
    paginationData.offset
  );

  // respuesta por defecto (pagina intermedia)
  let response = {
    count: projects.length,
    maxCount: paginationData.maxCount,
    previousPage: paginationData.previousPageUrl,
    nextPage: paginationData.nextPageUrl,
    data: projects
  };

  const page = paginationData.page;

  if (page == 1) {
    response.previousPage = null;
  }

  if (page == paginationData.lastPage) {
    response.nextPage = null;
  }

  return response;
};

const getById = async (id) => {
  const project = await projectsRepository.getById(id);
  if (!project) {
    const error = new Error('Project not found');
    error.status = 404;
    throw error;
  }
  return project;
};

const create = async (projectData) => {
  const { name, description, projectManagerId, projectStatusId, assignees } =
    projectData;

  //verificar que no exista el mismo nombre
  const projectExist = await projectsRepository.getByName(name);
  if (projectExist) {
    const error = new Error('Project name already exists');
    error.status = 400;
    throw error;
  }

  // verificar que existan ids de assignees en users
  if (assignees.length > 0) {
    // Promise para manejo asíncrono de forEach
    const checkUsers = new Promise((resolve, reject) => {
      assignees.forEach(async (value, index, array) => {
        const userExist = await usersRepository.getById(value);
        if (!userExist) {
          reject({ message: `The userId: ${value} doesen't exists` });
        }
        if (index === array.length - 1) resolve();
      });
    });

    try {
      await checkUsers.then(() => {
        console.log('ok!');
      });
    } catch (e) {
      console.log(e);
      const error = new Error(e.message);
      error.status = 400;
      throw error;
    }
  }

  // crear nuevo project
  const project = await projectsRepository.create(projectData);

  // agregar assignees en projectAssignees mediante ids assignees y project.id

  const newProject = await projectsRepository.getById(project.id);
  return newProject;
};

const update = async (
  id,
  { name, description, projectManagerId, assignees, projectStatusId }
) => {
  //traer projectAssigneesNew a partir de array assignees

  const project = await projectsRepository.getById(id);
  if (!project) {
    const error = new Error('Project not found');
    error.status = 404;
    throw error;
  }
  await projectsRepository.update(id, {
    name,
    description,
    projectManagerId,
    assignees,
    projectStatusId
  });
  return await projectsRepository.getById(id);
};

const remove = async (id) => {
  const response = await projectsRepository.getById(id);
  if (!response) {
    const error = new Error(`The project doesen't exists`);
    error.status = 404;
    throw error;
  }
  return await projectsRepository.remove(id);
};

module.exports = { getAll, getById, create, update, remove };
