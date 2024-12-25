const express = require('express')
const appConfig = require('./config/core_config');
const { sequelize } = require("./database/connection");

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


app.get('/', (req, res) => {
    res.status(200).send('Sukses')
})

app.listen(appConfig.port, () => {
    console.log(`Server is running on http://localhost:${appConfig.port}`)
})