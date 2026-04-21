(function attachPaymentUtils(globalObject, factory) {
  const api = factory();

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }

  if (globalObject) {
    globalObject.KOSPaymentUtils = api;
  }
})(typeof window !== 'undefined' ? window : globalThis, function createPaymentUtils() {
  const DEFAULT_MIN_CENTS = 100;
  const DEFAULT_MAX_CENTS = 99999999;

  function parseAmountToCents(value, options = {}) {
    const {
      minCents = DEFAULT_MIN_CENTS,
      maxCents = DEFAULT_MAX_CENTS,
      defaultCents = 0,
    } = options;

    if (value === null || value === undefined || value === '') {
      return defaultCents;
    }

    const numericValue = typeof value === 'number'
      ? value
      : Number.parseFloat(String(value).trim());

    if (!Number.isFinite(numericValue) || numericValue <= 0) {
      return defaultCents;
    }

    const cents = Math.round(numericValue * 100);

    if (!Number.isInteger(cents) || cents < minCents || cents > maxCents) {
      return defaultCents;
    }

    return cents;
  }

  function formatUsd(cents) {
    const normalizedCents = Number.isFinite(cents) ? cents : 0;

    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(normalizedCents / 100);
  }

  function buildStripeCheckoutUrl(baseUrl, cents) {
    if (!baseUrl) {
      return '';
    }

    const normalizedCents = Number.isInteger(cents) && cents > 0 ? cents : 0;

    if (!normalizedCents) {
      return baseUrl;
    }

    const url = new URL(baseUrl);
    url.searchParams.set('prefilled_amount', String(normalizedCents));
    return url.toString();
  }

  return {
    parseAmountToCents,
    formatUsd,
    buildStripeCheckoutUrl,
  };
});
