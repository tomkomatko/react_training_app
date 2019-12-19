const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => { //same user as existingUser or user down
  console.log("Serializing user", user)
  done(null, user.id);  //null - any error expecting, user.id - identify user in following request
});

passport.deserializeUser((id , done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
      proxy: true
    }, (accessToken, refreshToken, profile, done) => {
          User.findOne({ googleId: profile.id }) // query to find first user with googleId matches profile.id
            .then((existingUser) => {
              if (existingUser) {
                //we already have a record with specific googleId
                done(null, existingUser);
              }
              else{
                //We don't ave a user with record
                new User({ googleId: profile.id })
                .save()
                .then(user => done(null, user))
              }
            });
        }
    )
  );