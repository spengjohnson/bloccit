'use strict';
module.exports = (sequelize, DataTypes) => {
    var Topics = sequelize.define('Topics', {
        git
        title: DataTypes.STRING
    }, {});
    Topics.associate = function(models) {
        Topics.hasMany(models.Banner, {
            foreignKey: 'topicId',
            as: 'banners',
        });
        Topics.hasMany(models.Rule, {
            foreignKey: 'topicId',
            as: 'rules',
        });
    };
    return Topics;
};