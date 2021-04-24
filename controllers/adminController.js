const buzzdetails = require('../models/dpbuzz.js');
const adminModel = require('../models/admin/adminModel');
const adminQuery = require('../models/admin/adminQuery');
const express = require('express');
const fs = require('fs')
const path = require('path')
const app = express();
const imageThumbnail = require('jimp');
const { REPL_MODE_SLOPPY } = require('repl');
const { render } = require('../routes/adminRoute');

var renderdata = {};

app.use((req, res, next) => {
    // console.log(req.session.logged_in)
    if (req.session.logged_in) {
        req.body["last_modified_by"] = req.session.loginuser.name + "/" + req.session.loginuser.email;
    }
    // else {
    //     console.log("session not set");
    //     if (req.body.login != "login")
    //         res.render('admin/login');
    // }
    // console.log(req.session.loginuser)
    next();
})

//--------------------------------------------------------------------------------------------------------------
/* LOGIN */
//--------------------------------------------------------------------------------------------------------------
// Login Page
exports.getLogin = (req, res) => {
    if (req.session.logged_in == true) {
        console.log("++++++++++++++++++++++++++++++++++++++++")
        renderdata["loginuser"] = req.session.loginuser
        console.log(renderdata)
        console.log("++++++++++++++++++++++++++++++++++++++++")
        res.redirect('/admin/dashboard')
    }
    else {
        res.render('admin/login');
    }

}

// Login Authorization

exports.postLogin = (req, res) => {
    adminModel.loginAuth(req.body.username)
        .then(authresult => {
            // console.log(authresult)
            if (authresult == null) {
                // console.log('Invalid Username')
                res.send({ status: "error", 'message': '  Invalid Username' });
            }
            else if (authresult.password1 == req.body.password) {
                // res.render('admin/dashboard');
                req.session.logged_in = true;
                req.session.loginuser = {
                    name: authresult.name,
                    role: authresult.role,
                    email: authresult.email1,
                    dob: authresult.dob,
                    doj: authresult.doj,
                    id: authresult.id,
                    picture: authresult.picture,
                    buzz: {
                        name: buzzdetails.name,
                        role: buzzdetails.phone1,
                        email: buzzdetails.email1,
                        logocircle: buzzdetails.logocircle,
                        logo: buzzdetails.logo
                    }
                }
                res.send({ status: "success", 'message': '  Login Successful', 'redirect': '/admin/dashboard' });
            }
            else {
                // console.log("Incorrect Password");
                res.send({ status: "warning", 'message': '  Invalid Password' });
            }
        });

    console.log(req.session)
}

exports.loginagain = (req, res) => {
    res.render('/admin/loginagain')
}
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------

//--------------------------------------------------
/* DASHBOARD */
exports.dashboard = (req, res) => {
    if (req.session.logged_in) {
        console.log("++++++++++++++++++++++++++++++++++++++++")
        renderdata["loginuser"] = req.session.loginuser
        console.log(renderdata)
        console.log("++++++++++++++++++++++++++++++++++++++++")
        // res.render('/admin/dashboard', renderdata)
        res.render('admin/homepage', renderdata)
    }
    else {
        res.redirect('/admin/login')
    }
}

//--------------------------------------------------------------------------------------------------------------
/* TEAM */
//--------------------------------------------------------------------------------------------------------------
exports.addTeamForm = (req, res) => {
    adminModel.getTag().then((data) => {
        renderdata["tags"] = data;
        console.log(renderdata)
        res.render('admin/team/addTeam', renderdata)
    });
}
exports.addNewTeam = (req, res) => {
    req.body["published_by"] = req.session.loginuser.name + "/" + req.session.loginuser.email
    if (req.body.tag) req.body.tag = req.body.tag.join(',');
    if (adminModel.storeTeam(req.body)) {
        res.send({ status: true, 'message': '  User Added.' });
    }
    else {
        res.send({ status: false, 'message': '  User Not Added.' });
    }

}

