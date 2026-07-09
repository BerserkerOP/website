const https = require('https');

const url = 'https://www.youtube.com/shorts/_87r8kmzot8';

https.get(url, {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
  }
}, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    // Search for lengthSeconds or duration
    const matchSeconds = data.match(/"lengthSeconds":"(\d+)"/);
    const matchTitle = data.match(/<title>(.*?)<\/title>/);
    console.log('Title:', matchTitle ? matchTitle[1] : 'Not found');
    console.log('Length (seconds):', matchSeconds ? matchSeconds[1] : 'Not found');
  });
}).on('error', (err) => {
  console.error('Error fetching URL:', err.message);
});
