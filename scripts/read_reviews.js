const fs = require('fs');
const reviewsHtml = fs.readFileSync('pages_raw/reviews.html', 'utf8');

console.log('Reviews content snippet:');
console.log(reviewsHtml.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '').replace(/<[^>]+>/g, '\n').split('\n').map(l => l.trim()).filter(l => l.length > 0).join('\n'));