exports.verifyemail = (req, res) => {
    console.log(req.body);
    // req.body["published_by"] = req.session.loginuser.name + "/" + req.session.loginuser.email
    adminModel.verifyemail({ "email1": req.body.email1 }).then((data) => {
        // console.log(data)
        if (data === null) {
            res.send({ status: true, 'message': ' New User/email Confirmed.' });
        }
        else {
            res.send({ status: false, 'message': ' Duplicate Email id' });
        }

    }).catch((err) => {
        console.log('-------------------------------------------------------')
        console.log(err.parent.sqlMessage)
        console.log('-------------------------------------------------------')
        res.send({ status: false, 'message': err.parent.sqlMessage });
    })
}


exports.viewTeam = (req, res) => {
    adminModel.getTeam().then((data) => {
        renderdata["teams"] = data;
        renderdata["loginuser"] = req.session.loginuser
        res.render('admin/team/viewteam', renderdata)
    })
}


exports.deleteTeam = (req, res) => {
    req.body["last_modified_by"] = req.session.loginuser.name + "/" + req.session.loginuser.email
    adminModel.deleteTeam(req.body).then(() => {
        res.send({ status: true, 'message': '  Teammate Deleted.' });
    }).catch((err) => {
        console.log('-------------------------------------------------------')
        console.log(err.parent.sqlMessage)
        console.log('-------------------------------------------------------')
        res.send({ status: false, 'message': err.parent.sqlMessage });
    })
}
exports.editTeam = (req, res) => {
    req.body["last_modified_by"] = req.session.loginuser.name + "/" + req.session.loginuser.email;
    adminModel.getOneTeam(req.body).then((data) => {
        adminModel.getTag().then((tagdata) => {
            renderdata["tags"] = tagdata;
            renderdata["teams"] = data;
            renderdata["loginuser"] = req.session.loginuser;
            console.log(renderdata)
            console.log("=========================================")
            res.render('admin/team/editteam', renderdata)
        });

    }).catch((err) => {
        console.log('-------------------------------------------------------')
        console.log(err.parent.sqlMessage)
        console.log('-------------------------------------------------------')
        res.send({ status: false, 'message': err.parent.sqlMessage });
    })
}
exports.updateTeam = (req, res) => {
    req.body["last_modified_by"] = req.session.loginuser.name + "/" + req.session.loginuser.email
    console.log("Team UPDATES")
    adminModel.updateTeam(req.body).then((data) => {
        res.send({ status: true, 'message': "Teammate Updated Successfully" });
    }).catch((err) => {
        console.log(err);
        console.log('-------------------------------------------------------')
        console.log(err.parent.sqlMessage)
        console.log('-------------------------------------------------------')
        res.send({ status: false, 'message': err.parent.sqlMessage });
    })
}

exports.showProfile = (req, res) => {
    console.log("show Profile");
    console.log(req.body)
    adminModel.getOneTeam(req.body).then((data) => {
        renderdata["loginuser"] = req.session.loginuser
        renderdata["profiledata"] = data;
        console.log(renderdata)
        res.render('admin/team/profile', renderdata)
    }).catch((err) => {
        console.log(err)
    })
}

exports.changePassword = (req, res) => {
    adminModel.getOneTeam({ id: req.body.id }).then((data) => {
        console.log(data)
        if (data.password1 == req.body.oldp) {
            console.log("Passowrd Matched and Change granted")
            adminModel.changePassword({ id: req.body.id, password1: req.body.newp }).then(() => {
                res.send({ status: true, 'message': "Password Updated Successfully" });
            }).catch((err) => {
                console.log(err);
                console.log('-------------------------------------------------------')
                console.log(err.parent.sqlMessage)
                console.log('-------------------------------------------------------')
                res.send({ status: false, 'message': err.parent.sqlMessage });
            })
        }
        else {
            res.send({ status: false, 'message': "Incorrect Old Password Entered." });
        }
    }).catch((err) => {
        console.log(err)
    })
}

