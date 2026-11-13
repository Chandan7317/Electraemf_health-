const fs = require('fs');
const path = require('path');

const cleanPages = JSON.parse(fs.readFileSync('all_pages_clean.json', 'utf8'));

// Format as JS module
const jsContent = 'export const allPagesFull = ' + JSON.stringify(cleanPages, null, 2) + ';\nexport default allPagesFull;\n';
fs.writeFileSync(path.join(__dirname, 'src', 'data', 'allPagesFull.js'), jsContent);
console.log('Successfully wrote src/data/allPagesFull.js with', Object.keys(cleanPages).length, 'pages!');

