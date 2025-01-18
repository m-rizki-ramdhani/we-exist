const express = require('express')
const appConfig = require('./config/core_config')
const { sequelize } = require("./database/connection")
const routes = require('./routes/route')
const logger = require('./utils/logger/logger')

// Import security middleware
const cors = require('cors')
const helmet = require('helmet')
const xss = require('xss-clean')
const mongoSanitize = require('express-mongo-sanitize')

const app = express()

// Basic security middleware
app.use(helmet()) // Adds various HTTP headers for security
app.use(express.json({ limit: '10kb' })) // Limit body size

// CORS configuration
const corsOptions = {
  origin: appConfig.allowedOrigins || ['http://localhost:3000'], // Adjust with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 600 // Cache preflight requests for 10 minutes
}
app.use(cors(corsOptions))

// Data sanitization against XSS attacks
app.use(xss())


// Prevent NoSQL injection
app.use(mongoSanitize())

// Additional security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'DENY')
  res.setHeader('Strict-Transport-Security', 'max-age=31536000 includeSubDomains')
  next()
})

app.use(express.json())

sequelize
  .authenticate()
  .then(() => {
    logger.info("Database connected!")
  })
  .catch((error) => {
    logger.error("Failed to connect to Database. Error: ", error)
    process.exit(1)
  })


app.use('/', routes)

// Global error handler
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send({
    status: 'error',
    message: appConfig.NODE_ENV === 'production' ? 'Internal server error' : err.message
  });
});

// Handle unhandled routes
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found'
  });
});



app.listen(appConfig.PORT, () => {
    logger.info(`Server is running on http://localhost:${appConfig.PORT}`)
})
