const mongoose = require("mongoose");
const User = require("../models/user.model");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const db = require('../db.js');

exports.isAuthenticated = (req, res, next) => {
  if (req.User.isAuthenticated()) {
    next();
  } else {
    res.redirect('/');
  }
};
exports.loginPage = (req, res) => {
  res.render('login');
};
exports.login = (req, res) => {
  req.session = null;
  req.login();
  res.render('/', { user: req.user });
  // res.redirect('/');
};
exports.logout = (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('/');
};
exports.register = async (req, res) => {
  user.register(new User({ username: req.body.email }), req.body.password, function (err, User) {
    if (err) {
      return res.render('register', { User: User });
    }
  })
};

exports.addUpdateUser = async (req, res) => {
  console.log(req.body.email);
  console.log(req.body.password);
  console.log(req.body.displayName);
  console.log(req.body.googleId);
  if (req.body.id) {
    let user = await User.findById(req.params.id);
    console.log(req.body);
    req.flash('info', 'User exixts?')
  } else {
    let user = new User(req.body);
    await user.save();
    req.flash('info', 'User added');
  }
  res.redirect('/');
};
exports.addUpdateUserPage = async (req, res) => {
  if (req.params.id) {
    let user = await User.findById(req.params.id).lean();
    res.render('addUpdateUser', { user });
  } else {
    res.render('addUpdateUser');
  }
};

exports.getUsers = async (req, res, next) => {
  let users = await User.find({}).lean();
  res.send([users]);
  next();
};
exports.listUsersPage = async (req, res) => {
  //let mainHeader = 'User List';
  let users = await User.find({}).lean();
  // let email = req.User ? req.User.email : 'Not logged in';
  res.render('usersList', { users } );
};
// exports.findOne = async (req, res) => {
//   const currentUser = await User.findById(req.params.id).lean();
//   if (!currentUser) {
//     res.status(404).send();
//   } else {
//     res.send(currentUser);
//   }
// };
exports.deleteUser = async (req, res) => {
  let currentUser = await getUser.findByIdAndDelete(req.params.id);
  req.flash('info', 'User deleted');
  res.redirect('/');
};