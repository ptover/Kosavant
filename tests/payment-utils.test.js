const test = require('node:test');
const assert = require('node:assert/strict');

const {
  parseAmountToCents,
  formatUsd,
  buildStripeCheckoutUrl,
} = require('../payment-utils');

test('parseAmountToCents converts decimal dollars to cents', () => {
  assert.equal(parseAmountToCents('12.34'), 1234);
});

test('parseAmountToCents rounds to nearest cent', () => {
  assert.equal(parseAmountToCents('12.345'), 1235);
});

test('parseAmountToCents returns default for blank or invalid input', () => {
  assert.equal(parseAmountToCents('', { defaultCents: 0 }), 0);
  assert.equal(parseAmountToCents('abc', { defaultCents: 0 }), 0);
});

test('parseAmountToCents enforces minimum and maximum bounds', () => {
  assert.equal(parseAmountToCents('0.25', { defaultCents: 0 }), 0);
  assert.equal(parseAmountToCents('1000000', { maxCents: 999999, defaultCents: 0 }), 0);
});

test('formatUsd renders cents as a USD currency string', () => {
  assert.equal(formatUsd(2599), '$25.99');
});

test('buildStripeCheckoutUrl adds a prefilled amount when cents are valid', () => {
  assert.equal(
    buildStripeCheckoutUrl('https://buy.stripe.com/test_link', 2599),
    'https://buy.stripe.com/test_link?prefilled_amount=2599'
  );
});

test('buildStripeCheckoutUrl leaves the link unchanged when no valid amount exists', () => {
  assert.equal(
    buildStripeCheckoutUrl('https://buy.stripe.com/test_link?foo=bar', 0),
    'https://buy.stripe.com/test_link?foo=bar'
  );
});
