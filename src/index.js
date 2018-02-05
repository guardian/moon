const html = require('./not-found');

module.exports = function(req, res) {
    if (req.url === '/healthcheck') {
        res.end('OK');
    } else {
        res.end(html);
    }
};
