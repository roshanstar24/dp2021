const Sequelize = require('sequelize');
const connection = require('./../database/connection');

const category_master = connection.define('category_master', {
    'id': {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
    },
    'name': { type: Sequelize.STRING, unique: true },
    'type': { type: Sequelize.STRING },
    'parentcategory': { type: Sequelize.STRING },
    'sort': { type: Sequelize.INTEGER },

    'heading': { type: Sequelize.STRING },
    'description': { type: Sequelize.STRING },    
    
    'primary_img': { type: Sequelize.STRING(500) },
    'secondary_img1': { type: Sequelize.STRING(500) },
    'secondary_img2': { type: Sequelize.STRING(500) },
    'gallery_img': { type: Sequelize.STRING(5000) },
    
    'enabled': { type: Sequelize.BOOLEAN, defaultValue: true },
    'published_by': { type: Sequelize.STRING(99) },
    'last_modified_by': { type: Sequelize.STRING(99) }
})


category_master.sync({
    force: true
}).then(() => {
     category_master.create({
         'name': 'Cloth',
         'type': 'primary'
     }).catch((err) => console.log(err));
     category_master.create({
         'name': 'Mehndi',
         'type': 'primary'
     }).catch((err) => console.log(err));
     category_master.create({
         'name': 'Painting',
         'type': 'primary'
     }).catch((err) => console.log(err));
     category_master.create({
         'name': 'Photography',
         'type': 'primary'
     }).catch((err) => console.log(err));
     category_master.create({
         'name': 'Interior',
         'type': 'primary'
     }).catch((err) => console.log(err));
     category_master.create({
         'name': 'Graphics Design',
         'type': 'primary'
     }).catch((err) => console.log(err));
    
    console.log("Category  Master Table Done.");

})

module.exports = category_master;