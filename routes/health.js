module.exports = app => {
    app.get('/health', (req, res) => res.send("Im up"));
};