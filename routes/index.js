var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
  res.redirect('/apis-docs');
});
router.get('/apis-docs', (req, res, next) => {
  res.send('swagger docs here');
});

module.exports = router;
