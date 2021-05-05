const express = require('express');
const app = express();

const siteRoute = express.Router();
const siteControl = require('./../controllers/siteController');

app.use(siteRoute);


siteRoute.get('/', siteControl.getHomepage);
siteRoute.get('/category/:p',siteControl.getpcategory)
siteRoute.get('/category/:p/:s',siteControl.getscategory)
siteRoute.get('/category/:p/:s/:t',siteControl.gettcategory)
siteRoute.get('/category/:p/:s/:t/:q',siteControl.getqcategory)

siteRoute.post('/category/:p',siteControl.postpcategory)
siteRoute.post('/category/:p/:s',siteControl.postscategory)
siteRoute.post('/category/:p/:s/:t',siteControl.posttcategory)
siteRoute.post('/category/:p/:s/:t/:q',siteControl.postqcategory)

module.exports = app;