'use strict';
module.exports = (sequelize, DataTypes) => {
  var Author = sequelize.define('Author', {
    firstName: DataTypes.STRING,
    lastName:  DataTypes.STRING,
    email: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        Author.hasMany(models.Blog, {
          as: 'blogs',
          foreignKey: 'authorId',
          sourceKey: 'id'
        });
      }
  }});
  
  // Author.associate = function(models) {
  //   // associations can be defined here
  //   models.Author.hasMany(models.Blog, {as: 'blogs', foreignKey: 'authorId'})
  // }

  return Author;
};