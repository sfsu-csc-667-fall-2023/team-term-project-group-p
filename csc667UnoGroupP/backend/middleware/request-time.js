const requestTime = (_req, res, next) => {
    console.log(
        `Request received at ${Date.now()}: ${_req.method}`
    );

    next();
}

module.exports = { requestTime }