// const table = require('./database/table_defination')
const express = require('express');
const path = require('path')
const session = require('express-session')

const fileUpload = require('express-fileupload');
const app = express();
const bodyParser = require('body-parser');
const adminRoute = require('./routes/adminRoute');

global.__basedir = __dirname;

app.use(session({
    secret: 'designpoint life secretsession',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1800000, secure: false }
}))

app.set('port', process.env.PORT || 3000);
app.use(fileUpload({ createParentPath: true }));
app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'ejs');

app.use('/site/assets', express.static(path.join(__dirname, 'assets/site')));
app.use('/admin/assets', express.static(path.join(__dirname, 'assets/admin')));
app.use('/assets/uploads', express.static(path.join(__dirname, 'assets/uploads')));





app.use('/admin', adminRoute);


app.get('/', (req, res) => {
    res.send("IndexPage")
});



app.listen(app.get('port'), () => {
    console.log("Express is Running at port");
})



// table.sync({
//     // force: true
// }).then(() => {
//     app.listen(3000, () => {
//         console.log("Express is Running at port");
//     })
// })
