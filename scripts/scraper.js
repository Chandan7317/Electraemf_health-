const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

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

async function scrape() {
  console.log('Fetching homepage...');
  const home = await fetchUrl('https://electraemfhealth.com/');
  fs.writeFileSync('homepage.html', home.data);

  // Extract menu links and all unique internal links
  const regex = /href=["'](https?:\/\/electraemfhealth\.com\/[^"'#\s]*|\/[^"'#\s]*)/gi;
  const links = new Set();
  let match;
  while ((match = regex.exec(home.data)) !== null) {
    let link = match[1];
    if (link.startsWith('/')) {
      link = 'https://electraemfhealth.com' + link;
    }
    // normalize trailing slash
    link = link.split('?')[0];
    if (!link.endsWith('/')) link += '/';
    // ignore wp-admin, wp-content/uploads direct pdf/zip unless wanted, feed, etc.
    if (!link.includes('/wp-admin') && !link.includes('/feed/') && !link.includes('/wp-json')) {
      links.add(link);
    }
  }

  console.log(`Found ${links.size} unique internal links:`);
  const linkList = Array.from(links).sort();
  fs.writeFileSync('links.json', JSON.stringify(linkList, null, 2));
  console.log(linkList);
}

scrape().catch(console.error);

