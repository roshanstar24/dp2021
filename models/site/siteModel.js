const tag = require('./../tag');
const category = require('./../category');
const image = require('./../images');
const product = require('./../product');

exports.getCategory = () => {
    return category.findAll({ "order": [['sort', 'ASC']]},{ raw: true },);
}

exports.getCategoryProductList = (par,sort)=>{
    sortv = ['updatedAt', 'DESC']
    if(!sort){
        sortv=['updatedAt', 'DESC'];
    }
    else{
        if(sort.sort == 'atoz'){
            sortv=['name','ASC']
        }
        if(sort.sort == 'ztoa'){
            sortv=['name','DESC']
        }
        if(sort.sort == 'ltoh'){
            sortv=['finalprice','ASC']
        }
        if(sort.sort == 'htol'){
            sortv=['finalprice','DESC']
        }
        if(sort.sort == 'updated'){
            sortv=['updatedAt','DESC']
        }
        if(sort.sort == 'otol'){
            sortv=['year','ASC']
        }
        if(sort.sort == 'ltoo'){
            sortv=['year','DESC']
        }
    }
    console.log(sortv)
    if (par.q){
        return product.findAll({"where": {quaternary_category: par.q}, order: [sortv]})
    }
    else if(par.t){
        return product.findAll({"where": {tertiary_category: par.t},order: [sortv]})
    }
    else if(par.s){
        return product.findAll({"where": {secondary_category: par.s}, order: [sortv]})
    }
    else if(par.p){
        return product.findAll({"where": {primary_category: par.p}, order: [sortv]})
    }
}
exports.getAllImage = () => {
    return image.findAll( { raw: true });
}