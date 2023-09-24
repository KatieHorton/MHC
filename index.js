require('dotenv').config({ path: './.env' });
const express = require('express');
const routes = require('./routes/index.js');
const exphbs = require('express-handlebars');
const session = require('express-session');
const passport = require('passport');
const GithubStrategy = require('passport-github2');
//const GoogleStrategy = require('passport-google-oauth20');
const flash = require('connect-flash');
const User = require('./models/user.model');
const PORT = 3000;
require('./db');

// passport.use(
//   new GithubStrategy(
//     {
//       clientID: process.env.GITHUB_CLIENT_ID,
//       clientSecret: process.env.GITHUB_SECRET,
//       callbackURL: process.env.GITHUB_CALLBACK
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         const user = await User.findOne({ clientID : github._id });

//         if (user) {
//           return done(null, user);
//         } else {
//           const newUser = new User({
//             email: profile.email,
//             name: profile.displayName,
//             githubId: profile.id,
//           });

//           await newUser.save();

//           done(null, newUser);
//         }
//       } catch (error) {
//         done(error);
//       }
//     }
//   )
// );

// passport.use(new GoogleStrategy({
//   clientID: googleOAuthId,
//   clientSecret: googleSecret,
//   callbackURL: "http://localhost:3000/auth/google/redirect"
// }, async (accessToken, refreshToken, profile, done) => {
//   let currentUser = await User.findOne({ googleId: profile.id });

//   if (currentUser) {
//     done(null, currentUser);
//   }
//   else {
//     const newUser = new User({
//       googleId: profile.id,
//     });

//     await newUser.save();

//     done(null, newUser);
//   }
// }));

// passport.use(User.createStrategy());

// passport.serializeUser((user, done) => {
//   done(null, user._id);
// });

// passport.deserializeUser(async (id, done) => {
//   const user = await User.findById(id, "name email _id");
//   done(null, user);
// });
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(session({
  secret: 'Mental Health Matters',
  resave: true,
  saveUninitialized: true
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(routes);

app.listen(PORT || port, () => console.log(`Server listening on port: ${PORT}`));

// const ngrok = require('ngrok');
// (async function() {
//   const url = await ngrok.connect({ authtoken: process.env.NGROK_AUTH_TOKEN });
// })();