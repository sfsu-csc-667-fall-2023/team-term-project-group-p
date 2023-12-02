// TODO: #1 Create Registration and login pages.

const userReg = "/Some Registration Page";
const userlogin = "/Some Login Page";

const validateUsername = (username) => {
    let usernameValidator = /^\D\w\{2, }$/;
    return usernameValidator.test(username);
}

const validatePassword = (password) => {
    const passRegEx = new RegEx("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[(\/*-+!@#$^&*)]).{8,}$");

    let passValidator = passRegEx;
    return passValidator.test(password);
}

const validateEmail = (email) => {
    const emailRegEx = new RegEx("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$");

    let emailValidator = emailRegEx;
    return emailValidator.test(email);
}

const validateRegistration = (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;

    if(!validateUsername(username)) {
        req.flash('error', "That username is invalid.");
        req.session.save(err => {
            res.redirect(userReg);
        });
    }else if (!validatePassword(password)) {
        req.flash('error', "That password is invalid.")
        req.session.save(err => {
            res.redirect(userReg);
        });
    }else if (!validateEmail(email)) {
        req.flash('error', "That email is invalid.")
        req.session.save(err => {
            res.redirect(userReg);
        });
    }else{
        next();
    }
}

const validateLogin = (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;

    if (!validateUsername(username)) {
        req.flash('error', "This username is invalid. Please Check your Username and try again.");
        req.session.save(err => {
            res.redirect(userlogin);
        });
    }else if (!validatePassword(password)) {
        req.flash('error', "This password is invalid. Please check your password and try again.");
        req.session.save(err => {
            res.redirect(userlogin);
        })
    }else{
        next();
    }
}

module.exports = { validateRegistration, validateLogin}