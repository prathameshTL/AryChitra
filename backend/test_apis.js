const http = require('http');

const request = (options, postData) => {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, data }));
    });
    req.on('error', (e) => reject(e));
    if (postData) req.write(postData);
    req.end();
  });
};

async function runTests() {
  console.log("Running Backend API Tests...");

  // 1. Test GET /api/services
  const getServices = await request({ hostname: 'localhost', port: 5000, path: '/api/services', method: 'GET' });
  console.log(`GET /api/services -> Status: ${getServices.statusCode}`);

  // 2. Test POST /api/newsletter/subscribe without email
  const postNews1 = await request({
    hostname: 'localhost', port: 5000, path: '/api/newsletter/subscribe', method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, JSON.stringify({}));
  console.log(`POST /api/newsletter/subscribe (empty) -> Status: ${postNews1.statusCode}, Response: ${postNews1.data}`);

  // 3. Test POST /api/contact without required fields
  const postContact = await request({
    hostname: 'localhost', port: 5000, path: '/api/contact', method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, JSON.stringify({ name: 'Test' }));
  console.log(`POST /api/contact (incomplete) -> Status: ${postContact.statusCode}`);

  // 4. Test protected route GET /api/orders without token
  const getOrders = await request({ hostname: 'localhost', port: 5000, path: '/api/orders', method: 'GET' });
  console.log(`GET /api/orders (no auth) -> Status: ${getOrders.statusCode}, Response: ${getOrders.data}`);
}

runTests();
