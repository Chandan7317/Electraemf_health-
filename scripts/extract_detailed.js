const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('pages_raw');
const detailedData = {};

files.forEach(file => {
  if (!file.endsWith('.html')) return;
  const slug = file.replace('.html', '');
  const raw = fs.readFileSync(path.join('pages_raw', file), 'utf8');

  // Title
  const titleMatch = raw.match(/<title[^>]*>([^<]+)<\/title>/i);
  const title = titleMatch ? titleMatch[1].replace(/&#[0-9]+;|&[a-z]+;/gi, ' ').trim() : slug;

  // Extract article or entry-content or body
  let body = raw;
  const articleMatch = raw.match(/<article[\s\S]*?<\/article>/i) || raw.match(/<main[\s\S]*?<\/main>/i) || raw.match(/<div[^>]*class=["'][^"']*entry-content[^"']*["'][\s\S]*?<\/div>/i);
  if (articleMatch) {
    body = articleMatch[0];
  }

  // Remove nav, footer, scripts, styles, forms, leave reply
  let text = body
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<header[\s\S]*?<\/header>/gi, '')
    .replace(/<footer[\s\S]*?<\/footer>/gi, '')
    .replace(/<nav[\s\S]*?<\/nav>/gi, '')
    .replace(/<form[\s\S]*?<\/form>/gi, '')
    .replace(/<div[^>]*id=["']comments["'][\s\S]*?<\/div>/gi, '');

  // Extract sections by headers or paragraphs
  const paragraphs = [];
  const pMatches = text.matchAll(/<(p|h[1-6]|li|blockquote)[^>]*>([\s\S]*?)<\/\1>/gi);
  for (const p of pMatches) {
    const cleanP = p[2].replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
    if (cleanP.length > 5 && !cleanP.startsWith('Get In touch') && !cleanP.startsWith('Have Any Questions?') && !cleanP.startsWith('Leave a Reply') && !cleanP.includes('wp-content')) {
      paragraphs.push({ tag: p[1].toLowerCase(), text: cleanP });
    }
  }

  // Extract images with alts
  const images = [];
  const imgMatches = body.matchAll(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi);
  for (const im of imgMatches) {
    const src = im[1];
    const altMatch = im[0].match(/alt=["']([^"']*)["']/i);
    const alt = altMatch ? altMatch[1] : '';
    if (!src.includes('avatar') && !src.includes('pixel') && !src.includes('emoji')) {
      images.push({ src, alt });
    }
  }

  detailedData[slug] = {
    slug,
    title,
    paragraphs,
    images
  };
});

fs.writeFileSync('detailed_site_content.json', JSON.stringify(detailedData, null, 2));
console.log('Detailed site content extracted for', Object.keys(detailedData).length, 'pages.');

