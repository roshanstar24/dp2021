const buzzdetails = require('../models/dpbuzz.js');

const siteModel = require('../models/site/siteModel.js');
const express = require('express');
const fs = require('fs')
const path = require('path')
const app = express();
const imageThumbnail = require('jimp');
const { REPL_MODE_SLOPPY } = require('repl');
const { render } = require('../routes/adminRoute');

var renderdata = { buzz : buzzdetails};
console.log("Inside Category Menu")
siteModel.getCategory().then((data) => {
    treedata={}
    data.forEach(cat=>{
        if(cat.enabled){
            treedata[cat.id]={"text":cat.name,"type":cat.type,"sort":cat.sort,"nodes":[]}
            }
        })
    data.forEach(cat=>{
        if(cat.type!='primary' && cat.enabled){
            if(treedata[cat.parentcategory]){
                treedata[cat.parentcategory]["nodes"].push(cat.id)
            }
        }
    })
    renderdata["treedata"] = treedata;
})

siteModel.getAllImage().then(data=>{
    let idtosrc ={}
    data.forEach(d=>{
        idtosrc[d.id]={img :d.imagepath, thumbnail : d.thumbnailpath, name:d.name}
    })
    renderdata["idtosrc"]=idtosrc;
})


exports.getHomepage = (req,res)=>{
    console.log(renderdata)
    res.render('site/index.ejs', renderdata)
}
exports.getpcategory = (req,res)=>{
    console.log(req.params)
    siteModel.getCategoryProductList(req.params).then(plist=>{
        renderdata["plist"]=plist;
        renderdata["catname"]=req.params.p
        renderdata["cattype"]="primary_category";
        renderdata["pcount"] = plist.length;
        renderdata["catlevel"] = req.params
        console.log(renderdata)
        res.render('site/category.ejs',renderdata)
        // res.send(req.params.p)
    });
}
exports.postpcategory = (req,res)=>{
    console.log(req.params)
    console.log(req.body);
    siteModel.getCategoryProductList(req.params,req.body).then(plist=>{
        renderdata["plist"]=plist;
        renderdata["catname"]=req.params.p
        renderdata["cattype"]="primary_category";
        renderdata["pcount"] = plist.length;
        // console.log(renderdata)
        // res.render('site/category.ejs',renderdata)
        console.log(plist)
        res.send(plist)
    });
}
exports.getscategory = (req,res)=>{
    console.log(req.params);
    siteModel.getCategoryProductList(req.params).then(plist=>{
        renderdata["plist"]=plist;
        renderdata["catname"]=req.params.s
        renderdata["cattype"]="secondary_category";
        renderdata["pcount"] = plist.length;
        renderdata["catlevel"] = req.params
        console.log(renderdata);
        res.render('site/category.ejs',renderdata)
        // res.send(req.params.p)
    });
}
exports.postscategory = (req,res)=>{
    console.log(req.params);
    siteModel.getCategoryProductList(req.params,req.body).then(plist=>{
        renderdata["plist"]=plist;
        renderdata["catname"]=req.params.s
        renderdata["cattype"]="secondary_category";
        renderdata["pcount"] = plist.length;
        console.log(renderdata)
        // res.render('site/category.ejs',renderdata)
        res.send(plist)
        // res.send(req.params.p)
    });
}
exports.gettcategory = (req,res)=>{
    console.log(req.params)
    siteModel.getCategoryProductList(req.params).then(plist=>{
        renderdata["plist"]=plist;
        renderdata["catname"]=req.params.t
        renderdata["cattype"]="tertiary_category";
        renderdata["pcount"] = plist.length;
        renderdata["catlevel"] = req.params
        console.log(renderdata)
        res.render('site/category.ejs',renderdata)
        // res.send(req.params.p)
    });
}
exports.posttcategory = (req,res)=>{
    console.log(req.params)
    console.log(req.body);
    siteModel.getCategoryProductList(req.params,req.body).then(plist=>{
        renderdata["plist"]=plist;
        renderdata["catname"]=req.params.t
        renderdata["cattype"]="tertiary_category";
        renderdata["pcount"] = plist.length;
        // console.log(renderdata)
        // res.render('site/category.ejs',renderdata)
        // console.log(plist)
        plist.forEach(p=>{
            console.log(p.finalprice)
        })
        res.send(plist)
    });
}
exports.getqcategory = (req,res)=>{
    console.log(req.params)
    siteModel.getCategoryProductList(req.params).then(plist=>{
        renderdata["plist"]=plist;
        renderdata["catname"]=req.params.q
        renderdata["cattype"]="quaternary_category";
        renderdata["pcount"] = plist.length;
        renderdata["catlevel"] = req.params
        console.log(renderdata)
        res.render('site/category.ejs',renderdata)
        // res.send(req.params.p)
    });
    // res.send(req.params.q)
}

exports.postqcategory = (req,res)=>{
    console.log(req.params)
    siteModel.getCategoryProductList(req.params,req.body).then(plist=>{
        renderdata["plist"]=plist;
        renderdata["catname"]=req.params.q
        renderdata["cattype"]="quaternary_category";
        renderdata["pcount"] = plist.length;
        console.log(renderdata)
        // res.render('site/category.ejs',renderdata)
        res.send(plist)
        // res.send(req.params.p)
    });
    // res.send(req.params.q)
}