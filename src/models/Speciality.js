const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Speciality', {
        id: {
            type: DataTypes.INTEGER,
            primarykey: true,
            autoincrement: true,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    { timestamps: false })
};