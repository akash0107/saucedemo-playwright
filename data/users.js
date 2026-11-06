module.exports = {
    standard: {
        // Public SauceDemo demo account; override via env vars if needed
        username: process.env.SAUCE_USERNAME || "standard_user",
        password: process.env.SAUCE_PASSWORD || "secret_sauce"
    }
}
