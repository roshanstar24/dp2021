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

exports.getHomepage = (req,res)=>{
    console.log(renderdata)
    siteModel.getCategory().then((data) => {
        renderdata["category"] = data;
        treedata={}
        data.forEach(cat=>{
            treedata[cat.id]={"text":cat.name,"type":cat.type,"nodes":[]}
        })
        data.forEach(cat=>{
            if(cat.type!='primary'){
                treedata[cat.parentcategory]["nodes"].push(cat.id)
            }
        })
        console.log(treedata)
        renderdata[treedata]= treedata
        jstree=[]
        res.render('site/index.ejs', renderdata)
    })
}