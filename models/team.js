
const Sequelize = require('sequelize');
const connection = require('./../database/connection');

const dp_team = connection.define('dp_teams', {
    'id': {
        type: Sequelize.UUID,
        primaryKey: true,
        auto_increment: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
    },
    'name': { type: Sequelize.STRING },
    'email1': { type: Sequelize.STRING, unique: true },
    'password1': { type: Sequelize.STRING },
    'role': { type: Sequelize.STRING, defaultValue: 'Editor' },
    'nickname': { type: Sequelize.STRING },
    'location': { type: Sequelize.STRING },
    'tag': { type: Sequelize.STRING },
    'dob': { type: Sequelize.DATEONLY },
    'doj': { type: Sequelize.DATEONLY },
    'education': { type: Sequelize.STRING },
    'picture': { type: Sequelize.STRING(500) },
    'phone1': { type: Sequelize.STRING },
    'phone2': { type: Sequelize.STRING },
    'wapp': { type: Sequelize.STRING },
    'email2': { type: Sequelize.STRING },
    'facebook': { type: Sequelize.STRING },
    'instagram': { type: Sequelize.STRING },
    'twitter': { type: Sequelize.STRING },
    'addressline1': { type: Sequelize.STRING },
    'addressline2': { type: Sequelize.STRING },
    'city': { type: Sequelize.STRING, defaultValue: 'Patna' },
    'state': { type: Sequelize.STRING, defaultValue: 'Bihar' },
    'pincode': { type: Sequelize.STRING },
    'emergencycontact': { type: Sequelize.STRING },
    'aadharno': { type: Sequelize.STRING },
    'speciality': { type: Sequelize.STRING },
    'top10': { type: Sequelize.STRING },
    'enabled': { type: Sequelize.BOOLEAN, defaultValue: true },
    'published_by': { type: Sequelize.STRING(99) },
    'last_modified_by': { type: Sequelize.STRING(99) }
})

dp_team.sync({
    // force: true
}).then(() => {
    // dp_team.create({
    //     'name': 'admin',
    //     'email1': 'spectrum@gmail.com',
    //     'password1': 'admin@1234',
    //     'role': 'Admin',
    //     'dob': '1989-03-24',
    //     'doj': '2021-01-05',
    //     'nickname': 'Roshan',
    //     'education': 'MCA',
    //     'phone1': '7875442118',
    //     'phone2': '8340295981',
    //     'city': 'patna',
    //     'facebook': 'https://www.facebook.com/roshan.light.106/',
    //     'addressline1': 'Amrudi Gali',
    //     'addressline2': 'Nala Road',
    //     'pincode': '800004'
    // }).catch((err) => console.log(err))
    // dp_team.create({ 'name': 'admin1', 'email1': 'spectrum@gmail.coms', 'password1': 'admin@1234', 'role': 'Admin' }).catch((err) => console.log(err))
    console.log("Team Table Done.");
})
module.exports = dp_team;