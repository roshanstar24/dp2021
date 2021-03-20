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
    'primary_category': { type: Sequelize.STRING },
    'secondary_category': { type: Sequelize.STRING },
    'tertiary_category': { type: Sequelize.STRING },
    'quaternary_category': { type: Sequelize.STRING },

    'name': { type: Sequelize.STRING },
    'sku': { type: Sequelize.STRING },
    'artist': { type: Sequelize.STRING, defaultValue: 'DesignPoint' },
    'art_form': { type: Sequelize.STRING(99) },
    'pattern': { type: Sequelize.STRING },
    
    'price': { type: Sequelize.FLOAT(10, 2) },
    'finalprice': { type: Sequelize.FLOAT(10, 2) },
    'discount_type': { type: Sequelize.STRING },
    'discount_value': { type: Sequelize.FLOAT(10, 2) },
    'productdate': { type: Sequelize.DATE },
    'dimension': { type: Sequelize.STRING(256) },
    'color': { type: Sequelize.STRING },
    'quality': { type: Sequelize.STRING(99), defaultValue: 'Best' },
    
    'ribbon': { type: Sequelize.STRING },
    'sash': { type: Sequelize.STRING },
    'duration': { type: Sequelize.STRING },
    'year': { type: Sequelize.STRING, defaultValue: Sequelize.YEAR },
    'snippet': { type: Sequelize.STRING },
    'description': { type: Sequelize.STRING(1000) },
    'testimonials': { type: Sequelize.STRING(500) },
    'occasion': { type: Sequelize.STRING(99) },
    'number_of_attendees': { type: Sequelize.FLOAT(10) },

    'primary_img': { type: Sequelize.STRING(500) },
    'secondary_img1': { type: Sequelize.STRING(500) },
    'secondary_img2': { type: Sequelize.STRING(500) },
    'gallery_img': { type: Sequelize.STRING(5000) },

    'tags': { type: Sequelize.STRING(500) },
    'related': { type: Sequelize.STRING(500) },
    'collaborated_artist': { type: Sequelize.STRING },
    
    'location': { type: Sequelize.STRING, defaultValue: 'Patna' },
    'sponser': { type: Sequelize.STRING(99) },
    'trademark': { type: Sequelize.STRING(99), defaultValue: 'DesignPoint' },
    'copyright': { type: Sequelize.STRING(99), defaultValue: 'DesignPoint' },

    'enabled': { type: Sequelize.BOOLEAN, defaultValue: true },
    'published_by': { type: Sequelize.STRING(99) },
    'last_modified_by': { type: Sequelize.STRING(99) }
})


product_master.sync({
    // force: true




}).then(() => {
    console.log("Product Master Table Done.");

})
module.exports = product_master;