const passport = require('passport');
const {google} = require('googleapis');
const GoogleStrategy = require('passport-google-oauth20');
const { googleOAuthId, googleSecret } = require('./config/dev');

passport.use(new GoogleStrategy({
    clientID: googleOAuthId,
    clientSecret: googleSecret,
    callbackURL: 'http://localhost:3000/auth/google/redirect'
  }, async (accessToken, refreshToken, profile, done) => {
  
    router.get('http://localhost:3000/auth/google/redirect', passport.authenticate('google',
    { failureRedirect: '/login' }),
    function(req, res, ) {  
    const url = oauth2Client.generateAuthUrl({
      // 'online' (default) or 'offline' (gets refresh_token)
      access_type: 'offline',
    
      // If you only need one scope you can pass it as a string
      scope:  ['profile', 'email']
    });
    router.get(`/oauthcallback?code=${accessToken}`);
    // This will provide an object with the access_token and refresh_token.
  // Save these somewhere safe so they can be used at a later time.
  const {tokens} = await oauth2Client.getToken(code)
  oauth2Client.setCredentials({
    refresh_token: `STORED_REFRESH_TOKEN`
  });
  
  oauth2Client.on('tokens', (tokens) => {
      if (tokens.refresh_token) {
        // store the refresh_token in my database!
        console.log(tokens.refresh_token);
      }
      console.log(tokens.access_token);
    });
  
    const currentUser = await User.findOne({ googleId: profile.id });
    if (currentUser) {
      done(null, currentUser);
    }
    else {
      const newUser = new User({
        googleId: profile.id,
      });
  
      await newUser.save();
  
      done(null, newUser);
    }
  });