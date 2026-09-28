import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
  
  const content = await page.content();
  if (content.includes('Devlagi') || content.includes('Home') || content.includes('div')) {
     console.log('PAGE RENDERED SUCCESSFULLY');
  } else {
     console.log('PAGE IS EMPTY');
  }
  await browser.close();
})();
