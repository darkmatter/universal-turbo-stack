import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const OUT_DIR = path.resolve(process.cwd(), '../packages/tamagui/assets/screenshots');

async function ensureOutDir() {
  await fs.mkdir(OUT_DIR, { recursive: true });
}

async function screenshotPage(page, name, opts = {}) {
  const file = path.join(OUT_DIR, name);
  await page.screenshot({ path: file, ...opts });
  console.log('saved', file);
}

async function main() {
  await ensureOutDir();
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ deviceScaleFactor: 2, viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();

  // Navigate to the Tamagui demo page in Next.js
  const url = new URL('/tamagui-test', BASE_URL).toString();
  console.log('Visiting', url);
  await page.goto(url, { waitUntil: 'networkidle' });

  // Wait for key content
  await page.waitForTimeout(500);
  await page.waitForLoadState('networkidle');

  // Full page screenshot
  await screenshotPage(page, 'tamagui-test-full.png', { fullPage: true });

  // Try to capture a group of buttons
  const buttons = page.getByRole('button');
  const buttonCount = await buttons.count();
  const capture = Math.min(buttonCount, 6);
  for (let i = 0; i < capture; i++) {
    const btn = buttons.nth(i);
    await btn.screenshot({ path: path.join(OUT_DIR, `button-${i + 1}.png`) });
    console.log('saved', path.join(OUT_DIR, `button-${i + 1}.png`));
  }

  // Capture first few textboxes (inputs)
  const inputs = page.getByRole('textbox');
  const inputCount = await inputs.count();
  const inputCapture = Math.min(inputCount, 3);
  for (let i = 0; i < inputCapture; i++) {
    const box = inputs.nth(i);
    await box.screenshot({ path: path.join(OUT_DIR, `input-${i + 1}.png`) });
    console.log('saved', path.join(OUT_DIR, `input-${i + 1}.png`));
  }

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
