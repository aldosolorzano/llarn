var express = require('express');
var router = express.Router();
const {User} = require('../models/index')

/* GET users listing. */
router.get('/users', function(req, res, next) {
  res.render('/users')
});
router.get('/:id', function(req, res, next) {
  const {id} = req.params;

  User
    .findById(id)
    .then(user => res.render('users/show',{user}))
    .catch(console.error)
});

module.exports = router;
