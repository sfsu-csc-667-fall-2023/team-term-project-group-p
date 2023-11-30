var express = require('express');
var router = express.Router();
exports.router = router;
var db = require('../config/database');

var app = express();
// TODO: Port
var port = someport;
var bcrypt = require('bcrypt');

const { errPrint, successPrint } = require('../helpers/debugPrinters');

router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;
