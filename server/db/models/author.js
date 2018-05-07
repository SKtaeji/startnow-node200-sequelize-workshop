'use strict';
module.exports = (sequelize, DataTypes) => {
  var Author = sequelize.define('Author', {
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
      allowNull: false
    }
  }, {});
  Author.associate = function(models) {
    // associations can be defined here
    models.Author.hasMany(models.Blog, {as: 'blogs', foreignKey: 'authorId'})
  };
  return Author;
};