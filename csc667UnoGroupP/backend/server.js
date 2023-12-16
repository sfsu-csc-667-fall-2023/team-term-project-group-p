// const express = require('express');

// const creatError = require("http-errors");

// const { requestTime } = require("./middleware/request-time");
// const app = express();

// const PORT = process.env.PORT || 3000;


// app.use(requestTime);

// const rootRoutes = require("./routes/root");


// app.use("/", rootRoutes);

// app.use((_req, res, next) => {
//     next(createError(404));
// });

// app.listen(PORT, () =>{
//     console.log(`Server started on port ${PORT}`);
// })

const path = require("path");
require("dotenv").config({path:'./.env'});

const mysql = require('mysql2');

// import ejs from 'ejs';

const express = require("express");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");

const app = express();
const PORT = process.env.PORT || 3000;

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    port: process.env.PORT
});

// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'P@$sw0rd',
//     database: 'CSC667TeamPuno',
//     port: process.env.PORT || 3306
// });

db.connect((err) =>{
    if(err){
        console.log(err)
    }else{
        console.log("Database connected...!")
    }
})


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "static")));
app.use(express.static(path.join(__dirname, "backend", "static")));

app.get("/", (request, response) => {
    response.render("landing");
});
app.listen(PORT, () => {
console.log(`Server started on port ${PORT}`);
});
