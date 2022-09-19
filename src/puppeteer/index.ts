import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import AdblockerPlugin from 'puppeteer-extra-plugin-adblocker';
import { Page } from 'puppeteer';

puppeteer.use(StealthPlugin());
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));

export default async (): Promise<Page> => {
    const browser = await puppeteer.launch({
        headless: false,
        executablePath:
            '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    });
    const page = await browser.newPage();
    await page.goto('https://portal.xpi.com.br', { timeout: 0 });
    return page;
};
