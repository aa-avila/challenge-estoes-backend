const express = require('express');
const projectsRouter = express.Router();
const projectsController = require('../controllers/projects');
const projectsMiddlewares = require('../middlewares/projects');
const pagination = require('../middlewares/pagination');

projectsRouter.get('/', pagination.validate, projectsController.getAll);

projectsRouter.get('/:id', projectsController.getById);

projectsRouter.post(
  '/',
  projectsMiddlewares.validateProject,
  projectsController.create
);

projectsRouter.post(
  '/:id',
  projectsMiddlewares.validateProject,
  projectsController.update
);

projectsRouter.delete('/:id', projectsController.remove);

module.exports = projectsRouter;
