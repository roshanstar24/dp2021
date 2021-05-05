const Sequelize = require('sequelize');
const connection = require('./../database/connection');

const tag_master = connection.define('tag_master', {
    'id': {
        type: Sequelize.UUID,
        primaryKey: true,
        auto_increment: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
    },
    'name': { type: Sequelize.STRING, unique: true },
    'description': { type: Sequelize.STRING },
    'enabled': { type: Sequelize.BOOLEAN, defaultValue: true },
    'published_by': { type: Sequelize.STRING(99) },
    'last_modified_by': { type: Sequelize.STRING(99) }
})

tag_master.sync({
    //  force: true
}).then(() => {
    console.log("Tags Master Table Done.");

})
module.exports = tag_master;