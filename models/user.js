'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.UserRole, { foreignKey: 'userRoleId' });
      User.hasMany(models.Project, {
        as: 'projectManager',
        foreignKey: 'projectManagerId'
      });
      User.belongsToMany(models.Project, {
        through: 'ProjectAssignees',
        as: 'assignees',
        foreignKey: 'userId'
      });
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      userRoleId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 2
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: 'User',
      paranoid: true
    }
  );
  return User;
};
