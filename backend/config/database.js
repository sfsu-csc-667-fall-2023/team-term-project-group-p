const mysql = require('mysql2');

const db = mysql.createPool({
    host:' ',
    user: ' ',
    database: 'csc667Unodb',
    password: '1234'
});

module.exports = db.promise();