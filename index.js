require('dotenv').config({ path: './.env' });
const http = require('http');
const express = require('express');
const routes = require('./routes/index.js');
const exphbs = require('express-handlebars');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const process = require('./process/.env');
const flash = require('connect-flash');
const User = require('./models/user.model.js');
const userController = require('./controllers/user.controller.js');
const PORT = 3000;
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const db = require('./db');

// The Google account has not logged in to this app before.  Create a
// new user record and link it to the Google account.

// The Google account has previously logged in to the app.  Get the
// user record linked to the Google account and log the user in.

// passport.use(new GoogleStrategy({
//   clientID: process.googleOAuthId,
//   clientSecret: process.googleOAuthSecret,
//   callbackURL: 'http://localhost:3000/auth/google/callback',
//   passReqToCallback   : true
// }, async (accessToken, refreshToken, profile, done) => {
//   let foundUser = await User.findOne({ email: profile.email });
//   if (!foundUser) {
//     let newUser = new User({
//       email: profile.email,
//       googleId: profile.id
//     });
//     console.log(newUser);
//     await newUser.save();
//   } else {
//     return ({ foundUser });
//   }
//   res.redirect('/');
// }
// ));

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('your secret here'));
app.use(session({
  secret: 'Mental Health Matters',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(flash());
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(routes);

app.listen(PORT || 3000, () => console.log(`Server listening on port: ${PORT}`));

app.get('/auth/google',
  passport.authenticate('google', {
    clientId: process.googleOAuthId,
    scope: ['email', 'profile']
  }
  ));

app.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/failure'
  }));