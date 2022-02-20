const BaseError = require('./BaseError')
/**
 * A custom error class for handling module related errors.
 * @class NotFoundError
 */
module.exports = class NotFoundError extends BaseError {
  /**
   * The NotFoundError Constructor.
   * @param {Object} options - A configuration object for errors.
   * @param {String} options.message - The error message if any.
   * @constructor NotFoundError
   */
  constructor (options = {}) {
    super(options)
    this.name = this.constructor.name
    this.message = options.message
    this.status = options.status
  }
}
