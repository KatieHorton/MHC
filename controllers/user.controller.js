const mongoose = require("mongoose");
const User = require("../models/user.model");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

exports.isAuthenticated = (req, res, next) => {
  if (req.User.isAuthenticated()) {
    next();
  } else {
    res.redirect("/login");
  }
};
exports.loginPage = (req, res) => {
  res.render('login');
};
exports.register = async (req, res, next) => {
    let user = await User.findById(req.params);
    if(!user) {
    const user = new User({ email: req.body.email });
    await User.save();
      next();
    } else {
      res.redirect("/login");
    }
};