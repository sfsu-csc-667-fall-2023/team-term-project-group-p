const userError = require('../helpers/userError');
const { validateRegistration, validateLogin } = require('../middleware/validators');
const userModel = require('../models/userModel');
const { router } = require('./users');
const { errPrint, successPrint } = require('../helpers/debugPrinters');

router.post('/register', validateRegistration, (req, res, next) => {
    let username = req.nody.username;
    let email = req.body.email;
    let password = req.body.password;
    let confirmPassword = req.body.confirmPassword;

    userModel.usernameExists(username)
        .then((usernameDoesExist) => {
            if (usernameDoesExist) {
                throw new userError(
                    "Registration has failed. This username already exists.",
                    "/register",
                    200
                );
            } else {
                return userModel.emailExists(email);
            }
        })
        .then((emailDoesExist) => {
            if (emailDoesExist) {
                throw new userError(
                    "Registration has failed. This email already exists.",
                    "/register",
                    200
                );
            } else {
                return userModel.create(username, password, email);
            }
        })
        .then((createUserId) => {
            if (createUserId < 0) {
                throw new userError (
                    "Server Error: This user could not be created.",
                    "/register",
                    500
                );
            } else {
                successPrint("userModel.js --> User has been created!");
                req.session.save(err => {
                    res.redirect('/login');
                    req.flash('success', 'User account has been made. Please login.');
                })
            }
        })
        .catch((err) => {
            errPrint("User could not be created. Please try again.", err);
            if (err instanceof userError) {
                errPrint(err.getMessage());
                res.status(err.getStatus());
                res.redirect(err.getRedirectionURL());
                req.flash('error', err.getMessage());
            } else {
                next(err);
            }
        })
});

router.post('/login', validateLogin, (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;

    userModel.authenticate(username, password)
    .then((userLoggedIn) => {
        if(userLoggedIn > 0) {
            successPrint('User ${username} has been logged in!');
            req.session.username = username;
            req.session.userId = userLoggedIn;
            res.locals.logged = true;
            req.session.save(err => {
                res.redirect('/');
            });
            req.flash('success', 'You have been successfully logged in.');
        } else {
            throw new userError("Invalid username and/or password. Please check your username and password and try again.", "/login", 200);
        }
    })
    .catch((err) => {
        errPrint("User login has failed.");
        if (err instanceof userError) {
            errPrint(err.getMessage());
            res.status(err.getStatus());
            res.redirect('/login');
            req.flash('error', err.getMessage());
        } else {
            next(err);
        }
    })
})

router.post('/logout', (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            errPrint ('Session could not be destroyed.');
            next(err);
        } else {
            successPrint('Session was destroyed.');
            res.clearCookie('csid');
            res.json({status: "OK", message: "User has been logged out."});
        }
    })
});

module.exports = router;