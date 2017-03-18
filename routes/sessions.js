var express = require('express');
var router = express.Router();
var passport = require('../config/passport')
/* GET home page. */
router.get('/new', function(req, res, next) {
  res.render('sessions/new');
});
// router.post('/',function(req, res, next) {
//   console.log('llarn')
//   passport.authenticate('local',(err,user,info)=>{
//     if (user) {
//       res.redirect(`/users/${user.id}`)
//     } else {
//       next(err);
//     }
//   })
// });

router.post('/',
  passport.authenticate('local', { failureRedirect: '/sessions/new' }),
  function(req, res) {
    res.redirect(`/users/${req.user.id}`)
  });
module.exports = router;
