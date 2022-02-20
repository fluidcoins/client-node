const axios = require('axios').default

/**
 * @class FluidCoins
 */
class FluidCoins {
  /**
   *This is a constructor for creating a Fluidcoins Instance
   * @param {string} secretkey - Thepeer secret key
   * @returns { FluidCoins } - An instance of thePeer
   */
  constructor (secretkey) {
    this.secretKey = secretkey
    this.request = axios.create({
      baseURL: 'https://api.fluidcoins.com',
      headers: {
        'Authorization ': `Bearer ${secretkey}`,
        'Content-Type': 'application/json'
      }
    })
  }

  /**
   * Fetchs addresses for a specific coin
   * @param {number} page Page to query data from. Defaults to 1
   * @param {number} per_page Number to items to return. Defaults to 20 items
   * @param {string} coin_id id of the coin to query data from.
   * @returns {Promise<any | undefined>} The response
   */
  async getAddresses (page = 1, per_page = 20, coin_id) {
    try {
      const response = await this.request.get(`/v1/address?page=${page}&per_page=${per_page}&coin_id=${coin_id}`)
      return response.data
    } catch (err) {
      console.log(err)
    }
  }

  /**
   * Create a new address
   * @param {string} code Code for the coin you want to generate an address for. e.g (XLM, USDC)
   * @param {string} network erc20,trc20,bep20 and others
   * @returns {Promise<any | undefined>} The address created or error
   */
  async createNewAddress (code, network) {
    try {
      const response = await this.request.post('/v1/address', {
        code: code,
        network: network
      })
      return response.data
    } catch (err) {
      console.log(err)
    }
  }

  /**
   * Fetches an address by its id
   * @param {string} id address unique identifier
   * @returns {Promise<any | undefined>} The address or error
   */
  async getSingleAddress (id) {
    try {
      const response = await this.request.get(`/v1/address/${id}`)
      return response.data
    } catch (err) {
      console.log(err)
    }
  }

  /**
   * Fetches a list transactions for a given address
   * @param {string} id address unique identifier
   * @param {number} page Page to query data from. Defaults to 1
   * @param {number} per_page Number to items to return. Defaults to 20 items
   * @returns {Promise<any | undefined>} The response
   */
  async getAddressTransactions (id, page = 1, per_page = 20) {
    try {
      const response = await this.request.get(`/v1/address/${id}/transactions?page=${page}&per_page=${per_page}`)
      return response.data
    } catch (err) {
      console.log(err)
    }
  }

  /**
   * Fetches a List of all crypto deposits
   * @param {number} page page to query data from. Defaults to 1
   * @param {number} per_page Number to items to return. Defaults to 20 items
   * @returns {Promise<any | undefined>} The response
   */
  async getCryptoDeposits (page = 1, per_page = 20) {
    try {
      const response = await this.request.get(`/v1/address/transctions?page=${page}&per_page=${per_page}`)
      return response.data
    } catch (err) {
      console.log(err)
    }
  }

  /**
   * Fetch a single transaction that occurred on a given address
   * @param {string} id  transaction reference
   * @returns {Promise<any | undefined>} The response
   */
  async getAddressSingleTransaction (id) {
    try {
      const response = await this.request.get(`/v1/address/transactions/${id}`)
      return response.data
    } catch (err) {
      console.log(err)
    }
  }

  /**
   * Fetches all balances of a merchant
   * @returns {Promise<any | undefined>} The response
   */
  async getBalance () {
    try {
      const response = await this.request.get('/v1/balance')
      return response.data
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = FluidCoins
