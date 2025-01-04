const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.json({
        code: 200,
        message: 'health check api',
        data: {}
    })
})

module.exports =  router