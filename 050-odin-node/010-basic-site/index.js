'use strict'

import http from 'node:http'
import fs from 'node:fs'

const hostname = '127.0.0.1';
const port = 8000;

const server = http.createServer();

server.listen(port, hostname, () =>
    console.log(`Server running at http://${hostname}:${port}/`));

server.on('request', (request, response) => {
    const { headers, method, url } = request;

    console.log(headers['host'] + ' - ' + headers['user-agent']);

    let body = [];

    request
        .on('error', error => doError(error, response))
        .on('data', chunk => body.push(chunk))
        .on('end', () => {
            body = Buffer.concat(body).toString();
            if (body.length > 0)
                console.log(body);
        })

    response.on('error', error => doError(error, response));

    // write explicit headers
    response.writeHead(200, {
        'Content-Type': 'text/html',
        'X-Powered-By': 'beer',
    });

    if (method !== 'GET') {
        response.write('<html>');
        response.write('<body>');
        response.write('<h1>GET only, please</h1>');
        response.write('</body>');
        response.write('</html>');
        response.end();
    }
    else {
        let filepath = null;
        switch (url) {
            case '/':
                filepath = 'index.html';
                break;
            case '/about':
                filepath = 'about.html';
                break;
            case '/contact':
                filepath = 'contact-me.html';
                break;
            default:
                filepath = '404.html';
                break;
        }

        const readable = fs.createReadStream(filepath);
        readable.on('error', error => doError(error, response));
        readable.pipe(response);
    }
});

function doError(error, response) {
    console.error(error);
    response.statusCode = 400;
    response.end();
}