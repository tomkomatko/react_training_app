const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const keys = require('./config/keys');
const path = require('path');
const PORT = process.env.PORT || 5000;
require('./models/user')
require('./services/passport');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, {useNewUrlParser: true});

const app = express();

//cookie
app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.session.cookieKey]
    }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));

      
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

require('./routes/authRoutes')(app);
require('./routes/cool')(app);
require('./routes/health')(app);

