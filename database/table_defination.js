var table = {};
table.product_master = require('./../models/product')
table.customer_master = require('./../models/customer')
table.team_master = require('./../models/team')
module.exports = table

// const table = require('sequelize');
// const connection = require('./connection');


// const prod_master = connection.define('product_masters', {
//     'id': {
//         type: Sequelize.UUID,
//         primaryKey: true,
//         auto_increment: true,
//         defaultValue: Sequelize.UUIDV4,
//         allowNull: false,
//     },
//     'product_number': {
//         type: Sequelize.INTEGER,
//         auto_increment: true,
//         allowNull: false,
//     },
//     'primary_category': { type: Sequelize.STRING },
//     'secondary_category': { type: Sequelize.STRING },
//     'tertiary_category': { type: Sequelize.STRING },
//     'quaternary_category': { type: Sequelize.STRING },
//     'tags': { type: Sequelize.STRING(500) },
//     'name': { type: Sequelize.STRING },
//     'art_form': { type: Sequelize.STRING(99) },
//     'price': { type: Sequelize.FLOAT(10, 2) },
//     'discount_type': { type: Sequelize.STRING },
//     'discount_value': { type: Sequelize.FLOAT(10, 2) },
//     'number_of_attendees': { type: Sequelize.FLOAT(10) },
//     'place': { type: Sequelize.STRING, defaultValue: 'Patna' },
//     'date': { type: Sequelize.DATE },
//     'artist': { type: Sequelize.STRING, defaultValue: 'DesignPoint' },
//     'collaborated_artist': { type: Sequelize.STRING },
//     'ribbon': { type: Sequelize.STRING },
//     'sash': { type: Sequelize.STRING },
//     'code_name': { type: Sequelize.STRING },
//     'duration': { type: Sequelize.STRING },
//     'year': { type: Sequelize.STRING, defaultValue: Sequelize.YEAR },
//     'quality': { type: Sequelize.STRING(99), defaultValue: 'Best' },
//     'snippet': { type: Sequelize.STRING },
//     'description': { type: Sequelize.STRING(1000) },
//     'testinomials': { type: Sequelize.STRING(500) },
//     'occasion': { type: Sequelize.STRING(99) },
//     'pattern': { type: Sequelize.STRING },
//     'location': { type: Sequelize.STRING, defaultValue: 'Patna' },
//     'pictures': { type: Sequelize.STRING(5000) },
//     'related': { type: Sequelize.STRING(500) },
//     'sponser': { type: Sequelize.STRING(99) },
//     'dimension': { type: Sequelize.STRING(256) },
//     'manufacture_detail': { type: Sequelize.STRING(256) },
//     'color': { type: Sequelize.STRING },
//     'copyright': { type: Sequelize.STRING(99), defaultValue: 'DesignPoint' },
//     'enabled': { type: Sequelize.BOOLEAN, defaultValue: true },
//     'order_id': { type: Sequelize.INTEGER },
//     'published_by': { type: Sequelize.STRING(99) }
// })

// const customer_master = connection.define('customer_masters', {
//     'id': {
//         type: Sequelize.UUID,
//         primaryKey: true,
//         auto_increment: true,
//         defaultValue: Sequelize.UUIDV4,
//         allowNull: false,
//     },
//     'name': { type: Sequelize.STRING },
//     'phone1': { type: Sequelize.STRING },
//     'phone2': { type: Sequelize.STRING },
//     'wapp': { type: Sequelize.STRING },
//     'email1': { type: Sequelize.STRING },
//     'email2': { type: Sequelize.STRING },
//     'facebook': { type: Sequelize.STRING },
//     'instagram': { type: Sequelize.STRING },
//     'twitter': { type: Sequelize.STRING },
//     'addressline1': { type: Sequelize.STRING },
//     'Addressline2': { type: Sequelize.STRING },
//     'city': { type: Sequelize.STRING, defaultValue: 'Patna' },
//     'state': { type: Sequelize.STRING, defaultValue: 'Bihar' },
//     'pincode': { type: Sequelize.STRING },
//     'enabled': { type: Sequelize.BOOLEAN, defaultValue: true },
//     'published_by': { type: Sequelize.STRING(99) }
// })


