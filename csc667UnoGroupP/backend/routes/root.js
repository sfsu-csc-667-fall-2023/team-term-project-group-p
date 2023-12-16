const express = require('express');



const router = express.Router();

router.get("/", (req, res) => {
    //res.send("Hello world form inside a route!");

    const io = req.app.get('io'); // Get the io instance from the app

    io.on('connection', (socket) => {
        console.log('A user connected');

        // Handle chat messages
        socket.on('chat message', (msg) => {
            io.emit('chat message', msg);
        });

        // Handle disconnection
        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });
});


router.get("/:id", (_req, res) =>{
    res.send(`Other route ${_req.params.id}`);
});
module.exports = router;