const Sequelize = require('sequelize');

const sequelize = new Sequelize('desikmny_dplife', 'desikmny', 'Mostwanted@24', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

sequelize.define('customer', {
    UUIDss: {
        type: Sequelize.UUID,
        primaryKey: true
    }
})

sequelize.sync({
    force: true
}).then(() => {
    console.log("connection done")
})