// const dp_team = connection.define('dp_teams', {
//     'id': {
//         type: Sequelize.UUID,
//         primaryKey: true,
//         auto_increment: true,
//         defaultValue: Sequelize.UUIDV4,
//         allowNull: false,
//     },
//     'name': { type: Sequelize.STRING },
//     'code': { type: Sequelize.STRING },
//     'nickname': { type: Sequelize.STRING },
//     'location': { type: Sequelize.STRING },
//     'tag': { type: Sequelize.STRING },
//     'dob': { type: Sequelize.DATE },
//     'education': { type: Sequelize.STRING },
//     'picture': { type: Sequelize.STRING(500) },
//     'phone1': { type: Sequelize.STRING },
//     'phone2': { type: Sequelize.STRING },
//     'wapp': { type: Sequelize.STRING },
//     'email1': { type: Sequelize.STRING },
//     'email2': { type: Sequelize.STRING },
//     'facebook': { type: Sequelize.STRING },
//     'instagram': { type: Sequelize.STRING },
//     'twitter': { type: Sequelize.STRING },
//     'addressline1': { type: Sequelize.STRING },
//     'Addressline2': { type: Sequelize.STRING },
//     'city': { type: Sequelize.STRING, defaultValue: 'Patna' },
//     'state': { type: Sequelize.STRING, defaultValue: 'Bihar' },
//     'pincode': { type: Sequelize.STRING },
//     'emergencycontact': { type: Sequelize.STRING },
//     'aadharno': { type: Sequelize.STRING },
//     'speciality': { type: Sequelize.STRING },
//     'associationdate': { type: Sequelize.STRING },
//     'top10': { type: Sequelize.STRING },
//     'enabled': { type: Sequelize.BOOLEAN, defaultValue: true },
//     'published_by': { type: Sequelize.STRING(99) }
// })

// const order_master = connection.define('order_masters', {
//     'id': {
//         type: Sequelize.UUID,
//         primaryKey: true,
//         auto_increment: true,
//         defaultValue: Sequelize.UUIDV4,
//         allowNull: false,
//     },
//     'product_id': { type: Sequelize.STRING },
//     'customer_id': { type: Sequelize.STRING },
//     'amount_paid': { type: Sequelize.FLOAT(10, 2) },
//     'payment_date': { type: Sequelize.DATE },
//     'payment_mode': { type: Sequelize.STRING },
//     'paid_to': { type: Sequelize.STRING },
//     'dispatch_date': { type: Sequelize.DATE },
//     'delivery_date': { type: Sequelize.DATE },
//     'courier_name': { type: Sequelize.STRING },
//     'tracker_details': { type: Sequelize.STRING },
//     'order_details': { type: Sequelize.STRING },
//     'order_remark': { type: Sequelize.STRING },
//     'enabled': { type: Sequelize.BOOLEAN, defaultValue: true },
//     'published_by': { type: Sequelize.STRING(99) }
// })


// const category = connection.define('categories', {
//     'id': {
//         type: Sequelize.UUID,
//         primaryKey: true,
//         auto_increment: true,
//         defaultValue: Sequelize.UUIDV4,
//         allowNull: false,
//     },
//     'name': { type: Sequelize.STRING },
//     'type': { type: Sequelize.STRING },
//     'enabled': { type: Sequelize.BOOLEAN, defaultValue: true },
//     'published_by': { type: Sequelize.STRING(99) }
// })


// const nav_menu = connection.define('nav_menus', {
//     'id': {
//         type: Sequelize.UUID,
//         primaryKey: true,
//         auto_increment: true,
//         defaultValue: Sequelize.UUIDV4,
//         allowNull: false,
//     },
//     'name': { type: Sequelize.STRING },
//     'parentmenu': { type: Sequelize.STRING },
//     'level': { type: Sequelize.STRING },
//     'sortorder': { type: Sequelize.STRING },
//     'special': { type: Sequelize.STRING },
//     'link': { type: Sequelize.STRING },
//     'icon': { type: Sequelize.STRING },
//     'enabled': { type: Sequelize.BOOLEAN, defaultValue: true },
//     'published_by': { type: Sequelize.STRING(99) }
// })
// module.exports = table;