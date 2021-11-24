'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProjectAssignees extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProjectAssignees.init(
    {
      projectId: {
        type: DataTypes.INTEGER,
        unique: false,
        references: {
          model: 'Projects',
          key: 'id'
        }
      },
      userId: {
        type: DataTypes.INTEGER,
        unique: false,
        references: {
          model: 'Users',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      modelName: 'ProjectAssignees'
    }
  );
  return ProjectAssignees;
};
