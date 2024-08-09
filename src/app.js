// "use strict";
const express = require('express');
const body_parser = require('body-parser');
// const route = require('./controllers');
const routes = require('./routes');
const cors = require('cors');
const path = require('path');
const app = express();
const statusTwoHundred = 200;
const statusFiveHundred = 500;
const model = require('./models');

const https = require('https');
const fs = require('fs');

// data seerders
const seeders = require('./seeders/roles');


app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.status(statusTwoHundred).send('ok');
});
app.get('/errorHandelerRoot', function (req, res, next) {
    next(new Error('whoops!'))
});

app.use(body_parser.urlencoded({
    limit: '50mb',
    extented: true
}));
app.use(body_parser.json({ limit: '50mb', extented: true }));
app.use(express.urlencoded({ extended: true }))
app.use(cors());

app.use(express.static(__dirname + '/public'));

app.use('/static', express.static('uploads'));

app.use(function (err, req, res, next) {
    res.status(statusFiveHundred).send('Somthing broke !');
});

// route(app);

// Routes
app.use('/', routes);

process.on('uncaughtException', function (err) {
    console.log('Ucaught excepttion', err);
});


// const options = {
//     key: fs.readFileSync('./key/private.key'),
//     cert: fs.readFileSync('./key/certificate.crt'),
//     ca: fs.readFileSync('./key/ca_bundle.crt')
// };

console.log("Syncing database...");

model.sequelize.sync({
    // logging: true,
    alter: false
}).then(function () {
    console.log("Starting up server....");

    // Call the seeders functions when the application starts
    seeders.seedAdminRole();
    seeders.seedAdminUser();
    seeders.seedDeliveryChargeTypes();
    seeders.seedCouponTypes();
    seeders.seedorderStatus();
    seeders.seedorderPaymentMethods();
    seeders.seedRefundStatusMaster();
    seeders.seedRefundRequestMethodMaster();

    // https.createServer(options, app).listen(3000, () => {
    //     console.log('Lisenting https at port - 3000')
    // })


    app.listen(3000, function () {
        console.log('Lisenting at port 3000')
    });
});

module.exports = app;