const authRouter = require('express').Router();
const authsController = require('../controllers/auths');
const usersMiddlewares = require('../middlewares/users');

authRouter.post(
  '/login',
  usersMiddlewares.validateLogin,
  authsController.login
);

module.exports = authRouter;
