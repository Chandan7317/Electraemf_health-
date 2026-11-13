const fs = require('fs');
const path = require('path');

const detailed = JSON.parse(fs.readFileSync('detailed_site_content.json', 'utf8'));

// Let's inspect some of the key pages to see their paragraphs and content
const sampleSlugs = ['about', 'services', 'emf-testing', 'emf-science', 'emf-solutions', 'lawful-experts', 'health-consultant', 'pricing', 'locations', 'contact'];

sampleSlugs.forEach(s => {
  console.log(`\n================== ${s.toUpperCase()} ==================`);
  if (detailed[s]) {
    console.log('Title:', detailed[s].title);
    console.log('Paragraphs count:', detailed[s].paragraphs.length);
    detailed[s].paragraphs.slice(0, 10).forEach((p, idx) => {
      console.log(`[${p.tag}] ${p.text.slice(0, 120)}...`);
    });
  }
});

