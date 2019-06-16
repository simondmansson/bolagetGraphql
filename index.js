require('dotenv').config()
const express = require('express')
const graphQLHTTP = require('express-graphql')
const app = express()
const schema = require('./productSchema.js')

app.use('/', graphQLHTTP({
  schema,
  graphiql: true
}))
app.listen(5005, () => console.log('on port 5005'))
