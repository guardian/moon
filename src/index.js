const fs = require('fs');
const pify = require('pify');

const readFile = pify(fs.readFile);

module.exports = function(req, res) {
    readFile(`${__dirname}/not-found.html`, 'utf-8')
        .then(data => {
            res.end(data.toString());
        })
        .catch(err => {
            console.log(err);
            res.end(err.toString());
        });
};