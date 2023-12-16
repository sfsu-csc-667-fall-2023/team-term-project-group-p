const express = require('express');
const lobbyRouter = express.Router();
const process = require("process");
const path = require('path');

lobbyRouter.get('/', (req, res) => {
   
    if (!req.session.user) {
        return res.redirect('/signup'); 
    }
    res.render('lobby', { user: req.session.user });
});

module.exports = lobbyRouter;
