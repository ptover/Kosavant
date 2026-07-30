const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const indexHtml = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const styleCss = fs.readFileSync(path.join(__dirname, '..', 'style.css'), 'utf8');
const privacyPolicyPath = path.join(__dirname, '..', 'privacy-policy.html');

test('book a consultation is a direct active link with a visible booking section', () => {
  const bookButtonMatch = indexHtml.match(/<a[^>]*id="bookBtn"[^>]*>/i);

  assert.ok(bookButtonMatch, 'Book a Consultation link should exist');
  assert.match(bookButtonMatch[0], /href="#consultation-booking"/i);
  assert.doesNotMatch(bookButtonMatch[0], /onclick=/i);
  assert.doesNotMatch(indexHtml, /bookBtn\.addEventListener\('click',\s*\(\)\s*=>\s*openModal\(modal\)\)/);
  assert.match(indexHtml, /id="consultation-booking"/);
  assert.match(indexHtml, /Book Your Consultation/i);
  assert.match(indexHtml, /id="bookingFormInline"/);
});

test('site accent theme is red again', () => {
  assert.match(styleCss, /--color-accent:\s*#ef4444/i);
  assert.match(styleCss, /--color-accent-hover:\s*#f87171/i);
  assert.match(styleCss, /--color-accent-dim:\s*rgba\(239, 68, 68, 0\.12\)/i);
});

test('cinematic opening is grounded in PlayTimezOver clothing', () => {
  assert.match(indexHtml, /SAVANT <small>× PlayTimezOver<\/small>/);
  assert.match(indexHtml, /02 \/ Fabric/);
  assert.match(indexHtml, /03 \/ Construction/);
  assert.match(indexHtml, /04 \/ Campaign/);
  assert.match(indexHtml, /05 \/ Uniform/);
  assert.match(indexHtml, /PlayTimezOver is the proof/i);
});

test('PlayTimezOver landing section uses one-word branding and real products', () => {
  assert.match(indexHtml, /aria-label="PlayTimezOver"><span>PlayTimez<\/span><span class="pto-heading--accent">Over<\/span>/);
  assert.doesNotMatch(indexHtml, /PlayTimez<br/i);
  assert.match(indexHtml, /assets\/playtimezover\/p-logo-tee\.jpg/);
  assert.match(indexHtml, /assets\/playtimezover\/p-logo-cap\.jpg/);
  assert.match(indexHtml, /assets\/playtimezover\/p-durag\.jpg/);
  assert.match(indexHtml, /Shop New Drop/i);
  assert.match(indexHtml, /pages\/early-access/);
});

test('cinematic chapter tabs are clickable and keyboard accessible', () => {
  const chapterTabs = indexHtml.match(/data-cinematic-tab="\d"/g) || [];

  assert.equal(chapterTabs.length, 5);
  assert.match(indexHtml, /aria-label="Explore the PlayTimezOver brand film"/);
  assert.match(indexHtml, /tab\.addEventListener\('click', \(\) => goToChapter\(index\)\)/);
  assert.match(indexHtml, /ArrowLeft/);
  assert.match(indexHtml, /ArrowRight/);
  assert.match(indexHtml, /tab\.setAttribute\('aria-current', 'step'\)/);
  assert.match(styleCss, /\.cinematic-tab:focus-visible/);
  assert.match(styleCss, /\.cinematic-tab\.is-active[\s\S]*background:\s*#e9362e/);
  assert.match(styleCss, /\.cinematic-copy[\s\S]*backdrop-filter:\s*blur\(22px\)/);
});

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
