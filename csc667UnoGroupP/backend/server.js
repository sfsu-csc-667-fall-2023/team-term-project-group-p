const path = require("path");
require("dotenv").config({path:'./.env'});

const { signupRouter } = require("./routes/signup");
const { loginRouter } = require("./routes/login");

const middleware = require('./middleware/auth');

const mysql = require('mysql2');
const express = require("express");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const app = express();
const PORT = 3000;

// Session middleware setup
const sessionMiddleware = session({
    secret: 'some-secret-key',
    resave: false,
    saveUninitialized: false,
  });
  
  // Use session middleware
  app.use(sessionMiddleware);


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

app.use('/signup', signupRouter);
app.use('/login', loginRouter);

app.listen(PORT, () => {
console.log(`Server started on port ${PORT}`);
});
