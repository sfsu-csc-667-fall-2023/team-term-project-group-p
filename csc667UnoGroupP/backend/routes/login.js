const express = require("express");
const loginRouter = express.Router();
const process = require("process");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const path = require('path');


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

loginRouter.get("/", (req, res) => {
    res.render('login');
});


loginRouter.post("/", (req, res) => {
    const { username, password} = req.body;
    
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error querying the database: ' });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: 'Username does not exist. Please register' });
        }

        const user = results[0];

        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error comparing passwords: ' });

            }
            if (!result) {
                return res.status(401).json({ error: 'Wrong password' });
            }

            res.render('lobby');  

        });
    });
    
});

loginRouter.get("/logout", (req, res) => {
    if (req.session.username !== null){
        req.session.username = null;
        req.session.user_type = null;
        req.session.user_id = null;
        
    }
    console.log(req.session.username);
    return res.redirect('/login');

})
module.exports = { loginRouter };