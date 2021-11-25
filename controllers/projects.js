const projectsService = require('../services/projects');

const getAll = async (req, res, next) => {
  try {
    const response = await projectsService.getAll(req);
    res.status(200).json({
      status: 200,
      ...response
    });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const project = await projectsService.getById(req.params.id);
    if (project) {
      return res.status(200).json({
        status: 200,
        data: project
      });
    } else {
      const error = new error(`Project Not Found`);
      error.status = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const project = await projectsService.create(req.body);
    res.status(200).json({
      success: true,
      msg: `The project:${project.id}  has been created`,
      data: project
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const project = await projectsService.update(req.params.id, req.body);
    res.status(200).json({
      success: true,
      msg: `The project: ${project.id} has been updated`,
      data: project
    });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const project = await projectsService.getById(req.params.id);
    if (!project) {
      const error = new error(`Project not found`);
      error.status = 404;
      throw error;
    }
    await projectsService.remove(project.id);

    res.status(200).json({
      status: 200,
      success: true,
      msg: `Project ${req.params.id} removed succesfully`
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
