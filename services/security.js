require('dotenv').config();
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  const userForToken = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    roleId: user.roleId
  };

  const token = jwt.sign(userForToken, process.env.SECRET_TOKEN, {
    expiresIn: '10h'
  });
  return token;
};

const verifyToken = (token) => {
  const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
  if (!decodedToken) {
    const error = new Error('Invalid token');
    error.status = 401;
    throw error;
  }
  return decodedToken;
};

module.exports = { generateToken, verifyToken };
