const Sequelize = require('sequelize');
const connection = require('./../database/connection');

const customer_master = connection.define('customer_masters', {
    'id': {
        type: Sequelize.UUID,
        primaryKey: true,
        auto_increment: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
    },
    'name': { type: Sequelize.STRING },
    'phone1': { type: Sequelize.STRING },
    'phone2': { type: Sequelize.STRING },
    'dob': { type: Sequelize.DATEONLY },
    'wapp': { type: Sequelize.STRING },
    'email1': {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    'facebook': { type: Sequelize.STRING },
    'instagram': { type: Sequelize.STRING },
    'twitter': { type: Sequelize.STRING },
    'addressline1': { type: Sequelize.STRING },
    'addressline2': { type: Sequelize.STRING },
    'city': { type: Sequelize.STRING, defaultValue: 'Patna' },
    'state': { type: Sequelize.STRING, defaultValue: 'Bihar' },
    'pincode': { type: Sequelize.STRING },
    'enabled': { type: Sequelize.BOOLEAN, defaultValue: true },
    'published_by': { type: Sequelize.STRING(99) },
    'last_modified_by': { type: Sequelize.STRING(99) }
})

customer_master.sync({
    force: true
}).then(() => {
    console.log("Customer Master Table Done.");

})
module.exports = customer_master;