'use strict';
module.exports = (sequelize, DataTypes) => {
  var Blog = sequelize.define('Blog', {
    title: DataTypes.STRING,
    authorId: DataTypes.INTEGER,
    article: DataTypes.TEXT,
    featured: DataTypes.BOOLEAN,
    published: DataTypes.DATE
  }, {});

  Blog.associate = function(models) {
    // associations can be defined here
    models.Blog.belongsTo(models.Author, {foreignKey: 'authorId'})
  }
  
  return Blog;
};