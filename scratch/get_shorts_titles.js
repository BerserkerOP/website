const urls = [
  'https://www.youtube.com/shorts/hnRYOCYitbA',
  'https://www.youtube.com/shorts/SxBE1VYPMtE',
  'https://www.youtube.com/shorts/_87r8kmzot8',
  'https://www.youtube.com/shorts/cQegz-mCh3I',
  'https://www.youtube.com/shorts/_0D0_b2x8Hg',
  'https://www.youtube.com/shorts/zs2-Yl4w_Dc'
];

async function main() {
  for (const url of urls) {
    try {
      const res = await fetch(url);
      const html = await res.text();
      const ogTitle = html.match(/meta property="og:title" content="(.*?)"/);
      console.log(url, '->', ogTitle ? ogTitle[1] : 'No title');
    } catch (e) {
      console.error(url, 'failed:', e.message);
    }
  }
}

main();
