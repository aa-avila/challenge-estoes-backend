const projectsRepository = require('../repositories/projects');
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

  // respuestas pagina 1
  if (page == 1) {
    response.previousPage = null;
  }

  if (page == paginationData.lastPage) {
    //devuelve solo data
    response.nextPage = null;
  }

  return response;
};

const getById = async (id) => {
  const projects = await projectsRepository.getById(id);
  if (!projects) {
    const error = new Error('Project not found');
    error.status = 404;
    throw error;
  }
  return projects;
};

const create = async (projectData) => {
  return await projectsRepository.create(projectData);
};

const update = async (
  id,
  { name, description, projectManagerId, assignees, projectStatusId }
) => {
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
