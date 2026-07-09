const fs = require('fs');
const path = require('path');

const sourceFile = 'C:\\Users\\MSI\\.gemini\\antigravity\\brain\\1fa8800f-0f92-498b-b24e-438c64fba1b7\\marketing_platforms_1783424836119.png';
const targetFile = 'e:\\AryaChitr\\frontend\\public\\marketing.png';

if (fs.existsSync(sourceFile)) {
  fs.copyFileSync(sourceFile, targetFile);
  console.log("Successfully updated the marketing illustration!");
} else {
  console.log("Source file not found!");
}
