const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const indexHtml = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const privacyPolicyPath = path.join(__dirname, '..', 'privacy-policy.html');

test('payment modal offers the recommended preset service buttons', () => {
  assert.match(indexHtml, /data-payment-preset="15-min-consult"/);
  assert.match(indexHtml, /15 Min Consult/);
  assert.match(indexHtml, /data-payment-preset="30-min-consult"/);
  assert.match(indexHtml, /30 Min Consult/);
  assert.match(indexHtml, /data-payment-preset="brand-audit"/);
  assert.match(indexHtml, /Brand Audit/);
  assert.match(indexHtml, /data-payment-preset="custom-payment"/);
  assert.match(indexHtml, /Custom Payment/);
});

test('payment modal includes a selected-service summary area for faster checkout guidance', () => {
  assert.match(indexHtml, /id="payPresetSummary"/);
  assert.match(indexHtml, /Selected service/);
});

test('payment modal exposes Apple Pay, Google Pay, and Bitcoin buttons', () => {
  assert.match(indexHtml, /id="applePayBtn"/);
  assert.match(indexHtml, />\s*Apple Pay\s*</);
  assert.match(indexHtml, /id="gpayBtn"/);
  assert.match(indexHtml, />\s*Google Pay\s*</);
  assert.match(indexHtml, /id="bitcoinBtn"/);
  assert.match(indexHtml, />\s*Bitcoin\s*</);
});

test('payment modal explains that clients enter the agreed amount on Stripe checkout', () => {
  assert.match(indexHtml, /Enter the agreed amount on Stripe checkout/i);
  assert.match(indexHtml, /wallet options appear automatically on supported devices/i);
});

test('payment modal includes a premium service summary card and method badges', () => {
  assert.match(indexHtml, /id="payServiceLabel"/);
  assert.match(indexHtml, /id="payServiceAmount"/);
  assert.match(indexHtml, />\s*Fastest\s*</i);
  assert.match(indexHtml, />\s*Tap to pay\s*</i);
  assert.match(indexHtml, />\s*Crypto\s*</i);
});

test('site ships a real privacy policy page for checkout and feedback trust', () => {
  assert.match(indexHtml, /href="https:\/\/kosavant\.com\/privacy-policy\.html"/);
  assert.equal(fs.existsSync(privacyPolicyPath), true);
});
