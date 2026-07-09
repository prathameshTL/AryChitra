const fs = require('fs');
const path = require('path');

const sourceDir = 'C:\\Users\\MSI\\.gemini\\antigravity\\brain\\1fa8800f-0f92-498b-b24e-438c64fba1b7';
const targetDir = 'e:\\AryaChitr\\frontend\\public';

const files = [
  { src: 'ui_ux_new_1783424339232.png', dest: 'ui_ux.png' },
  { src: 'marketing_new_1783424349483.png', dest: 'marketing.png' }
];

files.forEach(file => {
  const sourceFile = path.join(sourceDir, file.src);
  const targetFile = path.join(targetDir, file.dest);
  
  if (fs.existsSync(sourceFile)) {
    fs.copyFileSync(sourceFile, targetFile);
    console.log(`Copied ${file.src} to ${file.dest}`);
  } else {
    console.log(`Source file not found: ${sourceFile}`);
  }
});

console.log("Updated UI/UX and Marketing illustrations successfully replaced!");
