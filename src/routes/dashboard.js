var express = require('express');
var router = express.Router();
var dashboardController = require('../controllers/dashboard');
router.get('/', (req, res) => {
  res.render("home");
});
module.exports = router;
