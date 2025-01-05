const express = require('express')
const appConfig = require('./config/core_config');
const { sequelize } = require("./database/connection");
const routes = require('./routes/route');
const logger = require('./utils/logger/logger');

const app = express()
app.use(express.json())

sequelize
  .authenticate()
  .then(() => {
    logger.info("Database connected!")
  })
  .catch((error) => {
    logger.error("Failed to connect to Database. Error: ", error)
  })


app.use('/', routes)

app.listen(appConfig.port, () => {
    logger.info(`Server is running on http://localhost:${appConfig.port}`)
})