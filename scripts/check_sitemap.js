const https = require('https');
const http = require('http');
const fs = require('fs');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
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
    }).on('error', reject);
  });
}

async function checkSitemaps() {
  const urls = [
    'https://electraemfhealth.com/robots.txt',
    'https://electraemfhealth.com/sitemap.xml',
    'https://electraemfhealth.com/sitemap_index.xml',
    'https://electraemfhealth.com/wp-sitemap.xml',
    'https://electraemfhealth.com/wp-sitemap-posts-page-1.xml',
    'https://electraemfhealth.com/wp-sitemap-posts-post-1.xml'
  ];

  for (const u of urls) {
    try {
      const res = await fetchUrl(u);
      console.log(u, 'Status:', res.status, 'Len:', res.data.length);
      if (res.status === 200 && res.data.length < 50000) {
        fs.writeFileSync(u.replace(/[^a-zA-Z0-9]/g, '_') + '.txt', res.data);
      }
    } catch (e) {
      console.log(u, 'Err:', e.message);
    }
  }
}

checkSitemaps();

