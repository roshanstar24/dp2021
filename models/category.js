const Sequelize = require('sequelize');
const connection = require('./../database/connection');

const category_master = connection.define('category_master', {
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


category_master.sync({
//    force: true
}).then(() => {
    category_master.create({
        'name': 'Product',
        'type': 'primary'
    }).catch((err) => console.log(err));
    category_master.create({
        'name': 'Service',
        'type': 'primary'
    }).catch((err) => console.log(err));
    category_master.create({
        'name': 'Engagement and Association',
        'type': 'primary'
    }).catch((err) => console.log(err));

    console.log("Category  Master Table Done.");

})

module.exports = category_master;