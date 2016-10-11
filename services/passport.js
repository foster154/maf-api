const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// ==============================================
//  Local Strategy (verify email/password)
// ==============================================

// Create local strategy
// Creating token upon signin
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function(email, password, done){
  // Verify this username & password
  // if correct, call 'done' with the user
  // otherwise, call 'done' with false
  
  // Search for user via email
  User.findOne({ email: email }, function(err, user) {
    // Error while searching for user
    if (err) { return done(err); }
    // User not found
    if (!user) { return done(null, false); }
    
    // User found, compare passwords
    user.comparePassword(password, function(err, isMatch) {
      if (err) { return done(err); }
      if (!isMatch) { return done(null, false); }
      
      return done(null, user);
    });
    
  });
});

// ==============================================
//  JWT Strategy (verify token)
// ==============================================

// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

// Creating JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  
  // See if userID and payload exists in our DB
  User.findById(payload.sub, function(err, user) {
    // Error searching for user (?)
    if (err) { return done(err, false); }
    
    if (user) {
      // Found a user
      done(null, user);
    } else {
      // Did not find a user
      done(null, false);
    }
  });
});

// ==============================================
//  Wire up strategies
// ==============================================

passport.use(jwtLogin);
passport.use(localLogin);