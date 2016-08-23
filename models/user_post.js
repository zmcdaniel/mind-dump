'use strict';
module.exports = function(sequelize, DataTypes) {
  var user_post = sequelize.define('user_post', {
    content: DataTypes.TEXT,
    user_id: DataTypes.INT,
    metadata_id: DataTypes.INT
  }, {
    classMethods: {
      associate: function(models) {
        models.user_post.belongsTo(models.user);
      }
    }
  });
  return user_post;
};