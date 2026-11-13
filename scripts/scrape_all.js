const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const urls = [
  'https://electraemfhealth.com/',
  'https://electraemfhealth.com/about/',
  'https://electraemfhealth.com/about/our-mission/',
  'https://electraemfhealth.com/services/',
  'https://electraemfhealth.com/emf-testing/',
  'https://electraemfhealth.com/emf-science/',
  'https://electraemfhealth.com/emf-solutions/',
  'https://electraemfhealth.com/health-consultant/',
  'https://electraemfhealth.com/lawful-experts/',
  'https://electraemfhealth.com/reviews/',
  'https://electraemfhealth.com/pricing/',
  'https://electraemfhealth.com/locations/',
  'https://electraemfhealth.com/contact/',
  'https://electraemfhealth.com/gallery/',
  'https://electraemfhealth.com/scientific-emf-testing/',
  'https://electraemfhealth.com/home-inspection/',
  'https://electraemfhealth.com/what-is-emf-certification/',
  'https://electraemfhealth.com/01-what-is-the-best-meter-for-emf-testing/',
  'https://electraemfhealth.com/understanding-the-ieee-emf-exposure-standards/',
  'https://electraemfhealth.com/medcial-effects/',
  'https://electraemfhealth.com/emf-medical-expert-radio-interview/',
  'https://electraemfhealth.com/electra-emf-library-2022/',
  'https://electraemfhealth.com/error-in-meta-analysis-of-emf-and-health-effects/',
  'https://electraemfhealth.com/how_does_emf_shielding_work_to_prevent_emf_exposure/',
  'https://electraemfhealth.com/electraemf_emi_emc_shielding_solutions/',
  'https://electraemfhealth.com/how_to_sheild_a_room_from_emf_fields/',
  'https://electraemfhealth.com/for-new-home-buyers-and-sellers/',
  'https://electraemfhealth.com/seller-owner-rehabilitation-emf-stigmatized-properties/',
  'https://electraemfhealth.com/20-years-medically-integrated-emf-studies/',
  'https://electraemfhealth.com/emi-keeping-new-jersey-family-out-of-pool-and-off-lawn/',
  'https://electraemfhealth.com/electraemfs-ibew-state-and-industry-licensed-exposure-expert/',
  'https://electraemfhealth.com/real-emf-science-sc-ve-ii-the-electraemf-protocol/',
  'https://electraemfhealth.com/block-emf-radiation/',
  'https://electraemfhealth.com/10-household-items-that-produce-em-waves/',
  'https://electraemfhealth.com/how-to-use-an-emf-meter/',
  'https://electraemfhealth.com/what-is-emf-in-physics/',
  'https://electraemfhealth.com/what-level-of-emf-is-dangerous/',
  'https://electraemfhealth.com/how-to-protect-yourself-from-emf/',
  'https://electraemfhealth.com/can-emf-cause-headaches/',
  'https://electraemfhealth.com/residential-emf-testing-in-philadelphia/',
  'https://electraemfhealth.com/emf-emi-testing-services-hudson-valley/',
  'https://electraemfhealth.com/emf-testing-specialist-ct-de/',
  'https://electraemfhealth.com/emf-emi-testing-services-jersey-shore/',
  'https://electraemfhealth.com/residential-emf-inspection-cost-emi-testing-services-hamptons/',
  'https://electraemfhealth.com/residential-emf-emi-testing-services-tarrytown/',
  'https://electraemfhealth.com/emf-specialist-inspection-cost-emi-testing-services-princeton/',
  'https://electraemfhealth.com/emf-specialist-emi-testing-services-long-island/',
  'https://electraemfhealth.com/emf-testing-specialist-inspection-cost-poughkeepsie/'
];

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }, timeout: 15000 }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let redirectUrl = res.headers.location;
        if (!redirectUrl.startsWith('http')) {
          const origin = new URL(url).origin;
          redirectUrl = new URL(redirectUrl, origin).href;
        }
        return fetchUrl(redirectUrl).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data, url }));
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('Timeout')); });
  });
}

function cleanHtml(html) {
  // Extract title
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  const title = titleMatch ? titleMatch[1].replace(/&#[0-9]+;|&[a-z]+;/gi, ' ').trim() : '';

  // Extract meta description
  const metaDescMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
  const metaDescription = metaDescMatch ? metaDescMatch[1].trim() : '';

  // Extract all img tags
  const images = [];
  const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  let im;
  while ((im = imgRegex.exec(html)) !== null) {
    const tag = im[0];
    const src = im[1];
    const altMatch = tag.match(/alt=["']([^"']*)["']/i);
    const alt = altMatch ? altMatch[1] : '';
    if (!src.includes('avatar') && !src.includes('pixel') && !src.includes('emoji')) {
      images.push({ src, alt });
    }
  }

  // Extract headings
  const headings = [];
  const hRegex = /<(h[1-4])[^>]*>([\s\S]*?)<\/\1>/gi;
  let hm;
  while ((hm = hRegex.exec(html)) !== null) {
    const level = hm[1];
    const text = hm[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    if (text) headings.push({ level, text });
  }

  // Extract main text content from entry-content or main
  let mainContent = '';
  const mainMatch = html.match(/<main[\s\S]*?<\/main>/i) || html.match(/<div[^>]*class=["'][^"']*entry-content[^"']*["'][\s\S]*?<\/div>/i);
  if (mainMatch) {
    mainContent = mainMatch[0];
  } else {
    mainContent = html;
  }

  // Strip script, style, nav, footer
  let cleanText = mainContent
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<header[\s\S]*?<\/header>/gi, '')
    .replace(/<footer[\s\S]*?<\/footer>/gi, '')
    .replace(/<[^>]+>/g, '\n')
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .join('\n');

  return { title, metaDescription, headings, images, cleanText };
}

async function scrapeAll() {
  if (!fs.existsSync('pages_raw')) fs.mkdirSync('pages_raw');
  const results = {};

  for (let i = 0; i < urls.length; i++) {
    const u = urls[i];
    const slug = u.replace('https://electraemfhealth.com/', '').replace(/\/$/, '') || 'home';
    console.log(`[${i+1}/${urls.length}] Scraping ${slug}...`);
    try {
      const res = await fetchUrl(u);
      if (res.status === 200) {
        fs.writeFileSync(path.join('pages_raw', `${slug.replace(/[^a-zA-Z0-9_-]/g, '_')}.html`), res.data);
        const parsed = cleanHtml(res.data);
        results[slug] = {
          url: u,
          slug,
          ...parsed
        };
      } else {
        console.warn(`Status ${res.status} for ${u}`);
      }
    } catch (err) {
      console.error(`Error scraping ${u}: ${err.message}`);
    }
  }

  fs.writeFileSync('site_data.json', JSON.stringify(results, null, 2));
  console.log('Saved site_data.json successfully with', Object.keys(results).length, 'pages!');
}

scrapeAll();

