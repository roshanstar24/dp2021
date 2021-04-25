const Sequelize = require('sequelize');
const connection = require('./../database/connection');

const image_master = connection.define('image_master', {
    'id': {
        type: Sequelize.UUID,
        primaryKey: true,
        auto_increment: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
    },
    'name': { type: Sequelize.STRING, unique: true },
    'imagepath': { type: Sequelize.STRING(266) },
    'thumbnailpath': { type: Sequelize.STRING(266) },
    'hiddeningallery': { type: Sequelize.BOOLEAN, defaultValue: false },
    'enabled': { type: Sequelize.BOOLEAN, defaultValue: true },
    'published_by': { type: Sequelize.STRING(99) },
    'last_modified_by': { type: Sequelize.STRING(99) }
})


image_master.sync({
     force: true
}).then(() => {
    console.log("Image  Master Table Done.");

})

module.exports = image_master;