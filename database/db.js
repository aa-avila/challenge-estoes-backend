const { Sequelize } = require('sequelize');
const database = require('./config');

const sequelize = new Sequelize(
    database.database,
    database.username,
    database.password,
    {
        host: database.host,
        port: database.port,
        dialect: database.dialect
    }
);

module.exports = sequelize;