exports.uploadProfilePhoto = (req, res) => {
    let sampleFile;
    let uploadPath;
    console.log('***************************************')
    console.log(req.files)
    console.log('***************************************')

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send({ status: false, message: 'No files were uploaded.' });
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.uploadphoto;
    var ext = req.files.uploadphoto.name.substr(req.files.uploadphoto.name.lastIndexOf('.') + 1);
    var __relativepath = path.join('/', 'assets', 'uploads', 'profile', (req.session.loginuser.id + '.' + ext))
    uploadPath = path.join(__basedir, __relativepath);
    thumbpath = path.join(__basedir, path.join('/', 'assets', 'uploads', 'profile'))
    console.log(uploadPath)
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, function (err) {
        if (err) {
            return res.status(500).send({ status: false, message: err });
        }
        else {
            try {
                imageThumbnail.read(uploadPath)
                    .then(image => {
                        image.resize(256,256)
                        .quality(60)
                        .write(uploadPath + "_thumbnail.jpeg")
                    })
                    .catch(err => {
                        console.log(err)
                    });

            } catch (err) {
                console.error(err);
            }
            adminModel.saveProfileURL({ id: req.session.loginuser.id, path: __relativepath }).then((data) => {
                res.send({ status: true, message: "Display Picture File Uploaded !" });
            })
        }
    });
}
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------

/* CUSTOMER */
//--------------------------------------------------------------------------------------------------------------
exports.addCustomerForm = (req, res) => {
    res.render('admin/customer/addCustomer')
}
exports.addNewCustomer = (req, res) => {
    req.body["published_by"] = req.session.loginuser.name + "/" + req.session.loginuser.email
    adminModel.storeCustomer(req.body).then((data) => {
        res.send({ status: true, 'message': '  Customer Added.' });
    }).catch((err) => {
        console.log('-------------------------------------------------------')
        console.log(err.parent.sqlMessage)
        console.log('-------------------------------------------------------')
        res.send({ status: false, 'message': err.parent.sqlMessage });
    })
}


/* TAGS */
exports.addTagForm = (req, res) => {
    res.render('admin/tag/addTag')
}

exports.addNewTag = (req, res) => {
    req.body["published_by"] = req.session.loginuser.name + "/" + req.session.loginuser.email
    adminModel.storeTag(req.body).then((data) => {
        res.send({ status: true, 'message': '  Tag Added.' });
    }).catch((err) => {
        console.log('-------------------------------------------------------')
        console.log(err.parent.sqlMessage)
        console.log('-------------------------------------------------------')
        res.send({ status: false, 'message': err.parent.sqlMessage });
    })
}

exports.viewTag = (req, res) => {
    adminModel.getTag().then((data) => {
        renderdata["tags"] = data;
        renderdata["loginuser"] = req.session.loginuser
        res.render('admin/tag/viewtag', renderdata)
    })
}

exports.deleteTag = (req, res) => {
    req.body["last_modified_by"] = req.session.loginuser.name + "/" + req.session.loginuser.email
    adminModel.deleteTag(req.body).then(() => {
        res.send({ status: true, 'message': '  Tag Deleted.' });
    }).catch((err) => {
        console.log('-------------------------------------------------------')
        console.log(err.parent.sqlMessage)
        console.log('-------------------------------------------------------')
        res.send({ status: false, 'message': err.parent.sqlMessage });
    })
}
exports.editTag = (req, res) => {
    req.body["last_modified_by"] = req.session.loginuser.name + "/" + req.session.loginuser.email
    adminModel.getOneTag(req.body).then((data) => {
        renderdata["tags"] = data;
        renderdata["loginuser"] = req.session.loginuser
        res.render('admin/tag/edittag', renderdata)
    }).catch((err) => {
        console.log('-------------------------------------------------------')
        console.log(err.parent.sqlMessage)
        console.log('-------------------------------------------------------')
        res.send({ status: false, 'message': err.parent.sqlMessage });
    })
}
exports.updateTag = (req, res) => {
    req.body["last_modified_by"] = req.session.loginuser.name + "/" + req.session.loginuser.email
    console.log("TAG UPDATES")
    adminModel.updateTag(req.body).then((data) => {
        res.send({ status: true, 'message': "Tag Updated Successfully" });
    }).catch((err) => {
        console.log('-------------------------------------------------------')
        console.log(err.parent.sqlMessage)
        console.log('-------------------------------------------------------')
        res.send({ status: false, 'message': err.parent.sqlMessage });
    })
}

