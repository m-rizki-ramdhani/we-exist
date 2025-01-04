const express = require('express')
const appConfig = require('./config/core_config');
const { sequelize } = require("./database/connection");
const routes = require('./routes/route')

const app = express()
app.use(express.json())

sequelize
  .authenticate()
  .then(() => {
    console.log("Database Connected!")
  })
  .catch((error) => {
    console.error("Failed to connect to Database: ", error)
  })


app.use('/', routes)

app.listen(appConfig.port, () => {
    console.log(`Server is running on http://localhost:${appConfig.port}`)
})