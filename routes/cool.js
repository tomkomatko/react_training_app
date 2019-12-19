const cool = require('cool-ascii-faces');

module.exports = app => {
    app.get('/cool', (req, res) => res.send(cool()));
};
