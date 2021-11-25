'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    static associate(models) {
      Project.hasOne(models.User, { foreignKey: 'projectManagerId' });
      Project.belongsToMany(models.User, {
        through: 'ProjectAssignees',
        foreignKey: 'projectId'
      });
    }
  }
  Project.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true
      },
      projectManagerId: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      projectStatusId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: 'Project',
      paranoid: true
    }
  );
  return Project;
};
