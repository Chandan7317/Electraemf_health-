const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'public', 'assets');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const imagesToDownload = [
  'https://electraemfhealth.com/wp-content/uploads/2022/01/5G-antenna-now.gif',
  'https://electraemfhealth.com/wp-content/uploads/2022/03/ls-slider-1-slide-4.jpg',
  'https://electraemfhealth.com/wp-content/uploads/2022/03/ls-slider-1-slide-8.jpg',
  'https://electraemfhealth.com/wp-content/uploads/2022/12/Intro-slide-3.jpg',
  'https://electraemfhealth.com/wp-content/uploads/2022/12/Intro-slide-4.jpg',
  'https://electraemfhealth.com/wp-content/uploads/2022/09/IBEW-Engineer-for-EMF-Testing-in-NYC.jpg',
  'https://electraemfhealth.com/wp-content/uploads/2022/09/Electro-Magentic-Interferece-EMI-2003-1.jpg',
  'https://electraemfhealth.com/wp-content/uploads/2022/06/Power-systems.jpg',
  'https://electraemfhealth.com/wp-content/uploads/2022/10/IBEW-POWER.CASE-2024.jpg',
  'https://electraemfhealth.com/wp-content/uploads/2022/09/EMF-testing-electronics-in-New-Jersey-New-York-schools-1.jpg',
  'https://electraemfhealth.com/wp-content/uploads/2022/09/EMF-safe-home-testing.jpg',
  'https://electraemfhealth.com/wp-content/uploads/2022/10/NYC-Office-EMF-testing-for-helath-and-safety-2023.jpg',
  'https://electraemfhealth.com/wp-content/uploads/2022/01/Long-Island-EMF-Testing.jpg',
  'https://electraemfhealth.com/wp-content/uploads/2022/01/Hudsone-Valley-Westchester-EMF-Testing-Expert.jpg',
  'https://electraemfhealth.com/wp-content/uploads/2022/03/Jersey-City-Hoboken-Weehawken-EMF-Sensetivity-testing-2022.jpg',
  'https://electraemfhealth.com/wp-content/uploads/2022/03/Licensed-EMF-testing-in-Philadelphia-2022-1.jpg',
  'https://electraemfhealth.com/wp-content/uploads/2022/01/EMF-Testing-Hartford-Connecticut.jpg',
  'https://electraemfhealth.com/wp-content/uploads/2021/10/work_exposure_to_EMF-1.jpg',
  'https://electraemfhealth.com/wp-content/uploads/2021/11/nyc_cellphone_radiation.jpg',
  'https://electraemfhealth.com/wp-content/uploads/2021/11/school_emf.jpg',
  'https://electraemfhealth.com/wp-content/uploads/2021/12/5G-antenna-1030x896.jpg',
  'https://electraemfhealth.com/wp-content/uploads/2021/12/power_substation.jpg',
  'https://electraemfhealth.com/wp-content/uploads/2021/12/rooftop_garden_radiation-1030x550.jpg',
  'https://electraemfhealth.com/wp-content/uploads/2021/12/children_playing_near_high_voltage_lines.png',
  'https://electraemfhealth.com/wp-content/uploads/2021/12/flee-cage.jpg',
  'https://electraemfhealth.com/wp-content/uploads/2021/12/DSCF7705-1030x773.jpg',
  'https://electraemfhealth.com/wp-content/uploads/2021/12/DSCF7752-1030x773.jpg',
  'https://electraemfhealth.com/wp-content/uploads/2021/12/DSCF5449-773x1030.jpg',
  'https://electraemfhealth.com/wp-content/uploads/2021/12/DSCF5882-1-1030x773.jpg',
  'https://electraemfhealth.com/wp-content/uploads/2021/12/DSCF7386-1030x773.jpg',
  'https://electraemfhealth.com/wp-content/uploads/2021/12/DSCF7681-1-1030x773.jpg',
  'https://electraemfhealth.com/wp-content/uploads/2021/12/350px-Three_Phase_Electric_Power_Transmission-Copy.jpg',
  'https://electraemfhealth.com/wp-content/uploads/2021/12/350px-Threephasepolemountclose.jpg',
  'https://electraemfhealth.com/wp-content/uploads/2021/12/hv_warning.jpg',
  'https://electraemfhealth.com/wp-content/uploads/2021/12/westchester_emf_substation.jpg',
  'https://electraemfhealth.com/wp-content/uploads/2022/03/RF-RADIATION.jpg'
];

function download(url) {
  return new Promise((resolve) => {
    const filename = path.basename(new URL(url).pathname);
    const dest = path.join(targetDir, filename);
    if (fs.existsSync(dest)) {
      console.log(`Already exists: ${filename}`);
      return resolve();
    }
    const file = fs.createWriteStream(dest);
    const client = url.startsWith('https') ? https : http;
    client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 15000 }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        file.close();
        return download(res.headers.location).then(resolve);
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${filename}`);
        resolve();
      });
    }).on('error', (err) => {
      file.close();
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      console.error(`Failed ${filename}: ${err.message}`);
      resolve();
    });
  });
}

async function run() {
  for (const u of imagesToDownload) {
    await download(u);
  }
  console.log('All downloads completed!');
}

run();

