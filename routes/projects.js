const express = require('express');
const projectsRouter = express.Router();
const projectsController = require('../controllers/projects');
const pagination = require('../middlewares/pagination');

projectsRouter.get('/', pagination.validate, projectsController.getAll);

projectsRouter.get('/:id', projectsController.getById);

projectsRouter.post('/', projectsController.create);

projectsRouter.post('/:id', projectsController.update);

projectsRouter.delete('/:id', projectsController.remove);

module.exports = projectsRouter;
