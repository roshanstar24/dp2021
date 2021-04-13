const team = require('./../team');
const customer = require('./../customer');
const tag = require('./../tag');
const category = require('./../category');
const image = require('./../images');
const product = require('./../product');
const product_master = require('./../product');


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

//----------------------------------------------------------------------------
/* TAGS */


exports.storeCategory = (data) => {
    return category.create(data)
}

exports.deleteCategory = (data) => {
    return category.update({ "enabled": 0, "last_modified_by": data.last_modified_by }, { "where": { id: data.id } })
}

exports.getCategory = () => {
    return category.findAll({ raw: true });
}

exports.getOneCategory = (data) => {
    console.log(data)
    return category.findOne({ where: { id: data.id } });
}

exports.updateCategory = (data) => {

    console.log("====================")
    console.log(data)
    return category.update(data, { where: { id: data.id } })
}

//---------------------------------------------------------------------------------------

//----------------------------------------------------------------------------
/* IMAGES */


exports.storeImage = (data) => {
    return image.create(data)
}

exports.deleteImage = (data) => {
    return image.update({ "enabled": 0, "last_modified_by": data.last_modified_by }, { "where": { id: data.id } })
}

exports.getImage = () => {
    return image.findAll({ order: [['createdAt', 'DESC']], limit: 30 }, { raw: true });
}
exports.getAllImage = () => {
    return image.findAll( { raw: true });
}

exports.getOneImage = (data) => {
    console.log(data)
    return image.findOne({ where: { id: data.id } });
}

exports.updateImage = (data) => {

    console.log("====================")
    console.log(data)
    return image.update(data, { where: { id: data.id } })
}

exports.verifyemail = (data) => {
    // // console.log("model")
    // // console.log(data)
    // // console.log("---------------------")
    // console.log(team.findOne({ where: data }))
    return team.findOne(({ where: data }))
}

exports.storeProduct = (data) => {
    console.log(data)
    return product.create(data)
}

exports.getOneProduct = (data) => {
    console.log(data)
    console.log('()()()()()()()(()())()()0)00')
    return product.findOne({ where: { id: data.id } });
}

exports.getProduct = () => {
    return product.findAll({ raw: true },{ order: [['createdAt', 'DESC']] });
}

exports.deleteProduct = (data) => {
    return product.update({ "enabled": 0, "last_modified_by": data.last_modified_by }, { "where": { id: data.id } })
}

exports.soldProduct = (data) => {
    return product.update({ "sold": 1, "last_modified_by": data.last_modified_by }, { "where": { id: data.id } })
}

exports.unsoldProduct = (data) => {
    return product.update({ "sold": 0, "last_modified_by": data.last_modified_by }, { "where": { id: data.id } })
}

exports.updateProduct = (data) => {
    console.log(data)
    return product.update(data, { where: { id: data.id } })
}
