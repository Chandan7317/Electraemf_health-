const fs = require('fs');
const path = require('path');

const slugs = [
  'about',
  'services',
  'emf-testing',
  'emf-science',
  'emf-solutions',
  'lawful-experts',
  'health-consultant',
  'pricing',
  'locations',
  'home-inspection',
  'scientific-emf-testing',
  'what-is-emf-certification',
  '01-what-is-the-best-meter-for-emf-testing',
  'understanding-the-ieee-emf-exposure-standards',
  'medcial-effects',
  '20-years-medically-integrated-emf-studies',
  'emi-keeping-new-jersey-family-out-of-pool-and-off-lawn',
  'seller-owner-rehabilitation-emf-stigmatized-properties',
  'for-new-home-buyers-and-sellers'
];

slugs.forEach(slug => {
  const filePath = path.join('pages_raw', `${slug}.html`);
  if (fs.existsSync(filePath)) {
    const raw = fs.readFileSync(filePath, 'utf8');
    const titleMatch = raw.match(/<title[^>]*>([^<]+)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : slug;
    const headings = [];
    const hm = raw.matchAll(/<(h[1-4])[^>]*>([\s\S]*?)<\/\1>/gi);
    for (const h of hm) {
      headings.push(`${h[1]}: ${h[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()}`);
    }
    console.log(`=== ${slug.toUpperCase()} (${title}) ===`);
    console.log('Headings:', headings.slice(0, 8));
  }
});

