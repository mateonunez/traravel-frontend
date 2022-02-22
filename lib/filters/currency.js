/**
 * Convert a string into mnemonic currency
 *
 * @param {String}
 * @return {String}
 */
const currencyForHumans = amount =>
  new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR'
  }).format(amount / 100)

export { currencyForHumans }
