const tag = require('./../tag');
const category = require('./../category');
const image = require('./../images');
const product = require('./../product');

exports.getCategory = () => {
    return category.findAll({ "order": [['sort', 'ASC']]},{ raw: true },);
}
