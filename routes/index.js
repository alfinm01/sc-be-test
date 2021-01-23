const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  res.redirect('https://app.swaggerhub.com/apis-docs/alfinm01/sejutacita-be-test/1.0.0')
})

module.exports = router
