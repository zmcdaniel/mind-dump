'use strict';
module.exports = function(sequelize, DataTypes) {
  var post = sequelize.define('post', {
    content: DataTypes.TEXT,
    userid: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        models.post.belongsTo(models.user);
      }
    }
  });
  return post;
};