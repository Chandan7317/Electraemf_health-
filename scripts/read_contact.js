const fs = require('fs');
const contactHtml = fs.readFileSync('pages_raw/contact.html', 'utf8');

console.log('Contact title & snippet:');
console.log(contactHtml.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '').replace(/<[^>]+>/g, '\n').split('\n').map(l => l.trim()).filter(l => l.length > 0).slice(0, 100).join('\n'));