//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
/* CATEGORY */

exports.addCategoryForm = (req, res) => {
    adminModel.getCategory().then((data) => {
        renderdata["category"] = data;
        renderdata["loginuser"] = req.session.loginuser
        treedata={}
        data.forEach(cat=>{
            treedata[cat.id]={"text":cat.name,"type":cat.type,"sort":cat.sort,"nodes":[]}
        })
        data.forEach(cat=>{
            if(cat.type!='primary'){
                treedata[cat.parentcategory]["nodes"].push(cat.id)
            }
        })
        console.log(treedata)
        renderdata[treedata]= treedata
        jstree=[]
        // for( d in treedata){
        //     if(treedata[d]["type"]=='primary'){
        //         console.log(treedata[d]["text"])
        //         treedata[d]["nodes"].forEach(m=>{
        //             console.log(treedata[m]["text"])
        //             treedata[m]["nodes"].forEach(n=>{
        //                 console.log(treedata[n]["text"])
        //                 treedata[n]["nodes"].forEach(o=>{
        //                     console.log(treedata[o]["text"])
                           
        //                 })
        //             })
        //         })
        //     }
        // }
        adminModel.getImage().then((data) => {
            renderdata["images"] = data;
            res.render('admin/category/addcategory', renderdata)
        });
        
    })
    
}

exports.addNewCategory = (req, res) => {
    req.body["published_by"] = req.session.loginuser.name + "/" + req.session.loginuser.email
    adminModel.storeCategory(req.body).then((data) => {
        res.send({ status: true, 'message': '  Category Added.' });
    }).catch((err) => {
        console.log('-------------------------------------------------------')
        console.log(err.parent.sqlMessage)
        console.log('-------------------------------------------------------')
        res.send({ status: false, 'message': err.parent.sqlMessage });
    })
}

exports.viewCategory = (req, res) => {
    adminModel.getCategory().then((data) => {
        renderdata["category"] = data;
        renderdata["loginuser"] = req.session.loginuser
        res.render('admin/category/viewcategory', renderdata)
    })
}

exports.deleteCategory = (req, res) => {
    req.body["last_modified_by"] = req.session.loginuser.name + "/" + req.session.loginuser.email
    adminModel.deleteCategory(req.body).then(() => {
        res.send({ status: true, 'message': '  Category Deleted.' });
    }).catch((err) => {
        console.log('-------------------------------------------------------')
        console.log(err.parent.sqlMessage)
        console.log('-------------------------------------------------------')
        res.send({ status: false, 'message': err.parent.sqlMessage });
    })
}
exports.editCategory = (req, res) => {
    req.body["last_modified_by"] = req.session.loginuser.name + "/" + req.session.loginuser.email
    adminModel.getOneCategory(req.body).then((data) => {
        renderdata["category"] = data;
        renderdata["loginuser"] = req.session.loginuser
        treedata={}
        adminModel.getCategory(req.body).then((cdata) => {
            console.log("=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=")
            console.log(cdata)
            cdata.forEach(cat=>{
                treedata[cat.id]={"text":cat.name,"type":cat.type,"sort":cat.sort,"nodes":[]}
            })
            cdata.forEach(cat=>{
                if(cat.type!='primary'){
                    treedata[cat.parentcategory]["nodes"].push(cat.id)
                }
            })
            console.log(treedata)
            renderdata[treedata]= treedata
            jstree=[]
            // for( d in treedata){
            //     if(treedata[d]["type"]=='primary'){
            //         console.log(treedata[d]["text"])
            //         treedata[d]["nodes"].forEach(m=>{
            //             console.log(treedata[m]["text"])
            //             treedata[m]["nodes"].forEach(n=>{
            //                 console.log(treedata[n]["text"])
            //                 treedata[n]["nodes"].forEach(o=>{
            //                     console.log(treedata[o]["text"])
                               
            //                 })
            //             })
            //         })
            //     }
            // }
            adminModel.getImage().then((idata) => {
                renderdata["images"] = idata;
                res.render('admin/category/editcategory', renderdata)
            });
        })
        
        
    })
}
exports.updateCategory = (req, res) => {
    req.body["last_modified_by"] = req.session.loginuser.name + "/" + req.session.loginuser.email
    console.log("Category UPDATES")
    adminModel.updateCategory(req.body).then((data) => {
        res.send({ status: true, 'message': "Category Updated Successfully" });
    }).catch((err) => {
        console.log('-------------------------------------------------------')
        console.log(err.parent.sqlMessage)
        console.log('-------------------------------------------------------')
        res.send({ status: false, 'message': err.parent.sqlMessage });
    })
}
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
/** PRODUCT */

