const http = require('http');
const data = JSON.stringify({ prompt: 'hello from test' });

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/ask',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data),
  },
};

const req = http.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => (body += chunk));
  res.on('end', () => {
    console.log('STATUS', res.statusCode);
    console.log('BODY', body);
  });
});

req.on('error', (e) => console.error('REQERR', e));
req.write(data);
req.end();
