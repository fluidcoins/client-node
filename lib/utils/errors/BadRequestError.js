const BaseError = require('./BaseError')
/**
 * A custom error class for handling module related errors.
 * @class BadRequestError
 */
module.exports = class BadRequestError extends BaseError {
  /**
   * The BadRequestError Constructor.
   * @param {Object} options - A configuration object for errors.
   * @param {String} options.message - The error message if any.
   * @constructor BadRequestError
   */
  constructor (options = {}) {
    super(options)
    this.name = this.constructor.name
    this.message = options.message
    this.status = options.status
  }
}
