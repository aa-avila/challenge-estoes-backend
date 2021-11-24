'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProjectStatus extends Model {
    static associate(models) {
      ProjectStatus.hasMany(models.Project);
    }
  }
  ProjectStatus.init(
    {
      status: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'ProjectStatus'
    }
  );
  return ProjectStatus;
};
