const Sequelize = require('sequelize');
const connection = require('./../database/connection');

const webcomponent_master = connection.define('webcomponent_master', {
    'id': {
        type: Sequelize.UUID,
        primaryKey: true,
        auto_increment: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
    },
    'name': { type: Sequelize.STRING, unique: true },
    'type': { type: Sequelize.STRING },
    'enabled': { type: Sequelize.BOOLEAN, defaultValue: true },
    'published_by': { type: Sequelize.STRING(99) },
    'last_modified_by': { type: Sequelize.STRING(99) }
})


webcomponent_master.sync({
//    force: true
}).then(() => {

    console.log("Web Component Table Done.");

})

module.exports = category_master;