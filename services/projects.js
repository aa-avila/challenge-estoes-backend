const projectsRepository = require('../repositories/projects');
const usersRepository = require('../repositories/users');
const projectAssigneesRepository = require('../repositories/projectAssignees');
const paginateRequest = require('../services/paginateRequest');

const verifyAsignees = async (assignees) => {
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
};

const mapProjectResponse = (project) => {
  const assignees = project.assignees;

  const assigneesMap = assignees.map((item) => {
    const newItem = {
      userId: item.id,
      firstName: item.firstName,
      lastName: item.lastName
    };
    return newItem;
  });

  const projectResponse = {
    id: project.id,
    name: project.name,
    projectStatus: project.projectStatus,
    projectManager: project.projectManager,
    assignees: assigneesMap,
    createdAt: project.createdAt,
    updatedAt: project.updatedAt
  };
  return projectResponse;
};

const assigneeMultipleInsert = async (assignees, projectId) => {
  if (assignees.length > 0) {
    const addEntries = new Promise((resolve, reject) => {
      assignees.forEach(async (value, index, array) => {
        const data = {
          userId: value,
          projectId: projectId
        };
        const assignCreated = await projectAssigneesRepository.create(data);
        if (!assignCreated) {
          reject({
            message: `There was an error adding the user: ${value} to projectAssignees.`
          });
        }
        if (index === array.length - 1) resolve();
      });
    });
    try {
      await addEntries.then(() => {
        console.log('ok!');
      });
    } catch (e) {
      console.log(e);
      const error = new Error(e.message);
      error.status = 400;
      throw error;
    }
  }
};

const assigneeMultipleDelete = async (assignees, projectId) => {
  if (assignees.length > 0) {
    const deleteEntries = new Promise((resolve, reject) => {
      assignees.forEach(async (value, index, array) => {
        const data = {
          userId: value,
          projectId: projectId
        };
        const assignRemoved = await projectAssigneesRepository.remove(data);
        if (index === array.length - 1) resolve();
      });
    });
    try {
      await deleteEntries.then(() => {
        console.log('ok!');
      });
    } catch (e) {
      console.log(e);
      const error = new Error(e.message);
      error.status = 400;
      throw error;
    }
  }
};

/****************************************************** */

const getAll = async (req) => {
  const limit = Number(req.query.limit);
  const maxCount = await projectsRepository.getCount();
  const paginationData = paginateRequest.pagination(
    limit,
    maxCount,
    req,
    'projects'
  );

  const filter = req.query.name;

  const projects = await projectsRepository.getAll(
    limit,
    paginationData.offset,
    filter
  );

  let projectsResponse = [];

  projects.forEach((proj) => {
    const project = mapProjectResponse(proj);

    projectsResponse.push(project);
  });

  // respuesta por defecto (pagina intermedia)
  let response = {
    count: projectsResponse.length,
    maxCount: paginationData.maxCount,
    previousPage: paginationData.previousPageUrl,
    nextPage: paginationData.nextPageUrl,
    data: projectsResponse
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

  const projectMapped = mapProjectResponse(project);

  return projectMapped;
};

const create = async (projectData) => {
  const { name, assignees } = projectData;

  //verificar que no exista el mismo nombre
  const projectExist = await projectsRepository.getByName(name);
  if (projectExist) {
    const error = new Error('Project name already exists');
    error.status = 400;
    throw error;
  }

  // verificar que existan ids de assignees en users
  await verifyAsignees(assignees);

  // crear nuevo project
  const project = await projectsRepository.create(projectData);

  // agregar assignees en projectAssignees mediante ids assignees y project.id
  await assigneeMultipleInsert(assignees, project.id);

  const newProject = await projectsRepository.getById(project.id);

  const newProjectMapped = mapProjectResponse(newProject);

  return newProjectMapped;
};

const update = async (id, projectData) => {
  const { name, description, projectManagerId, assignees, projectStatusId } =
    projectData;

  // verificar que exista el proyecto
  const project = await projectsRepository.getById(id);
  if (!project) {
    const error = new Error('Project not found');
    error.status = 404;
    throw error;
  }

  //verificar que no exista el mismo nombre
  const projectExist = await projectsRepository.getByName(name);
  if (projectExist && projectExist.id != id) {
    const error = new Error('Project name already exists');
    error.status = 400;
    throw error;
  }

  // verificar ids de assignees
  await verifyAsignees(assignees);

  // update project basic data
  await projectsRepository.update(id, {
    name,
    description,
    projectManagerId,
    projectStatusId
  });

  // projectAssignees de ESTE proyecto existentes en bd
  const projectAssigneesOld = await projectAssigneesRepository.getByProjectId(
    id
  );

  //array de assigneesOld
  const assigneesOld = projectAssigneesOld.map((item) => {
    return item.dataValues.userId;
  });

  // array de nuevos assignees a agregar
  let assigneesToAdd = assignees.filter((x) => !assigneesOld.includes(x));

  // array de nuevos assignees a eliminar
  let assigneesToRemove = assigneesOld.filter((x) => !assignees.includes(x));

  // Agregar nuevos assignees a BD
  await assigneeMultipleInsert(assigneesToAdd, id);

  // Eliminar los que ya no pertenecen al proyecto
  await assigneeMultipleDelete(assigneesToRemove, id);

  // Devolver actualizado
  const updatedProject = await projectsRepository.getById(id);

  const updatedProjectMapped = mapProjectResponse(updatedProject);

  return updatedProjectMapped;
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
