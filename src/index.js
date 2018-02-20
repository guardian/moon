const { render } = require('./render');

export default function serve(req, res) {
    if (req.url === '/healthcheck') {
        res.end('OK');
    } else {
        res.end(render());
    }
}
