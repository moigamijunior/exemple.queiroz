const { Sequelize } = require('sequelize');

/**
 * OLD
 */
/*
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: 'mariadb',
        dialectOptions: {
            useUTC: false, // for reading from database
        },
        timezone: '-03:00', // for writing to database
    }
);
*/

/**
 * NEW
 */
// process.env chama uma variável de ambiente que tem o nome MB_DB...
// você pode substituí-la pelo URI do seu mariadb ou outro db, mas lembre-se
// de instalar o sequelize package referente ao DB.
const sequelize = new Sequelize(process.env.MB_DB_CONNECTION_URI);

(async () => {
    try {
        await sequelize.sync();
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})()

module.exports = sequelize;