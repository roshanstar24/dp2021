const express = require('express');
const app = express();

const siteRoute = express.Router();
const siteControl = require('./../controllers/siteController');

app.use(siteRoute);


siteRoute.get('/', siteControl.getHomepage);


module.exports = app;