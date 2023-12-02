const express = require('express');



const router = express.Router();

router.get("/", (_req, res) => {
    res.send("Hello world form inside a route!");
});


router.get("/:id", (_req, res) =>{
    res.send(`Other route ${_req.params.id}`);
});
module.exports = router;