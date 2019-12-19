const passport = require('passport');

module.exports = app => {
    app.get(
        '/auth/google', 
        passport.authenticate('google',{ //internal identifier for GoogleStrategy
        scope: ['profile', 'email']})   // lot of scope strategies are defined here, not only profile and email TODO: explore more strategies
    )
  
    app.get('/auth/google/callback', passport.authenticate('google'));

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send(req.user);
        console.log('User logged out');
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
        console.log("Endpoint hit");
        console.log(req.user)
    });
};