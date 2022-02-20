const BadRequestError = require('../errors/BadRequestError')
const NotFoundError = require('../errors/NotFoundError')
const UnauthorizedError = require('../errors/UnauthorizedError')
const ServerError = require('../errors/ServerError')

/**
 * @class Helper
 */
class Helper {
  /**
   *
   * @param {object} error - The error object
   * @returns {Object} - The an error instance
   * @memberof Helper
   */
  static processError (error) {
    switch (error.response.status) {
      case 400:
        throw new BadRequestError({ message: error.response.data.message, status: error.response.data.status })
      case 401:
        throw new UnauthorizedError({ message: error.response.data.message, status: error.response.data.status })
      case 404:
        throw new NotFoundError({ message: error.response.data.message, status: error.response.data.status })
      default:
        throw new ServerError({ message: error.response.data.message, status: error.response.data.status })
    }
  }
}

module.exports = Helper
