const {Sequelize} = require("sequelize")
const sequelizeConfig = require('../config/sequelize')[process.env.APP_ENV] || 'development'

const sequelize = new Sequelize(
    sequelizeConfig.database,
    sequelizeConfig.username,
    sequelizeConfig.password,
    {
        host: sequelizeConfig.host,
        dialect: 'mysql'
    }
)

const db = {
    Sequelize: Sequelize,
    sequelize: sequelize
}

module.exports = db