/* eslint-disable no-undef */
/* eslint-disable linebreak-style */
import puppetteer from 'puppeteer';
import { fork } from 'child_process';

// eslint-disable-next-line no-undef
jest.setTimeout(30000); // default puppeteer timeout

// eslint-disable-next-line no-undef
describe('form cheked', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:9000';

  // eslint-disable-next-line no-undef
  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppetteer.launch({
      // headless: false, // show gui
      // slowMo: 250,
      // devtools: true, // show devTools
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  test('checking valid code', async () => {
    await page.goto(baseUrl);
    const form = await page.$('form');
    const button = await form.$('button');
    await button.click();
    const result = await page.evaluate(() => document.querySelector('.popoverTitle').textContent);
    await expect(result).toBe('Popover title');
  });
});
