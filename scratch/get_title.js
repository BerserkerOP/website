async function main() {
  try {
    const res = await fetch('https://www.youtube.com/watch?v=EzRyQUU5jTQ');
    const html = await res.text();
    const match = html.match(/<title>(.*?)<\/title>/);
    console.log('Title tag:', match ? match[1] : 'No title tag');
    const ogTitle = html.match(/meta property="og:title" content="(.*?)"/);
    console.log('og:title:', ogTitle ? ogTitle[1] : 'No og:title');
  } catch (e) {
    console.error(e);
  }
}

main();
