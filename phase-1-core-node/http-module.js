const http = require('http');
const url = require('url');

let users = [];

const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url, true);
  const { pathname, query } = parsed;

  res.setHeader('Content-Type', 'application/json');

  // ✅ GET all users
  if (req.method === 'GET' && pathname === '/users') {
    return res.end(JSON.stringify(users));
  }

  // ✅ GET single user
  if (req.method === 'GET' && pathname === '/user') {
    const user = users.find(u => u.id == query.id);
    return res.end(JSON.stringify(user || { message: 'User not found' }));
  }

  // ✅ CREATE user
  if (req.method === 'POST' && pathname === '/users') {
    let body = '';

    req.on('data', chunk => body += chunk);

    req.on('end', () => {
      const data = JSON.parse(body);

      const newUser = {
        id: users.length + 1,
        ...data
      };

      users.push(newUser);

      res.statusCode = 201;
      res.end(JSON.stringify(newUser));
    });

    return;
  }

  // ✅ UPDATE user
  if (req.method === 'PUT' && pathname === '/user') {
    let body = '';

    req.on('data', chunk => body += chunk);

    req.on('end', () => {
      const data = JSON.parse(body);

      const index = users.findIndex(u => u.id == query.id);

      if (index === -1) {
        res.statusCode = 404;
        return res.end(JSON.stringify({ message: 'User not found' }));
      }

      users[index] = { ...users[index], ...data };

      res.end(JSON.stringify(users[index]));
    });

    return;
  }

  // ✅ DELETE user
  if (req.method === 'DELETE' && pathname === '/user') {
    const index = users.findIndex(u => u.id == query.id);

    if (index === -1) {
      res.statusCode = 404;
      return res.end(JSON.stringify({ message: 'User not found' }));
    }

    const deleted = users.splice(index, 1);

    res.end(JSON.stringify(deleted[0]));
    return;
  }

  // ❌ Not found
  res.statusCode = 404;
  res.end(JSON.stringify({ message: 'Route not found' }));
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});