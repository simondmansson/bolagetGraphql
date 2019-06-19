require('dotenv').config()
const express = require('express')
const app = express()
const graphQLHTTP = require('express-graphql')
const schema = require('./productSchema.js')
const healthRouter = require('./health.js')
const port = process.env.PORT || 5005

app.use('/graph', graphQLHTTP({
  schema,
  graphiql: true
}))

app.use(healthRouter)

app.listen(port, () => console.log(`on port ${port}`))
