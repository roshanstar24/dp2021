const Sequelize = require('sequelize');
const dbConfig = require("./database.json");

const db = {};

connection = new Sequelize({
    dialect: dbConfig.dialect,
    database: dbConfig.database,
    username: dbConfig.username,
    password: dbConfig.password,
    host: dbConfig.host,
    port: dbConfig.port,
    operatorsAliases: false,
    logging: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

// db.Sequelize = connection;
// db.sequelize = connection;

module.exports = connection;


// connection
//     .authenticate()
//     .then(() => {
//         console.log("Connection Authenticated.")
//     })
//     .catch(err => { console.log(err) });

// module.exports = connection;