const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('pages_raw');
const fullPages = {};

files.forEach(file => {
  if (!file.endsWith('.html')) return;
  const slug = file.replace('.html', '');
  const html = fs.readFileSync(path.join('pages_raw', file), 'utf8');

  // Title
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  let title = titleMatch ? titleMatch[1].replace(/&#[0-9]+;|&[a-z]+;/gi, ' ').trim() : slug;
  title = title.replace(/\s*–\s*electraEMF.*$/i, '').trim();

  // Find #main
  const mainIdx = html.indexOf("<div id='main'");
  let mainContent = html;
  if (mainIdx !== -1) {
    const footerIdx = html.indexOf("<footer", mainIdx);
    if (footerIdx !== -1) {
      mainContent = html.slice(mainIdx, footerIdx);
    } else {
      mainContent = html.slice(mainIdx);
    }
  }

  // Remove script, style, comments, form, header_meta
  let cleaned = mainContent
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<!--[\s\S]*?-->/gi, '')
    .replace(/<form[\s\S]*?<\/form>/gi, '')
    .replace(/<div[^>]*id=["']comments["'][\s\S]*?<\/div>/gi, '');

  // Extract all images in mainContent
  const images = [];
  const imgMatches = cleaned.matchAll(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi);
  for (const im of imgMatches) {
    const src = im[1];
    const altMatch = im[0].match(/alt=["']([^"']*)["']/i);
    const alt = altMatch ? altMatch[1] : '';
    if (!src.includes('avatar') && !src.includes('pixel') && !src.includes('emoji')) {
      images.push({ src, alt });
    }
  }

  // Extract structured elements (h1-h6, p, ul, ol, li, blockquote)
  const sections = [];
  // Parse lines or elements
  const elMatches = cleaned.matchAll(/<(h[1-6]|p|li|blockquote|strong|em)[^>]*>([\s\S]*?)<\/\1>/gi);
  for (const em of elMatches) {
    const tag = em[1].toLowerCase();
    const text = em[2].replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&#8217;/g, "'").replace(/&#8220;|&#8221;/g, '"').replace(/&#8211;|&#8212;/g, '-').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
    if (text.length > 3 && !text.startsWith('Get In touch') && !text.startsWith('Have Any Questions?') && !text.startsWith('Leave a Reply') && !text.startsWith('Company Name') && !text.startsWith('Full Name') && !text.startsWith('E-Mail') && !text.startsWith('Phone') && !text.startsWith('Message *') && !text.includes('wp-content')) {
      sections.push({ tag, text });
    }
  }

  // Also get the full text cleaned
  const fullText = cleaned.replace(/<[^>]+>/g, '\n').split('\n').map(l => l.trim()).filter(l => l.length > 0 && !l.startsWith('Get In touch') && !l.startsWith('Have Any Questions?') && !l.startsWith('Leave a Reply') && !l.startsWith('Company Name *') && !l.startsWith('Full Name *') && !l.startsWith('Phone *') && !l.startsWith('E-Mail *') && !l.startsWith('Message *')).join('\n');

  fullPages[slug] = {
    slug,
    title,
    sections,
    images,
    fullTextSnippet: fullText.slice(0, 3000)
  };
});

fs.writeFileSync('all_pages_clean.json', JSON.stringify(fullPages, null, 2));
console.log('Saved all_pages_clean.json with', Object.keys(fullPages).length, 'pages!');

