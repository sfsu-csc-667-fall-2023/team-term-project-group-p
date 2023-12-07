const { promiseHooks } = require('v8');
var db = require('../config/database');
var bcrypt = require('bcrypt');
const userModel = {};

userModel.create = (username, password, email) => {
    return bcrypt.hash(password, 15)
    .then((hashedPass) => {
        let baseSQL = "INSERT INTO users(username, email, password, created) VALUES (?,?,?,now());";
        return db.execute(baseSQL, [username, email, hashedPass])
    })
    .then(([results, fields]) => {
        if (results && results.affectedRows) {
            return Promise.resolve(results.insertId);
        } else {
            return Promise.resolve(-1);
        }
    })
    .catch((err) => Promise.reject(err));
}

userModel.usernameExists = (username) => {
    let baseSQL = "SELECT * FROM users WHERE username=?";
    return db.execute(baseSQL, [username])
    .then(([results, fields]) => {
        return Promise.resolve(!(results && results.length == 0));
    })
    .catch((err) => Promise.reject(err));
}

userModel.emailExists = (email) => {
    let baseSQL = "SELECT * FROM users WHERE email=?";
    return db.execute(baseSQL, [email])
    .then(([results, fields]) => {
        return Promise.resolve(!(results && results.length == 0));
    })
    .catch((err) => Promise.reject(err));
}

userModel.authenticate = (username, password) => {
    let userId;
    let baseSQL = "SELECT id, username, password FROM users WHERE username=?";

    return db.execute(baseSQL, [username])
    .then(([results, fields]) => {
        if (results && results.length == 1) {
            userId = results[0].id;
            return bcrypt.compare(password, results[0].password);
        } else {
            return Promise.reject(-1);
        }
    })
    .then((passwordsMatch) => {
        if (passwordsMatch) {
            return Promise.resolve(userId);
        } else {
            return Promise.resolve(-1);
        }
    })
    .catch((err) => Promise.reject(err));
}

module.exports = userModel;