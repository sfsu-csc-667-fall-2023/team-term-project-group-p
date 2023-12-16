const express = require("express");
const signupRouter = express.Router();
const process = require("process");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const path = require('path');


// import { fileURLToPath } from 'url';

// import { dirname } from 'path';

// const currentModuleUrl = import.meta.url;
// const currentModulePath = fileURLToPath(currentModuleUrl);
// const registrationHtmlPath = path.join(dirname(currentModulePath), '..', '..', 'frontend', 'registration.html');


const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    port: process.env.PORT || 3307,
    connectTimeout: 30000
});


db.connect((err) =>{
    if(err){
        console.log(err)
    }else{
        console.log("Database connected...!")
    }
})

signupRouter.get("/", (req, res) => {
    const message = req.query.message || "";
    res.render('signup', {message});
});



signupRouter.post("/", (req, res) => {
    const {  username, email, password } = req.body;
    // if (passwordValidation(password) == false) {
    //     return res.redirect('/register?message=Password requires minimum: 8 char, 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character');
    // }
   
    db.query('SELECT * FROM users WHERE username = ? ', username, function (err, result) {
        if (err) {
            return res.status(500).json({ error: 'Error querying the database:' });
        } 
        if (result.length > 0)  {
            return res.redirect('/register?message=username already exists');
        }

        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                return res.status(500).json({ error: 'Error hashing password: ' });
            }
            const user = {  username, email, password: hash };
    
            db.query('INSERT INTO Users SET ?', user, (err, result) => {
                if (err) {
                    
                    return res.redirect('/');
                }
                console.log('successfully created account!')
                res.redirect('/login');
            });
        });
    });
});
module.exports = { signupRouter };