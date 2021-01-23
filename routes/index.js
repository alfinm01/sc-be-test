var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
  console.log('in')
  res.redirect('/apis-docs');
});
router.get('/apis-docs', (req, res, next) => {
  console.log('yes')
  res.send('swagger docs here');
});

module.exports = router;
