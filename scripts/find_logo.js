const fs = require('fs');
const html = fs.readFileSync('homepage.html', 'utf8');

const matches = [];
const regex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
let m;
while ((m = regex.exec(html)) !== null) {
  if (m[0].toLowerCase().includes('logo') || m[1].toLowerCase().includes('logo')) {
    matches.push(m[0]);
  }
}

console.log('Logo matches count:', matches.length);
matches.forEach(m => console.log(m));

// Also check .logo in class
const logoDivs = html.match(/<[^>]+class=["'][^"']*logo[^"']*["'][^>]*>[\s\S]{0,500}/gi);
console.log('Logo container divs:');
if (logoDivs) {
  logoDivs.forEach(d => console.log(d.slice(0, 300)));
}

