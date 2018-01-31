const fs = require('fs');
const pify = require('pify');

const readFile = pify(fs.readFile);

exports.handler = function(event, context, callback) {
    readFile(`${__dirname}/not-found.html`, 'utf-8')
        .then(data => {
            const response = {
                statusCode: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: data.toString(),
            };

            callback(null, JSON.stringify(response));
        })
        .catch(err => {
            console.log(err);
            callback(err);
        });
};
