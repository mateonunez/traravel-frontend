import moment from 'moment'

/**
 * Convert a date into mnemonic date string
 *
 * @param {Object|String} date
 * @returns {String}
 */
const dateForHumans = date => moment(date).locale('it').format('DD MMMM YYYY')

export { dateForHumans }
