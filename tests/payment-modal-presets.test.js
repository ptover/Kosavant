const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const indexHtml = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const privacyPolicyPath = path.join(__dirname, '..', 'privacy-policy.html');

test('homepage includes a dedicated consulting offers section before payment', () => {
  assert.match(indexHtml, /Choose Your Session/i);
  assert.match(indexHtml, /Quick answer to one key issue/i);
  assert.match(indexHtml, /Live strategy call with action steps/i);
  assert.match(indexHtml, /Detailed review of your offer, positioning, and site/i);
  assert.match(indexHtml, /Custom Invoice \/ Agreed Amount/i);
  assert.match(indexHtml, /data-open-payment-preset="15-min-consult"/);
  assert.match(indexHtml, /data-open-payment-preset="30-min-consult"/);
  assert.match(indexHtml, /data-open-payment-preset="brand-audit"/);
  assert.match(indexHtml, /data-open-payment-preset="custom-payment"/);
});

test('homepage pay entry uses plain secure checkout language', () => {
  assert.match(indexHtml, /id="payBtn"/);
  assert.match(indexHtml, />\s*Secure Checkout\s*</i);
  assert.match(indexHtml, /Stripe, PayPal, and Bitcoin/i);
});

test('payment modal guides visitors through a simple two-step flow', () => {
  assert.match(indexHtml, />\s*Step 1\s*</i);
  assert.match(indexHtml, /Choose your service/i);
  assert.match(indexHtml, />\s*Step 2\s*</i);
  assert.match(indexHtml, /Pick how you want to pay/i);
});

test('payment modal makes card and wallet checkout the primary path', () => {
  assert.match(indexHtml, /id="secureCheckoutBtn"/);
  assert.match(indexHtml, /Pay with Card or Wallet/i);
  assert.match(indexHtml, /Card always available/i);
  assert.match(indexHtml, /Apple Pay and Google Pay appear automatically on supported devices/i);
});

test('payment modal adds after-payment guidance and support trust cues', () => {
  assert.match(indexHtml, /After you pay/i);
  assert.match(indexHtml, /Confirmation is sent right after payment/i);
  assert.match(indexHtml, /30 Min Consult clients receive a booking link/i);
  assert.match(indexHtml, /Brand Audit clients receive intake details and a turnaround note/i);
  assert.match(indexHtml, /Questions before paying\? contact@kosavant\.com/i);
  assert.match(indexHtml, /Privacy Policy/i);
});

test('payment modal keeps PayPal exact-amount support and lowers Bitcoin into other methods', () => {
  assert.match(indexHtml, /id="paypalButtonWrap"/);
  assert.match(indexHtml, /PayPal charges the exact selected amount/i);
  assert.match(indexHtml, /Other payment methods/i);
  assert.match(indexHtml, /id="bitcoinBtn"/);
  assert.match(indexHtml, />\s*Bitcoin\s*</i);
  assert.doesNotMatch(indexHtml, /id="applePayBtn"/);
  assert.doesNotMatch(indexHtml, /id="gpayBtn"/);
});

test('payment summary keeps the selected service and best payment match visible', () => {
  assert.match(indexHtml, /id="payServiceLabel"/);
  assert.match(indexHtml, /id="payServiceAmount"/);
  assert.match(indexHtml, /Best payment match/i);
});

test('site ships a real privacy policy page for checkout and feedback trust', () => {
  assert.match(indexHtml, /href="https:\/\/kosavant\.com\/privacy-policy\.html"/);
  assert.equal(fs.existsSync(privacyPolicyPath), true);
});
