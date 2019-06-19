const express = require('express')
const router = express.Router()

router.get('/health', (_, res) => {
  res.sendStatus(200)
})

module.exports = router
