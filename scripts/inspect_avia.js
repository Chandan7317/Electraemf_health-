const fs = require('fs');

function inspectAvia(slug) {
  const html = fs.readFileSync(`pages_raw/${slug}.html`, 'utf8');
  console.log(`\n================= RAW CHECK: ${slug} =================`);
  // Look for text blocks
  const textblocks = html.matchAll(/<div[^>]*class=["'][^"']*(?:avia_textblock|av_textblock_section|avia_codeblock)[^"']*["'][^>]*>([\s\S]*?)<\/div>/gi);
  let count = 0;
  for (const tb of textblocks) {
    count++;
    const clean = tb[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    if (clean.length > 20) {
      console.log(`[Block ${count}] ${clean.slice(0, 150)}...`);
    }
  }
  if (count === 0) {
    // If no avia_textblock, check main content
    const main = html.match(/<div id='main'[\s\S]*?<\/div><!-- close content_wrap/i) || [html];
    const clean = main[0].replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '').replace(/<[^>]+>/g, '\n').split('\n').map(l => l.trim()).filter(l => l.length > 15);
    console.log(`Lines found (${clean.length}):`, clean.slice(0, 15));
  }
}

['services', 'emf-testing', 'health-consultant', 'locations', 'home-inspection', 'what-is-emf-certification', '01-what-is-the-best-meter-for-emf-testing'].forEach(inspectAvia);

