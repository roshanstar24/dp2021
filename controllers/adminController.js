const adminModel = require('../models/admin/adminModel');
const express = require('express');
const path = require('path')
const app = express();

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
                    picture: authresult.picture
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
    var __relativepath = '/assets/uploads/profile/' + (req.session.loginuser.id + '.' + ext)
    uploadPath = path.join(__basedir, __relativepath);
    console.log(uploadPath)
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, function (err) {
        if (err) {
            return res.status(500).send({ status: false, message: err });
        }
        adminModel.saveProfileURL({ id: req.session.loginuser.id, path: __relativepath }).then((data) => {
            res.send({ status: true, message: "Display Picture File Uploaded !" });
        })
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

exports.logout = (req, res) => {
    req.session.destroy()
    res.render('admin/login')
}