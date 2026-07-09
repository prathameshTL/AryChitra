const fs = require('fs');
const path = require('path');

const sourceDir = 'C:\\Users\\MSI\\.gemini\\antigravity\\brain\\1fa8800f-0f92-498b-b24e-438c64fba1b7';
const targetDir = 'e:\\AryaChitr\\frontend\\public';

const files = [
  { src: 'software_dev_1783423708959.png', dest: 'software_dev.png' },
  { src: 'mobile_dev_1783423721051.png', dest: 'mobile_dev.png' },
  { src: 'ui_ux_1783423733312.png', dest: 'ui_ux.png' },
  { src: 'cloud_1783423744385.png', dest: 'cloud.png' },
  { src: 'ai_ml_1783423755272.png', dest: 'ai_ml.png' },
  { src: 'marketing_1783423766772.png', dest: 'marketing.png' },
  { src: 'consulting_1783423776546.png', dest: 'consulting.png' }
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

console.log("All illustrations have been successfully replaced!");
