const fs = require('fs');

const html = fs.readFileSync('homepage.html', 'utf8');

// Find phone numbers
const phoneMatches = html.match(/(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g) || [];
console.log('Phone numbers found:', [...new Set(phoneMatches)]);

// Find email addresses
const emailMatches = html.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];
console.log('Emails found:', [...new Set(emailMatches)]);

// Find top bar text / announcements
const topbarMatch = html.match(/<div[^>]*id=["']header_meta["'][\s\S]*?<\/div>/i);
if (topbarMatch) {
  console.log('Header meta (topbar):', topbarMatch[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
}

// Find footer text
const footerMatch = html.match(/<footer[\s\S]*?<\/footer>/i) || html.match(/<div[^>]*id=["']footer["'][\s\S]*?<\/div>/i);
if (footerMatch) {
  console.log('Footer snippet:', footerMatch[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').slice(0, 1000));
}

// Check CSS colors in inline styles or style tags
const hexColors = html.match(/#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})\b/g) || [];
const colorCounts = {};
hexColors.forEach(c => {
  const norm = c.toLowerCase();
  colorCounts[norm] = (colorCounts[norm] || 0) + 1;
});
const sortedColors = Object.entries(colorCounts).sort((a,b) => b[1] - a[1]);
console.log('Dominant colors:', sortedColors.slice(0, 20));

