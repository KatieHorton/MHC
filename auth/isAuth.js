const User = require('../models/user.model');

exports.isAuthenticated = (req, res, next) => {
  if (req.User.isAuthenticated) {
    next();
  } else {
    res.sendStatus(401);
  }
};
exports.success = (req, res) => {
  req.flash(`Welcome ${req.user.email}`);
};
exports.failure = (req, res) => {
  res.send('Failed');
};

