var passport = require('passport')
  , { Strategy:LocalStrategy } = require('passport-local')
  , db = require('../models/index')

// Serialize Sessions
passport.serializeUser(function(user, done){
	done(null, user);
});

//Deserialize Sessions
passport.deserializeUser(function(user, done){
	db.User.find({where: {id: user.id}}).then(function(user){
		done(null, user);
	}).catch(function(err){
		done(err, null)
	});
});

// For Authentication Purposes
passport.use(new LocalStrategy(
	function(username, password, done){
    console.log('before find')
		db.User.findOne({where: {email: username}})
      .then((user) => {
        if(!user) return done(null, false);
        console.log(user)
        return Promise.all([user,db.User.validPassword(password, user.password)])
      })
      .then(([user,isMatch]) => {
        console.log(isMatch)
          if (!isMatch) {
            return done(null, false)
          } else {
            return done(null,user)
          }
        })
      .catch((err)=> {return done(err);})
	}
));

module.exports = passport
