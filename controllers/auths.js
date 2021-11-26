const authenticationsService = require('../services/auths');
const usersService = require('../services/users');
const securityService = require('../services/security');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existingUser = await usersService.existEmailUser(email);
    if (!existingUser) {
      const error = new Error(`The email provided doesen't exists`);
      error.status = 400;
      throw error;
    }

    const match = await authenticationsService.comparePasswords(
      password,
      existingUser.dataValues.password
    );

    if (!match) {
      const error = new Error('Invalid password or user');
      error.status = 400;
      throw error;
    }

    const { id, firstName, lastName, userRoleId } = existingUser.dataValues;
    const user = { id, firstName, lastName, email, userRoleId };

    const token = securityService.generateToken(existingUser.dataValues);
    res.status(200).json({
      accessToken: token,
      user
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { login };
