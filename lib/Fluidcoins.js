const axios = require('axios').default
const Helper = require('./utils/helpers')

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
      Helper.processError(err)
    }
  }

  /**
   * Create a new address
   * @param {('BTC' | 'USDT' | 'USDC' | 'ETH' | 'MATIC' | 'LTC'|
   * 'DODGE' | 'XRP' | 'XLM' | 'TRON' | 'BUSD' | 'BCH' | 'BNB')} code Code for the coin you want to generate an address for. e.g (XLM, USDC)
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
      Helper.processError(err)
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
      Helper.processError(err)
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
      Helper.processError(err)
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
      Helper.processError(err)
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
      Helper.processError(err)
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
      Helper.processError(err)
    }
  }

  /**
   * Fetches a List currencies
   * @param {boolean} [test_net_only] Retrieve only coins that have a test-net network (defaults to false)
   * @returns {Promise<any | undefined>} The response
   */
  async getCurrencies (test_net_only = false) {
    try {
      const response = await this.request.get(`/v1/currencies?test_net_only=${test_net_only}`)
      return response.data
    } catch (err) {
      Helper.processError(err)
    }
  }

  /**
   * Fetch a list of the current exchange rate of all supported
   * fiat currencies on Fluidcoins. If you provide both to and from query params,
   * we will return only that currency pair.
   * @param {string} from base currency to convert from
   * @param {string} to base currency to convert to
   * @returns {Promise<any | undefined>} The response
   */
  async getFiatRate (from, to) {
    let url = '/v1/fiat_rate'
    if (from && to) {
      url = `/v1/fiat_rate?from=${from}&to=${to}`
    }
    try {
      const response = await this.request.get(url)
      return response.data
    } catch (err) {
      Helper.processError(err)
    }
  }

  /**
   * Fetches a List customers of customers
   * @param {number} page Page to query data from. Defaults to 1
   * @param {number} per_page Number to items to return. Defaults to 10 items
   * @param {boolean} blacklisted Fetch only blacklisted customers
   * @returns {Promise<any | undefined>} The response
   */
  async getCustomers (page = 1, per_page = 10, blacklisted = false) {
    try {
      const response = await this.request.get(`/v1/customers?page=${page}&per_page=${per_page}&blacklisted=${blacklisted}`)
      return response.data
    } catch (err) {
      Helper.processError(err)
    }
  }

  /**
   * Create a new customer
   * @param {string} email The email of the customer
   * @param {string} full_name The full name of the customer
   * @param {object} phone The phone object
   * @param {string} phone.code The phone code of the customer
   * @param {string} phone.number The phone number of the customer
   * @returns {Promise<any | undefined>} The response
   */
  async createNewCustomer (email, full_name, phone) {
    try {
      const response = await this.request.post('/v1/customers', {
        email: email,
        full_name: full_name,
        phone: phone
      })
      return response.data
    } catch (err) {
      Helper.processError(err)
    }
  }

  /**
   * Fetch a customer
   * @param {string} id customer unique identifier
   * @returns {Promise<any | undefined>} The response
   */
  async getCustomer (id) {
    try {
      const response = await this.request.get(`/v1/customers/${id}`)
      return response.data
    } catch (err) {
      Helper.processError(err)
    }
  }

  /**
   * Edit a customer
   * @param {string} id customer unique identifier
   * @param {object} data customer data
   * @param {string} [data.email] The email of the customer
   * @param {string} [data.full_name] The full name of the customer
   * @param {object} [data.phone] The phone object
   * @param {string} [data.phone.code] The phone code of the customer
   * @param {string} [data.phone.number] The phone number of the customer
   * @returns {Promise<any | undefined>} The response
   */
  async editCustomer (id, data) {
    try {
      const response = await this.request.patch(`/v1/customers/${id}`, data)
      return response.data
    } catch (err) {
      Helper.processError(err)
    }
  }

  /**
   * Whitelists a customer
   * @param {string} id Customer unique identifier
   * @returns {Promise<any | undefined>} The response
   */
  async whiteListCustomer (id) {
    try {
      const response = await this.request.delete(`/v1/customers/${id}/blacklist`)
      return response.data
    } catch (err) {
      Helper.processError(err)
    }
  }

  /**
   * Blacklists a customer
   * @param {string} id customer unique identifier
   * @returns {Promise<any | undefined>} The response
   */
  async blackListCustomer (id) {
    try {
      const response = await this.request.post(`/v1/customers/${id}/blacklist`)
      return response.data
    } catch (err) {
      Helper.processError(err)
    }
  }

  /**
   * Fetches a List of transactions that belong to a specific customer
   * @param {string} id customer unique identifier
   * @param {'success' | 'failed' | 'pending'} status  The status of the transaction
   * @returns {Promise<any | undefined>} The response
   */
  async getCustomerTransactions (id, status) {
    let url = `/v1/customers/${id}/transactions`
    if (status) {
      url = `/v1/customers/${id}/transactions?status=${status}`
    }
    try {
      const response = await this.request.get(url)
      return response.data
    } catch (err) {
      Helper.processError(err)
    }
  }

  // /**
  //  * Fetch a List webhook endpoints. Only 5
  //  * @returns {Promise<any | undefined>} The response
  //  */
  // async getWebhookEndpoint () {
  //   try {
  //     const response = await this.request.get('/v1/hooks')
  //     return response.data
  //   } catch (err) {
  //     Helper.processError(err)
  //   }
  // }

  // /**
  //  * Create a new webhook. Limited to only 5 endpoints
  //  * You can only create a maximum of 5 endpoints.
  //  * @param {string} endpoint The endpoint to create
  //  * @returns {Promise<any | undefined>} The response
  //  */
  // async createNewWebhookEndpoint (endpoint) {
  //   try {
  //     const response = await this.request.post('/v1/hooks', {
  //       endpoint: endpoint
  //     })
  //     return response.data
  //   } catch (err) {
  //     Helper.processError(err)
  //   }
  // }

  // /**
  //  * Fetches an endpoint details
  //  * @param {string} id webhook unique identifier
  //  * @returns {Promise<any | undefined>} The response
  //  */
  // async fetchWebhookEndpointDetails (id) {
  //   try {
  //     const response = await this.request.get(`/v1/hooks/${id}`)

  //     return response.data
  //   } catch (err) {
  //     Helper.processError(err)
  //   }
  // }

  // /**
  //  * Edits a webhook
  //  * @param {string} id Webhook unique id of the endpoint to update
  //  * @param {string} endpoint The endpoint data to update
  //  * @returns {Promise<any | undefined>} The response
  //  */
  // async editWebhookEndpointDetails (id, endpoint) {
  //   try {
  //     const response = await this.request.patch(`/v1/hooks/${id}`, {
  //       endpoint: endpoint
  //     })
  //     return response.data
  //   } catch (err) {
  //     Helper.processError(err)
  //   }
  // }

  // /**
  //  * Disables an endpoint from receiving webhooks
  //  * @param {string} id hook unique identifier
  //  * @returns {Promise<any | undefined>} The response
  //  */
  // async disableWebhookEndpoint (id) {
  //   try {
  //     const response = await this.request.delete(`/v1/hooks/${id}/enable`)
  //     return response.data
  //   } catch (err) {
  //     Helper.processError(err)
  //   }
  // }

  // /**
  //  * Marks an endpoint as active.
  //  * @param {string} id hook unique identifier
  //  * @returns  {Promise<any | undefined>} The response
  //  */
  // async activateWebhookEndpoint (id) {
  //   try {
  //     const response = await this.request.post(`/v1/hooks/${id}/enable`)
  //     return response.data
  //   } catch (err) {
  //     Helper.processError(err)
  //   }
  // }

  // /**
  //  * View webhook logs
  //  * @param {string} id hook unique identifier
  //  * @returns {Promise<any | undefined>} The response
  //  */
  // async getWebhookEndpointLogs (id) {
  //   try {
  //     const response = await this.request.post(`/v1/hooks/${id}/portal`)
  //     return response.data
  //   } catch (err) {
  //     Helper.processError(err)
  //   }
  // }

  // /**
  //  * Fetches API keys
  //  * @returns {Promise<any | undefined>} The response
  //  */
  // async getApiKeys () {
  //   try {
  //     const response = await this.request.get('/v1/keys')
  //     return response.data
  //   } catch (err) {
  //     Helper.processError(err)
  //   }
  // }

  // /**
  //  * Rotate API keys
  //  * @returns {Promise<any | undefined>} The response
  //  */
  // async rotateApiKeys () {
  //   try {
  //     const response = await this.request.get('/v1/keys/rotate')
  //     return response.data
  //   } catch (err) {
  //     Helper.processError(err)
  //   }
  // }

  /**
   * Fetches a List payment of links
   * @param {number} page Page to query data from. Defaults to 1
   * @param {number} per_page Number of results per page. Defaults to 10
   * @param {('disabled' | 'enabled')} status filter results by the status of the links Can either be disabled or enabled
   * @returns {Promise<any | undefined>} The response
   */
  async getPaymentLinks (page = 1, per_page = 10, status) {
    let url = `/v1/links?page=${page}&per_page=${per_page}`
    if (status) {
      url = `/v1/links?page=${status}&per_page=${per_page}&status${status}`
    }
    try {
      const response = await this.request.get(url)
      return response.data
    } catch (err) {
      Helper.processError(err)
    }
  }

  /**
   * Create a new payment link
   * @param {number} amount Amount in kobo/cents
   * @param {boolean} collect_phone_number CollectPhoneNumber set to true will request
   * for the phone number of the customer (defaults to false)
   * @param {'USD' | 'NGN'} currency Currency denotes the currency this payment link
   * should be denoted in supported: USD, NGN. Will default to NGN
   * @param {string} description The description of the payment link
   * @param {boolean} disable_after_payment DisableAfterPayment set to true will disable
   * this payment link after the first successful payment (defaults to false)
   * @param {string} title The title of the payment link
   * @returns {Promise<any | undefined>} The response
   */
  async createNewPaymentLink (amount, collect_phone_number = false, currency = 'NGN', description, disable_after_payment = false, title) {
    try {
      const response = await this.request.post('/v1/links', {
        amount: amount,
        collect_phone_number: collect_phone_number,
        currency: currency,
        description: description,
        disable_after_payment: disable_after_payment,
        title: title
      })
      return response.data
    } catch (err) {
      Helper.processError(err)
    }
  }

  /**
   * Fetchs a payment link
   * @param {string} id Link unique identifier
   * @returns {Promise<any | undefined>} The response
   */
  async getSinglePaymentLink (id) {
    try {
      const response = await this.request.get(`/v1/links/${id}`)
      return response.data
    } catch (err) {
      Helper.processError(err)
    }
  }

  /**
   * Edits a payment link
   * @param {string} id Link unique identifier
   * @param {object} data The data to be sent
   * @param {number} [data.amount] Amount in kobo/cents
   * @param {boolean} [data.collect_phone_number] CollectPhoneNumber set to true will request
   * for the phone number of the customer
   * @param {string} [data.description] The description of the payment link
   * @param {boolean} [data.disable_after_payment] DisableAfterPayment set to true will disable
   * this payment link after the first successful payment
   * @param {string} [data.title] The title of the payment link
   * @returns {Promise<any | undefined>} The response
   */
  async editPaymentLink (id, data) {
    try {
      const response = await this.request.patch(`/v1/links/${id}`, data)
      return response.data
    } catch (err) {
      Helper.processError(err)
    }
  }

  /**
   * Disables a payment link for collection
   * @param {string} id payment link unique identifier
   * @returns {Promise<any | undefined>} The response
   */
  async disablePaymentLink (id) {
    try {
      const response = await this.request.delete(`/v1/links/${id}/enable`)
      return response.data
    } catch (err) {
      Helper.processError(err)
    }
  }

  /**
   * Enables a payment link for collection
   * @param {string} id payment link unique identifier
   * @returns {Promise<any | undefined>} The response
   */
  async enablePaymentLink (id) {
    try {
      const response = await this.request.post(`/v1/links/${id}/enable`)
      return response.data
    } catch (err) {
      Helper.processError(err)
    }
  }

  /**
   * Fetches a List of transactions that belong to a payment link
   * @param {string} id Link unique identifier
   * @returns {Promise<any | undefined>} The response
   */
  async getPaymentLinkTransactions (id) {
    try {
      const response = await this.request.get(`/v1/links/${id}/transactions`)
      return response.data
    } catch (err) {
      Helper.processError(err)
    }
  }

  /**
   * Fetches the current merchant
   * @returns {Promise<any | undefined>} The response
   */
  async getCurrentMerchant () {
    try {
      const response = await this.request.get('/v1/merchant')
      return response.data
    } catch (err) {
      Helper.processError(err)
    }
  }

  /**
   * Fetches a List of payouts
   * @param {number} page Page to query data from. Defaults to 1
   * @param {number} per_page Number to items to return. Defaults to 20 items
   * @returns {Promise<any | undefined>} The response
   */
  async getPayouts (page = 1, per_page = 20) {
    try {
      const response = await this.request.get(`/v1/payouts?page=${page}&per_page=${per_page}`)
      return response.data
    } catch (err) {
      Helper.processError(err)
    }
  }

  /**
   * Request for a payout
   * @param {number} amount Amount to be sent to the recipient.
   * Please note that this is shouldvbe in the currency's lowest denomination.
   * 1,000 Naira would be 100000 while 1 BTC would be 100 million satoshis
   * The currency is automatically retrieved from the payout account
   * @param {string} recipient The reference of the payout account
   * @returns {Promise<any | undefined>} The response
   */
  async requestNewPayout (amount, recipient) {
    try {
      const response = await this.request.post('/v1/payouts', {
        amount: amount,
        recipient: recipient
      })
      return response.data
    } catch (err) {
      Helper.processError(err)
    }
  }

  /**
   * Fetches a List of payouts accounts
   * @param {number} page Page to query data from. Defaults to 1
   * @param {number} per_page Number to items to return. Defaults to 20 items
   * @returns {Promise<any | undefined>} The response
   */
  async getPayoutAccounts (page = 1, per_page = 20) {
    try {
      const response = await this.request.get(`/v1/payouts/accounts?page=${page}&per_page=${per_page}`)
      return response.data
    } catch (err) {
      Helper.processError(err)
    }
  }

  /**
   * Creates a new payout account
   * @param {Object} bank - The bank object
   * @param {string} bank.account_number - The account number
   * @param {string} bank.bank_code - The bank code
   * @param {Object} crypto - The crypto object
   * @param {string} crypto.address - The crypto address
   * @param {string} crypto.label - The identifier eg. recipient name
   * @param {string} crypto.network - erc20,trc20,bep20 and others
   * @param {'NGN'} currency='NGN' - The currency type only 'NGN' is supported
   * @returns {Promise<any | undefined>} The response
   */
  async createNewPayoutAccount (bank, crypto, currency = 'NGN') {
    try {
      const response = await this.request.post('/v1/payouts/accounts', {
        bank: bank,
        crypto: crypto,
        currency: currency
      })
      return response.data
    } catch (err) {
      console.error(err)
    }
  }

  /**
   * Fetches a List of banks
   * @param {string} [country=NG] - The country code
   * @returns {Promise<any | undefined>} The response
   */
  async getBanks (country = 'NG') {
    try {
      const response = await this.request.get(`/v1/payouts/accounts/banks?country=${country}`)
      return response.data
    } catch (err) {
      console.error(err)
    }
  }

  /**
   * Resolves bank accounts
   * @param {string} bank_code Sort code of the bank
   * @param {string} account Bank account number
   * @returns {Promise<any | undefined>} The response
   */
  async resolveBankAccount (bank_code, account) {
    try {
      const response = await this.request.get(`/v1/payouts/accounts/banks/resolve?bank_code=${bank_code}&account=${account}`)
      return response.data
    } catch (err) {
      console.error(err)
    }
  }

  /**
   * Cancels a payout
   * @param {string} id Payout unique identifier
   * @returns {Promise<any | undefined>} The response
   */
  async cancelPayout (id) {
    try {
      const response = await this.request.delete(`/v1/payouts/${id}`)
      return response.data
    } catch (err) {
      Helper.processError(err)
    }
  }

  /**
   * Fetches the details of a payout
   * @param {string} id Payout unique identifier
   * @returns {Promise<any | undefined>} The response
   */
  async getPayoutDetails (id) {
    try {
      const response = await this.request.get(`/v1/payouts/${id}`)
      return response.data
    } catch (err) {
      Helper.processError(err)
    }
  }

  /**
   * Fetches swap history
   * @param {number} page Page to query data from. Defaults to 1
   * @param {number} per_page Number to items to return. Defaults to 10 items
   * @returns {Promise<any | undefined>} The response
   */
  async getSwapHistory (page = 1, per_page = 10) {
    try {
      const response = await this.request.get(`/v1/swaps?page=${page}&per_page=${per_page}`)
      return response.data
    } catch (err) {
      Helper.processError(err)
    }
  }

  /**
   * Swap currencies
   * @param {number} amount Non zero amount and must be in the smallest unit of the From currency
   * @param {string} from from currency
   * @param {string} to to currency
   * @returns {Promise<any | undefined>} The response
   */
  async swapCurrencies (amount, from, to) {
    try {
      const response = await this.request.post('/v1/swaps', {
        amount: amount,
        from: from,
        to: to
      })
      return response.data
    } catch (err) {
      Helper.processError(err)
    }
  }

  /**
   * Fetches a List payment of links
   * @param {number} page Page to query data from. Defaults to 1
   * @param {number} per_page Number of results per page. Defaults to 20
   * @param {'success' | 'failed' | 'pending'} status filter results by the status of the links Can either be success, failed or pending
   * @returns {Promise<any | undefined>} The response
   */
  async getAllTransactions (page = 1, per_page = 20, status) {
    try {
      let url = `/v1/transactions?page=${page}&per_page=${per_page}`
      if (status) {
        url = `/v1/transactions?page=${status}&per_page=${per_page}&status${status}`
      }
      const response = await this.request.get(url)
      return response.data
    } catch (err) {
      Helper.processError(err)
    }
  }

  /**
   * Fetches a single transaction
   * @param {number} id Unique ID for the transaction
   * @returns {Promise<any | undefined>} The response
   */
  async getSingleTransaction (id) {
    try {
      const response = await this.request.get(`/v1/transactions/${id}`)
      return response.data
    } catch (err) {
      Helper.processError(err)
    }
  }
}

module.exports = FluidCoins
