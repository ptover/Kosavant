const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const indexHtml = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

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
