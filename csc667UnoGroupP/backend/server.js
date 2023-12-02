const express = require('express');

const creatError = require("http-errors");

const { requestTime } = require("./middleware/request-time");
const app = express();

const PORT = process.env.PORT || 3000;


app.use(requestTime);

const rootRoutes = require("./routes/root");


app.use("/", rootRoutes);

app.use((_req, res, next) => {
    next(createError(404));
});

app.listen(PORT, () =>{
    console.log(`Server started on port ${PORT}`);
})