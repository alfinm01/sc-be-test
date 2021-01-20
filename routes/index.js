var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.send('it works!');
  res.redirect('/apis-docs');
});

router.get('/apis-docs', function(req, res, next) {
  res.send('swagger docs here');
});

module.exports = router;