exports.uploadProductPhotoForm = (req, res) => {
    adminModel.getImage().then((data) => {
        console.log(data)
        renderdata["images"] = data;
        console.log(renderdata)
        res.render('admin/product/uploadproductphotoform', renderdata)
    });
}
exports.uploadProductIMG = (req, res) => {
    let sampleFile;
    let uploadPath;
    console.log('***************************************')
    console.log(req.files)
    console.log('***************************************')

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send({ status: false, message: 'No files were uploaded.' });
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.productimg;
    milisecond = new Date().getTime()
    var ext = sampleFile.name.substr(sampleFile.name.lastIndexOf('.') + 1);
    var __relativepath = path.join('/', 'assets', 'uploads', 'product', sampleFile.name + milisecond + "." + ext)
    var __thumbnailpath =  path.join('/', 'assets', 'uploads', 'product', 'thumbnails');
    var thumbnailpathfile = path.join('/', 'assets', 'uploads', 'product', 'thumbnails', sampleFile.name + milisecond + "." + ext)
    uploadPath = path.join(__basedir, __relativepath);
    thumbnailpath = path.join(__basedir, thumbnailpathfile);
    console.log(uploadPath)
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, function (err) {
        if (err) {
            return res.status(500).send({ status: false, message: err });
        }
        else {
            try {
                imageThumbnail.read(uploadPath)
                    .then(image => {
                        image.resize(256,256)
                        .quality(60)
                        .write(thumbnailpath)
                    })
                    .catch(err => {
                        console.log(err)
                    });
            } catch (err) {
                console.error(err);
            }
            adminModel.storeImage({
                name: sampleFile.name + milisecond + "." + ext,
                imagepath: __relativepath,
                thumbnailpath: thumbnailpathfile
            }).then((data) => {
                res.send({ status: true, message: "Product Image Uploaded !" });
            })
        }
    });
}
exports.addProductForm = (req, res) => {
    adminModel.getCategory().then((cat) => {
        renderdata["category"] = cat;
        adminModel.getTag().then((tags) => {
            renderdata["tags"] = tags;
            adminModel.getImage().then((data) => {
                console.log(data)
                renderdata["images"] = data;
                console.log(renderdata)
                res.render('admin/product/addproduct', renderdata)
            });
        });
    });
}

