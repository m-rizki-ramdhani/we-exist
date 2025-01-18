require('dotenv').config()

const appConfig = {
    PORT  : process.env.PORT | 3000,
    NODE_ENV : process.env.NODE_ENV | "dev"
} 

module.exports = appConfig;
