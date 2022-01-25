const sequelize = require('sequelize');
const database = require('../libs/database');

const { INTEGER, STRING } = sequelize

const User = database.define('user', {
    id: {
        type: INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: STRING,
        allowNull: false
    },
    phone: {
        type: STRING,
        unique: true
    },
    email: {
        type: STRING,
        unique: true
    },
    password: {
        type: STRING,
    },
})

module.exports = User;