const express = require('express');
const projectsRouter = express.Router();
const projectsController = require('../controllers/projects');
const projectsMiddlewares = require('../middlewares/projects');
const authsMiddlewares = require('../middlewares/auths');
const pagination = require('../middlewares/pagination');

projectsRouter.get(
  '/',
  authsMiddlewares.isLogged,
  pagination.validate,
  projectsController.getAll
);

projectsRouter.get(
  '/:id',
  authsMiddlewares.isLogged,
  projectsController.getById
);

projectsRouter.post(
  '/',
  authsMiddlewares.isAdmin,
  projectsMiddlewares.validateProject,
  projectsController.create
);

projectsRouter.post(
  '/:id',
  authsMiddlewares.isAdmin,
  projectsMiddlewares.validateProject,
  projectsController.update
);

projectsRouter.delete(
  '/:id',
  authsMiddlewares.isAdmin,
  projectsController.remove
);

module.exports = projectsRouter;
