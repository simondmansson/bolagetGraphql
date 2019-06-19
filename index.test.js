const test = require('ava')
const supertest = require('supertest')
const express = require('express')
const app = express()
const healtRouter = require('./health.js')
app.use(healtRouter)

test('foo', t => {
  t.pass()
})

test.cb('health check', t => {
  supertest(app)
    .get('/health')
    .expect(200)
    .end(t.end)
})
