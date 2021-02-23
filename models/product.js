const Sequelize = require('sequelize');
const connection = require('./../database/connection');

const product_master = connection.define('product_masters', {
    'id': {
        type: Sequelize.UUID,
        primaryKey: true,
        auto_increment: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
    },
    'product_number': {
        type: Sequelize.INTEGER,
        auto_increment: true,
        allowNull: false,
    },
    'primary_category': { type: Sequelize.STRING },
    'secondary_category': { type: Sequelize.STRING },
    'tertiary_category': { type: Sequelize.STRING },
    'quaternary_category': { type: Sequelize.STRING },
    'tags': { type: Sequelize.STRING(500) },
    'name': { type: Sequelize.STRING },
    'art_form': { type: Sequelize.STRING(99) },
    'price': { type: Sequelize.FLOAT(10, 2) },
    'discount_type': { type: Sequelize.STRING },
    'discount_value': { type: Sequelize.FLOAT(10, 2) },
    'number_of_attendees': { type: Sequelize.FLOAT(10) },
    'place': { type: Sequelize.STRING, defaultValue: 'Patna' },
    'date': { type: Sequelize.DATE },
    'artist': { type: Sequelize.STRING, defaultValue: 'DesignPoint' },
    'collaborated_artist': { type: Sequelize.STRING },
    'ribbon': { type: Sequelize.STRING },
    'sash': { type: Sequelize.STRING },
    'code_name': { type: Sequelize.STRING },
    'duration': { type: Sequelize.STRING },
    'year': { type: Sequelize.STRING, defaultValue: Sequelize.YEAR },
    'quality': { type: Sequelize.STRING(99), defaultValue: 'Best' },
    'snippet': { type: Sequelize.STRING },
    'description': { type: Sequelize.STRING(1000) },
    'testinomials': { type: Sequelize.STRING(500) },
    'occasion': { type: Sequelize.STRING(99) },
    'pattern': { type: Sequelize.STRING },
    'location': { type: Sequelize.STRING, defaultValue: 'Patna' },
    'pictures': { type: Sequelize.STRING(5000) },
    'related': { type: Sequelize.STRING(500) },
    'sponser': { type: Sequelize.STRING(99) },
    'dimension': { type: Sequelize.STRING(256) },
    'manufacture_detail': { type: Sequelize.STRING(256) },
    'color': { type: Sequelize.STRING },
    'copyright': { type: Sequelize.STRING(99), defaultValue: 'DesignPoint' },
    'enabled': { type: Sequelize.BOOLEAN, defaultValue: true },
    'order_id': { type: Sequelize.INTEGER },
    'published_by': { type: Sequelize.STRING(99) },
    'last_modified_by': { type: Sequelize.STRING(99) }
})


product_master.sync({
    force: true
}).then(() => {
    console.log("Product Master Table Done.");

})
module.exports = connection;