exports.addNewProduct = (req, res) => {
    req.body["published_by"] = req.session.loginuser.name + "/" + req.session.loginuser.email;
    console.log(req.body.tags)
    console.log(req.body.related)
    if (req.body.tags) req.body.tags = Array.isArray(req.body.tags) ? req.body.tags.join(',') : req.body.tags;
    if (req.body.related) req.body.related = req.body.related.join(',');
    if (adminModel.storeProduct(req.body)) {
        res.send({ status: true, 'message': '  Product Added.' });
    }
    else {
        res.send({ status: false, 'message': '  Product Not Added.' });
    }

}
exports.viewProduct = (req, res) => {
    adminModel.getProduct().then((data) => {
        renderdata["product"] = data;
        renderdata["loginuser"] = req.session.loginuser;
        adminModel.getAllImage().then(data=>{
            let idtosrc =[]
            data.forEach(d=>{
                idtosrc[d.id]={img :d.imagepath, thumbnail : d.thumbnailpath, name:d.name}
            })
            renderdata["idtosrc"]=idtosrc;
            console.log("+_+_+_+_+__+_+_+_+_+_+_+_+_+_+_+_+_+_+_+")
            console.log(renderdata)
            res.render('admin/product/viewproduct', renderdata)
        })
    })
}

function idtosrc(){
    let idtosrc = [];
    
}
exports.editProduct = (req, res) => {
    req.body["last_modified_by"] = req.session.loginuser.name + "/" + req.session.loginuser.email;
    adminModel.getCategory().then((cat) => {
        renderdata["category"] = cat;
        adminModel.getTag().then((tags) => {
            renderdata["tags"] = tags;
            adminModel.getImage().then((img) => {
                renderdata["images"] = img;
                adminModel.getOneProduct(req.body).then(prod=>{
                    renderdata["product"] = prod
                    console.log(renderdata)
                    res.render('admin/product/editproduct', renderdata)
                })
            });
        });
    }).catch((err) => {
        console.log('-------------------------------------------------------')
        console.log(err.parent.sqlMessage)
        console.log('-------------------------------------------------------')
        res.send({ status: false, 'message': err.parent.sqlMessage });
    })
}

exports.updateProduct = (req, res) => {
    req.body["last_modified_by"] = req.session.loginuser.name + "/" + req.session.loginuser.email
    adminModel.updateProduct(req.body).then((data) => {
        res.send({ status: true, 'message': "Product Updated Successfully" });
    }).catch((err) => {
        console.log('-------------------------------------------------------')
        console.log(err.parent.sqlMessage)
        console.log('-------------------------------------------------------')
        res.send({ status: false, 'message': err.parent.sqlMessage });
    })
}

exports.deleteProduct = (req, res) => {
    req.body["last_modified_by"] = req.session.loginuser.name + "/" + req.session.loginuser.email
    adminModel.deleteProduct(req.body).then(() => {
        res.send({ status: true, 'message': '  Product Deleted.' });
    }).catch((err) => {
        console.log('-------------------------------------------------------')
        console.log(err.parent.sqlMessage)
        console.log('-------------------------------------------------------')
        res.send({ status: false, 'message': err.parent.sqlMessage });
    })
}

exports.soldProduct = (req, res) => {
    req.body["last_modified_by"] = req.session.loginuser.name + "/" + req.session.loginuser.email
    adminModel.soldProduct(req.body).then(() => {
        res.send({ status: true, 'message': '  Product Sold.' });
    }).catch((err) => {
        console.log('-------------------------------------------------------')
        console.log(err.parent.sqlMessage)
        console.log('-------------------------------------------------------')
        res.send({ status: false, 'message': err.parent.sqlMessage });
    })
}
exports.unsoldProduct = (req, res) => {
    req.body["last_modified_by"] = req.session.loginuser.name + "/" + req.session.loginuser.email
    adminModel.unsoldProduct(req.body).then(() => {
        res.send({ status: true, 'message': '  Product UnSold.' });
    }).catch((err) => {
        console.log('-------------------------------------------------------')
        console.log(err.parent.sqlMessage)
        console.log('-------------------------------------------------------')
        res.send({ status: false, 'message': err.parent.sqlMessage });
    })
}
exports.logout = (req, res) => {
    req.session.destroy()
    res.render('admin/login')
}