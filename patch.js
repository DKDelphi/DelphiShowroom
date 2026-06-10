const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');
const backup = fs.readFileSync('index_backup.html', 'utf8');

const startMarker = '<h1>Healthcare';
const endMarker = '<!-- TAB 2: Data Models -->';

let backupBlock = backup.substring(backup.indexOf(startMarker), backup.indexOf(endMarker));

backupBlock = backupBlock.replace(/<select id="filter-(tech|domain|project)"[\s\S]*?<\/select>\s*/g, '');

const contentStart = content.indexOf('<h1>Healthcare Solutions</h1>');
const contentEnd = content.indexOf(endMarker);

content = content.substring(0, contentStart) + backupBlock + content.substring(contentEnd);

// Wait, the backup block has "Healthcare Capabilities" instead of "Healthcare Solutions"
// Let's replace it back to "Solutions" just to match
content = content.replace('<h1>Healthcare Capabilities</h1>', '<h1>Healthcare Solutions</h1>');
content = content.replace('<p>Drive better patient outcomes, smarter operations, secure compliance, and faster digital\r\n                        transformation across the healthcare ecosystem with AI-powered capabilities.</p>', '<p>AI-powered capabilities that enable better patient outcomes, smarter operations, secure compliance, and faster digital transformation across the healthcare ecosystem.</p>');

fs.writeFileSync('index.html', content, 'utf8');
console.log('Patched successfully!');
