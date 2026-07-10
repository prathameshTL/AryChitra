const http = require('http');

const testContact = () => {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      name: 'Test Contact',
      email: 'test@example.com',
      phone: '1234567890',
      subject: 'Automated Test',
      message: 'This is a test message to ensure the contact form is working.'
    });

    const options = {
      hostname: 'localhost',
      port: 5000,
      path: '/api/contact',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    };

    const req = http.request(options, res => {
      let responseData = '';
      res.on('data', chunk => responseData += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data: responseData }));
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
};

const testOrder = () => {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      name: 'Test Order',
      email: 'order@example.com',
      phone: '0987654321',
      websiteType: 'web',
      budget: '50k-1L',
      details: 'This is a test project order.'
    });

    const options = {
      hostname: 'localhost',
      port: 5000,
      path: '/api/orders',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    };

    const req = http.request(options, res => {
      let responseData = '';
      res.on('data', chunk => responseData += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data: responseData }));
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
};

async function runTests() {
  console.log('Testing Contact API...');
  try {
    const contactRes = await testContact();
    console.log('Contact API Response:', contactRes.status, contactRes.data);
  } catch(e) {
    console.error('Contact API Failed:', e.message);
  }

  console.log('\nTesting Order API...');
  try {
    const orderRes = await testOrder();
    console.log('Order API Response:', orderRes.status, orderRes.data);
  } catch(e) {
    console.error('Order API Failed:', e.message);
  }
}

runTests();
