require('dotenv').config()
const express = require('express')
const graphQLHTTP = require('express-graphql')
const schema = require('./productSchema.js')
const healthRouter = require('./health.js').router
const app = express()
const port = process.env.PORT

app.use('/', graphQLHTTP({
  schema,
  graphiql: true
}))

app.use(healthRouter)

app.listen(port || 5005, () => console.log(`on port ${port}`))
