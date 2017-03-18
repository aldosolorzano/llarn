'use-strict'
var Promise = require("bluebird"),
    bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    email:{
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
      notEmpty: true
    },
    password:{
      type: DataTypes.STRING,
      allowNull: true,
      notEmpty: true
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      },
      validPassword: function(password, passwd){
				return bcrypt.compareAsync(password, passwd ).then(isMatch => {
          return isMatch
        }
        ).catch(console.error)
			}
    }
  });
  User.beforeCreate((user,options,done)=>{
    bcrypt.genSaltAsync(SALT_WORK_FACTOR)
             .then((salt)=> {
               return bcrypt.hashAsync(user.password, salt, null);
             })
             .then((hash)=> {
               user.password = hash;
               return done(null,user);
             })
             .catch(console.error);
  });
  return User;
};
