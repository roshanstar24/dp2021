
const team = require('./../team');
const customer = require('./../customer');
const tag = require('./../tag');

exports.loginAuth = (username) => {
    console.log(username + "--")
    return team.findOne({ where: { email1: username } })
}


//--------------------------------------------------------------------
//--------------------------------------------------------------------
/* TEAM */

exports.storeTeam = (data) => {
    return team.create(data)
}

exports.getTeam = () => {
    return team.findAll({ raw: true });
}


exports.deleteTeam = (data) => {
    return team.update({ "enabled": 0, "last_modified_by": data.last_modified_by }, { "where": { id: data.id } })
}


exports.getOneTeam = (data) => {
    console.log(data)
    return team.findOne({ where: { id: data.id } });
}

exports.updateTeam = (data) => {

    console.log("====================")
    console.log(data)
    return team.update(data, { where: { id: data.id } })
}

exports.changePassword = (data) => {
    console.log(data)
    return team.update({ "password1": data.password1 }, { "where": { id: data.id } })
}

exports.saveProfileURL = (data) => {
    console.log(data);
    return team.update({ 'picture': data.path }, { 'where': { id: data.id } })
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
/* CUSTOMER */

exports.storeCustomer = (data) => {
    return customer.create(data)
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
/* TAGS */


exports.storeTag = (data) => {
    return tag.create(data)
}

exports.deleteTag = (data) => {
    return tag.update({ "enabled": 0, "last_modified_by": data.last_modified_by }, { "where": { id: data.id } })
}

exports.getTag = () => {
    return tag.findAll({ raw: true });
}

exports.getOneTag = (data) => {
    console.log(data)
    return tag.findOne({ where: { id: data.id } });
}

exports.updateTag = (data) => {

    console.log("====================")
    console.log(data)
    return tag.update(data, { where: { id: data.id } })
}


exports.verifyemail = (data) => {
    // // console.log("model")
    // // console.log(data)
    // // console.log("---------------------")
    // console.log(team.findOne({ where: data }))
    return team.findOne(({ where: data }))
}

