'use strict';
module.exports = (sequelize, DataTypes) => {
    var Topics = sequelize.define('Topics', {
        title: DataTypes.STRING
    }, {});
    Topics.associate = function(models) {
        Topics.hasMany(models.Banner, {
            foreignKey: 'topicId',
            as: 'banners',
        });
    };
    return Topics;
};