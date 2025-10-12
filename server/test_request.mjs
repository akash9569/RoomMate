const data = { prompt: 'hello from test (mjs)' };

const res = await fetch('http://localhost:5000/api/ask', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
});

const body = await res.text();
console.log('STATUS', res.status);
console.log('BODY', body);
