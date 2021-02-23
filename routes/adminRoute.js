const express = require('express');
const app = express();

const adminRoute = express.Router();
const adminControl = require('./../controllers/adminController');

app.use(adminRoute);



adminRoute.get('/login', adminControl.getLogin);
adminRoute.post('/login', adminControl.postLogin);
adminRoute.post('/loginagain', adminControl.loginagain);
adminRoute.get('/logout', adminControl.logout);
adminRoute.get('/dashboard', adminControl.dashboard);

//----------- TEAM
adminRoute.get('/addteam', adminControl.addTeamForm);
adminRoute.post('/addnewteam', adminControl.addNewTeam);
adminRoute.post('/verifyemail', adminControl.verifyemail);
adminRoute.get('/viewteam', adminControl.viewTeam);
adminRoute.post('/deleteteam', adminControl.deleteTeam);
adminRoute.post('/editteam', adminControl.editTeam);
adminRoute.post('/updateteam', adminControl.updateTeam);
adminRoute.post('/showprofile', adminControl.showProfile);
adminRoute.post('/changepassword', adminControl.changePassword);
adminRoute.post('/uploadprofilephoto', adminControl.uploadProfilePhoto);

//----------- CUSTOMER

adminRoute.get('/addcustomer', adminControl.addCustomerForm);
adminRoute.post('/addnewcustomer', adminControl.addNewCustomer);

//----------- TAG
adminRoute.get('/addtag', adminControl.addTagForm);
adminRoute.get('/viewtag', adminControl.viewTag);
adminRoute.post('/addnewtag', adminControl.addNewTag);
adminRoute.post('/deletetag', adminControl.deleteTag);
adminRoute.post('/edittag', adminControl.editTag);
adminRoute.post('/updatetag', adminControl.updateTag);

adminRoute.get('/', (req, res) => {
    res.send("Proceed to Login")
})

module.exports = app;