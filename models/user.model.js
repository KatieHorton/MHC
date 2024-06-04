const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
mongoose.Promise = global.Promise;
const db = require('../db');

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  userName: String,
  googleId: String,
  created: { type: Date, default: Date.now }
    },
      { timestamps: true }
);

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
// db.collection('user').find({id: '6572018b622fc2d51412ff4c'});
// console.log(db.collection('user').find({ userName: 'user@emailstore.web' }));

const User = mongoose.model('User', userSchema);

module.exports = User;