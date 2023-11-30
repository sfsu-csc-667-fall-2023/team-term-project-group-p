class userError extends Error {
    constructor(message, redirectionURL, status) {
        super(message);
        this.redirectionURL = redirectionURL;
        this.status = status;
    }

    getMessage() {
        return this.message;
    }

    getRedirectionURL() {
        return this.redirectionURL;
    }

    getStatus() {
        return this.status;
    }
}

module.exports = userError;