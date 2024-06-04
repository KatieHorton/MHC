const provider = require('../controllers/provider.controller');
const express = require('express');
const router = express.Router();
const user = require('../controllers/user.controller');
const auth = require('../auth/isAuth');
const passport = require('passport');
const process = require('../process/.env');
const handleError = require('../handlers/handleError');
const flashes = require('connect-flash');
const User = require('../models/user.model');
//AUTH
router.get('/failure', auth.failure);
router.get('/success', auth.success);
router.get('/auth/google',
  passport.authenticate('google', {
    clientId: process.googleOAuthId,
    scope:[ 'email', 'profile' ] }
));
router.get('/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/success',
        failureRedirect: '/failure'
}));

router.get('/register', user.register);
router.post('/register', function (req, res) {
  passport.authenticate('local')(req, res, function () {
    res.redirect('/');
  });
});
router.get('/login', function (req, res) {
  res.render('login', { user: req.user });
});
router.post('/login', user.login);
router.get('/ping', function (req, res) {
  res.send("pong!", 200);
});
// router.use('isAuth', auth.isAuthenticated);

//userList
// router.get('/user', user.getUsers);
router.get('/user', user.listUsersPage);
//add-update user
router.get('/addUser', user.addUpdateUserPage);
router.post('/addUpdateUser', user.addUpdateUser);
router.get('/updateUser/:id', user.addUpdateUserPage);
//delete-user
router.get('/delete/:id', user.deleteUser);

//Provider LIST
//router.get('/', provider.getAll);
router.get('/', provider.listProvidersPage);
//ADD-UPDATE
router.get('/add', provider.addUpdateProviderPage);
router.post('/addProvider', provider.addProvider);
router.get('/update/:id', provider.addUpdateProviderPage);
//FIND ONE BY ID
router.get('/profile', provider.profilePage);
router.post('/profile', provider.getOne);
router.get('/profile/:id', provider.profilePage);
// //REQUEST INFORMATION
router.get('/request', provider.request);
//FIND BY PROFESSION
router.get('/profession', provider.findProfessionPage);
router.post('/getProfession', provider.findByProfession);
//DELETE
router.get('/delete/:id', provider.deleteProvider);
router.get('/secrets', auth.isAuthenticated, (req, res) =>
  res.send('mental health matters.')
);

//LOGOUT
router.get('/logout', user.logout);


// router.get('/User', auth.isAuthenticated, user.User);
// router.posthandleError(('/User', user.updateUser));

module.exports = router;