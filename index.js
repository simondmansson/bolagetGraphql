require('dotenv').config()
const rateLimit = require('express-rate-limit')
const express = require('express')
const app = express()
const graphQLHTTP = require('express-graphql')
const schema = require('./productSchema.js')
const healthRouter = require('./health.js')
const port = process.env.PORT || 5005
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 100,
  message: 'To many requests sent from this ip'
})

app.use(limiter)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'GET, POST')
  next()
})

app.use('/graph/view', graphQLHTTP({
  schema,
  graphiql: true
}))

app.post('/graph', graphQLHTTP({
  schema
}))

app.get('/graph', graphQLHTTP({
  schema
}))

app.use(healthRouter)

app.listen(port, () => console.log(`on port ${port}`))
