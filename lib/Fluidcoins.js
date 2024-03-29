const axios = require("axios").default;
const Helper = require("./utils/helpers");

/**
 * @class FluidCoins
 */
class FluidCoins {
  /**
   *This is a constructor for creating a Fluidcoins Instance
   * @param {string} secretkey - Thepeer secret key
   * @returns { FluidCoins } - An instance of thePeer
   */
  constructor(secretkey) {
    this.secretKey = secretkey;
    this.request = axios.create({
      baseURL: "https://api.fluidcoins.com",
      headers: {
        Authorization: `Bearer ${secretkey}`,
        "Content-Type": "application/json",
      },
    });
  }

  /**
   * Fetchs addresses for a specific coin
   * @param {string} [coin_id] fetch addresses for a specific coin.
   * Must be a uuid and you can fetch the id of the coin by using the v1/currencies endpoint
   * @param {number} page Page to query data from. Defaults to 1
   * @param {number} per_page Number to items to return. Defaults to 20 items
   * @returns {Promise<any | undefined>} The response
   */
  async getAddresses(coin_id, page = 1, per_page = 20) {
    try {
      const response = await this.request.get(
        `/v1/address?page=${page}&per_page=${per_page}&coin_id=${coin_id}`
      );
      return response.data;
    } catch (err) {
      Helper.processError(err);
    }
  }

  /**
   * Create a new address
   * @param {Object} data data to send
   * @param {('BTC' | 'USDT' | 'USDC' | 'ETH' | 'MATIC' | 'LTC'|
   * 'DODGE' | 'XRP' | 'XLM' | 'TRON' | 'BUSD' | 'BCH' | 'BNB')} data.code Code for the coin you want to generate an address for. e.g (XLM, USDC)
   * @param {string} data.network erc20,trc20,bep20 and others
   * @returns {Promise<any | undefined>} The address created or error
   */
  async createNewAddress(data) {
    try {
      const response = await this.request.post("/v1/address", data);
      return response.data;
    } catch (err) {
      Helper.processError(err);
    }
  }

  /**
   * Fetches a List of all crypto deposits
   * @param {number} page page to query data from. Defaults to 1
   * @param {number} per_page Number to items to return. Defaults to 20 items
   * @returns {Promise<any | undefined>} The response
   */
  async getCryptoDeposits(page = 1, per_page = 20) {
    try {
      const response = await this.request.get(
        `/v1/address/transactions?page=${page}&per_page=${per_page}`
      );
      return response.data;
    } catch (err) {
      Helper.processError(err);
    }
  }

  /**
   * Fetch a single transaction that occurred on a given address
   * @param {string} reference  address unique identifier. E.g TRANS_xy
   * @returns {Promise<any | undefined>} The response
   */
  async getAddressSingleTransaction(reference) {
    try {
      const response = await this.request.get(
        `/v1/address/transactions/${reference}`
      );
      return response.data;
    } catch (err) {
      Helper.processError(err);
    }
  }

  /**
   * Fetches an address by its id
   * @param {string} reference address unique identifier. E.g ADDR_xy
   * @returns {Promise<any | undefined>} The address or error
   */
  async getSingleAddress(reference) {
    try {
      const response = await this.request.get(`/v1/address/${reference}`);
      return response.data;
    } catch (err) {
      Helper.processError(err);
    }
  }

  /**
   * Fetches a list transactions for a given address
   * @param {string} reference address unique identifier. E.g ADDR_xy
   * @param {number} page Page to query data from. Defaults to 1
   * @param {number} per_page Number to items to return. Defaults to 20 items
   * @returns {Promise<any | undefined>} The response
   */
  async getAddressTransactions(reference, page = 1, per_page = 20) {
    try {
      const response = await this.request.get(
        `/v1/address/${reference}/transactions?page=${page}&per_page=${per_page}`
      );
      return response.data;
    } catch (err) {
      Helper.processError(err);
    }
  }

  /**
   * Fetches all balances of a merchant
   * @returns {Promise<any | undefined>} The response
   */
  async getBalances() {
    try {
      const response = await this.request.get("/v1/balances");
      return response.data;
    } catch (err) {
      Helper.processError(err);
    }
  }

  /**
   * Fetch a single balance
   * @param {string} code identifier of the balance ( e.g USDT, NGN)
   * @returns {Promise<any | undefined>} The response
   */
  async getBalance(code) {
    try {
      const response = await this.request.get(`/v1/balances/${code}`);
      return response.data;
    } catch (err) {
      Helper.processError(err);
    }
  }

  /**
   * Fetches a List currencies
   * @param {boolean} [test_net_only] Retrieve only coins that have a test-net network (defaults to false)
   * @returns {Promise<any | undefined>} The response
   */
  async getCurrencies(test_net_only = false) {
    try {
      const response = await this.request.get(
        `/v1/currencies?test_net_only=${test_net_only}`
      );
      return response.data;
    } catch (err) {
      Helper.processError(err);
    }
  }

  /**
   * Fetch a list of the current exchange rate of all supported
   * fiat currencies on Fluidcoins. If you provide both to and from query params,
   * we will return only that currency pair.
   * @param {string} [from] base currency to convert from
   * @param {string} [to ]base currency to convert to
   * @returns {Promise<any | undefined>} The response
   */
  async getFiatRate(from, to) {
    let url = "/v1/rates";
    if (from && to) {
      url = `/v1/rates?from=${from}&to=${to}`;
    }
    try {
      const response = await this.request.get(url);
      return response.data;
    } catch (err) {
      Helper.processError(err);
    }
  }

  /**
   * Fetches a List customers of customers
   * @param {boolean} [blacklisted] Fetch only blacklisted customers
   * @param {number} page Page to query data from. Defaults to 1
   * @param {number} per_page Number to items to return. Defaults to 10 items
   * @returns {Promise<any | undefined>} The response
   */
  async getCustomers(blacklisted, page = 1, per_page = 10) {
    try {
      let url = `/v1/customers?page=${page}&per_page=${per_page}`;
      if (blacklisted) {
        url = `/v1/customers?page=${page}&per_page=${per_page}&blacklisted=${blacklisted}`;
      }
      const response = await this.request.get(url);
      return response.data;
    } catch (err) {
      Helper.processError(err);
    }
  }

  // eslint-disable-next-line valid-jsdoc
  /**
   * Create a new customer
   * @param {{ email: string, full_name: string, phone?: { code: string, phone: string }}} data The data of the customer
   * @property
   * @param {string} data.email The email of the customer
   * @param {string} data.full_name The full name of the customer
   * @param {object} data.phone The phone object
   * @property
   * @param {string} data.phone.code The country code of the customer eg NG
   * @param {string} data.phone.phone The phone number of the customer eg 09090909090
   * @returns {Promise<any | undefined>} The response
   */
  async createNewCustomer(data) {
    try {
      const response = await this.request.post("/v1/customers", data);
      return response.data;
    } catch (err) {
      Helper.processError(err);
    }
  }

  /**
   * Fetch a customer
   * @param {string} reference Customer unique identifier. E.g CUS_xyz
   * @returns {Promise<any | undefined>} The response
   */
  async getCustomer(reference) {
    try {
      const response = await this.request.get(`/v1/customers/${reference}`);
      return response.data;
    } catch (err) {
      Helper.processError(err);
    }
  }

  // eslint-disable-next-line valid-jsdoc
  /**
   * Edit a customer
   * @param {string} reference Customer unique identifier. E.g CUS_xyz
   * @param {{ email?: string, full_name?: string, phone?: { code: string, phone: string }}} data customer data
   * @property
   * @param {string} data.email The email of the customer
   * @param {string} data.full_name The full name of the customer
   * @param {object} data.phone The phone object
   * @property
   * @param {string} data.phone.code The phone code of the customer eg NG
   * @param {string} data.phone.number The phone number of the customer eg 09090909090
   * @returns {Promise<any | undefined>} The response
   */
  async editCustomer(reference, data) {
    try {
      const response = await this.request.patch(
        `/v1/customers/${reference}`,
        data
      );
      return response.data;
    } catch (err) {
      Helper.processError(err);
    }
  }

  /**
   * Whitelists a customer
   * @param {string} reference Customer unique identifier. E.g CUS_xyz
   * @returns {Promise<any | undefined>} The response
   */
  async whiteListCustomer(reference) {
    try {
      const response = await this.request.delete(
        `/v1/customers/${reference}/blacklist`
      );
      return response.data;
    } catch (err) {
      Helper.processError(err);
    }
  }

  /**
   * Blacklists a customer
   * @param {string} reference Customer unique identifier. E.g CUS_xyz
   * @returns {Promise<any | undefined>} The response
   */
  async blackListCustomer(reference) {
    try {
      const response = await this.request.post(
        `/v1/customers/${reference}/blacklist`
      );
      return response.data;
    } catch (err) {
      Helper.processError(err);
    }
  }

  /**
   * Fetches a List of transactions that belong to a specific customer
   * @param {string} reference Customer unique identifier. E.g CUS_xyz
   * @param {'success' | 'failed' | 'pending'} [status]  The status of the transaction
   * @returns {Promise<any | undefined>} The response
   */
  async getCustomerTransactions(reference, status) {
    let url = `/v1/customers/${reference}/transactions`;
    if (status) {
      url = `/v1/customers/${reference}/transactions?status=${status}`;
    }
    try {
      const response = await this.request.get(url);
      return response.data;
    } catch (err) {
      Helper.processError(err);
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
  //  * @param {string} reference webhook unique identifier
  //  * @returns {Promise<any | undefined>} The response
  //  */
  // async fetchWebhookEndpointDetails (reference) {
  //   try {
  //     const response = await this.request.get(`/v1/hooks/${reference}`)

  //     return response.data
  //   } catch (err) {
  //     Helper.processError(err)
  //   }
  // }

  // /**
  //  * Edits a webhook
  //  * @param {string} reference Webhook unique reference of the endpoint to update
  //  * @param {string} endpoint The endpoint data to update
  //  * @returns {Promise<any | undefined>} The response
  //  */
  // async editWebhookEndpointDetails (reference, endpoint) {
  //   try {
  //     const response = await this.request.patch(`/v1/hooks/${reference}`, {
  //       endpoint: endpoint
  //     })
  //     return response.data
  //   } catch (err) {
  //     Helper.processError(err)
  //   }
  // }

  // /**
  //  * Disables an endpoint from receiving webhooks
  //  * @param {string} reference hook unique identifier
  //  * @returns {Promise<any | undefined>} The response
  //  */
  // async disableWebhookEndpoint (reference) {
  //   try {
  //     const response = await this.request.delete(`/v1/hooks/${reference}/enable`)
  //     return response.data
  //   } catch (err) {
  //     Helper.processError(err)
  //   }
  // }

  // /**
  //  * Marks an endpoint as active.
  //  * @param {string} reference hook unique identifier
  //  * @returns  {Promise<any | undefined>} The response
  //  */
  // async activateWebhookEndpoint (reference) {
  //   try {
  //     const response = await this.request.post(`/v1/hooks/${reference}/enable`)
  //     return response.data
  //   } catch (err) {
  //     Helper.processError(err)
  //   }
  // }

  // /**
  //  * View webhook logs
  //  * @param {string} reference hook unique identifier
  //  * @returns {Promise<any | undefined>} The response
  //  */
  // async getWebhookEndpointLogs (reference) {
  //   try {
  //     const response = await this.request.post(`/v1/hooks/${reference}/portal`)
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
   * @param {('disabled' | 'enabled')} [status] filter results by the status of the links Can either be disabled or enabled
   * @param {number} page Page to query data from. Defaults to 1
   * @param {number} per_page Number of results per page. Defaults to 10
   * @returns {Promise<any | undefined>} The response
   */
  async getPaymentLinks(status, page = 1, per_page = 20) {
    let url = `/v1/links?page=${page}&per_page=${per_page}`;
    if (status) {
      url = `/v1/links?page=${page}&per_page=${per_page}&status${status}`;
    }
    try {
      const response = await this.request.get(url);
      return response.data;
    } catch (err) {
      Helper.processError(err);
    }
  }

  // eslint-disable-next-line valid-jsdoc
  /**
   * Create a new payment link
   * @param {{ amount: number, description: string, title: string, collect_phone_number?: boolean, currency?: 'USD' | 'NGN', disable_after_payment? boolean }} data The data Object
   * @property
   * @param {number} data.amount Amount in kobo/cents
   * @param {string} data.description The description of the payment link
   * @param {string} data.title The title of the payment link
   * @param {boolean} [data.collect_phone_number] CollectPhoneNumber set to true will request
   * for the phone number of the customer (defaults to false)
   * @param {'USD' | 'NGN'} [data.currency] Currency denotes the currency this payment link
   * should be denoted in supported: USD, NGN. Will default to NGN
   * @param {boolean} [data.disable_after_payment] DisableAfterPayment set to true will disable
   * this payment link after the first successful payment (defaults to false)
   * @returns {Promise<any | undefined>} The response
   */
  async createNewPaymentLink(data) {
    try {
      const response = await this.request.post("/v1/links", data);
      return response.data;
    } catch (err) {
      Helper.processError(err);
    }
  }

  /**
   * Fetchs a payment link
   * @param {string} reference Link unique identifier eg LINK_rkK
   * @returns {Promise<any | undefined>} The response
   */
  async getSinglePaymentLink(reference) {
    try {
      const response = await this.request.get(`/v1/links/${reference}`);
      return response.data;
    } catch (err) {
      Helper.processError(err);
    }
  }

  // eslint-disable-next-line valid-jsdoc
  /**
   * Edits a payment link
   * @param {string} reference Link unique identifier E.g LINK_xj
   * @param {{ amount: number, description: string, title: string, collect_phone_number?: boolean, disable_after_payment? boolean }} data The data Object
   * @property
   * @param {number} data.amount Amount in kobo/cents
   * @param {string} data.description The description of the payment link
   * @param {string} data.title The title of the payment link
   * @param {boolean} data.collect_phone_number CollectPhoneNumber set to true will request
   * for the phone number of the customer (defaults to false)
   * @param {boolean} data.disable_after_payment DisableAfterPayment set to true will disable
   * this payment link after the first successful payment (defaults to false)
   * @returns {Promise<any | undefined>} The response
   */
  async editPaymentLink(reference, data) {
    try {
      const response = await this.request.patch(`/v1/links/${reference}`, data);
      return response.data;
    } catch (err) {
      Helper.processError(err);
    }
  }

  /**
   * Disables a payment link for collection
   * @param {string} reference payment link unique identifier E.g LINK_xj
   * @returns {Promise<any | undefined>} The response
   */
  async disablePaymentLink(reference) {
    try {
      const response = await this.request.delete(
        `/v1/links/${reference}/enable`
      );
      return response.data;
    } catch (err) {
      Helper.processError(err);
    }
  }

  /**
   * Enables a payment link for collection
   * @param {string} reference payment link unique identifier E.g LINK_xj
   * @returns {Promise<any | undefined>} The response
   */
  async enablePaymentLink(reference) {
    try {
      const response = await this.request.post(`/v1/links/${reference}/enable`);
      return response.data;
    } catch (err) {
      Helper.processError(err);
    }
  }

  /**
   * Fetches a List of transactions that belong to a payment link E.g LINK_xj
   * @param {string} reference Link unique identifier
   * @returns {Promise<any | undefined>} The response
   */
  async getPaymentLinkTransactions(reference) {
    try {
      const response = await this.request.get(
        `/v1/links/${reference}/transactions`
      );
      return response.data;
    } catch (err) {
      Helper.processError(err);
    }
  }

  /**
   * Fetches the current merchant
   * @returns {Promise<any | undefined>} The response
   */
  async getCurrentMerchant() {
    try {
      const response = await this.request.get("/v1/merchant");
      return response.data;
    } catch (err) {
      Helper.processError(err);
    }
  }

  /**
   * Fetches a List of payouts
   * @param {number} page Page to query data from. Defaults to 1
   * @param {number} per_page Number to items to return. Defaults to 20 items
   * @returns {Promise<any | undefined>} The response
   */
  async getPayouts(page = 1, per_page = 20) {
    try {
      const response = await this.request.get(
        `/v1/payouts?page=${page}&per_page=${per_page}`
      );
      return response.data;
    } catch (err) {
      Helper.processError(err);
    }
  }

  /**
   * Request for a payout
   * @param {number} amount Amount to be sent to the recipient.
   * Please note that this is shouldvbe in the currency's lowest denomination.
   * 1,000 Naira would be 100000 while 1 BTC would be 100 million satoshis
   * The currency is automatically retrieved from the payout account
   * @param {string} recipient The reference of the payout account, PAY_ACCT_XYZ
   * @returns {Promise<any | undefined>} The response
   */
  async requestNewPayout(amount, recipient) {
    try {
      const response = await this.request.post("/v1/payouts", {
        amount: amount,
        recipient: recipient,
      });
      return response.data;
    } catch (err) {
      Helper.processError(err);
    }
  }

  /**
   * Fetches a List of payouts accounts
   * @param {number} page Page to query data from. Defaults to 1
   * @param {number} per_page Number to items to return. Defaults to 20 items
   * @returns {Promise<any | undefined>} The response
   */
  async getPayoutAccounts(page = 1, per_page = 20) {
    try {
      const response = await this.request.get(
        `/v1/payouts/accounts?page=${page}&per_page=${per_page}`
      );
      return response.data;
    } catch (err) {
      Helper.processError(err);
    }
  }

  /**
   * Creates a new payout account with either bank or crypto
   * @param {object} data The data to be sent
   * @param {Object} data.bank - The bank object
   * @param {string} data.bank.account_number - The account number
   * @param {string} data.bank.bank_code - The bank code
   * @param {Object} data.crypto - The crypto object
   * @param {string} data.crypto.address - The crypto address
   * @param {string} data.crypto.label - The identifier eg. recipient name
   * @param {string} data.crypto.network - erc20,trc20,bep20 and others
   * @param {string} data.currency - The currency type only
   * @returns {Promise<any | undefined>} The response
   */
  async createNewPayoutAccount(data) {
    try {
      const response = await this.request.post("/v1/payouts/accounts", data);
      return response.data;
    } catch (err) {
      Helper.processError(err);
    }
  }

  /**
   * Fetches a List of banks
   * @param {string} [country=NG] - The country code
   * @returns {Promise<any | undefined>} The response
   */
  async getBanks(country = "NG") {
    try {
      const response = await this.request.get(
        `/v1/payouts/accounts/banks?country=${country}`
      );
      return response.data;
    } catch (err) {
      Helper.processError(err);
    }
  }

  /**
   * Resolves bank accounts
   * @param {string} bank_code Sort code of the bank
   * @param {string} account Bank account number
   * @returns {Promise<any | undefined>} The response
   */
  async resolveBankAccount(bank_code, account) {
    try {
      const response = await this.request.get(
        `/v1/payouts/accounts/banks/resolve?bank_code=${bank_code}&account=${account}`
      );
      return response.data;
    } catch (err) {
      Helper.processError(err);
    }
  }

  /**
   * Cancels a payout
   * @param {string} reference payout unique identifier. E.g Payout_xx
   * @returns {Promise<any | undefined>} The response
   */
  async cancelPayout(reference) {
    try {
      const response = await this.request.delete(`/v1/payouts/${reference}`);
      return response.data;
    } catch (err) {
      Helper.processError(err);
    }
  }

  /**
   * Fetches the details of a payout
   * @param {string} reference payout unique identifier. E.g Payout_xx
   * @returns {Promise<any | undefined>} The response
   */
  async getPayoutDetails(reference) {
    try {
      const response = await this.request.get(`/v1/payouts/${reference}`);
      return response.data;
    } catch (err) {
      Helper.processError(err);
    }
  }

  /**
   * Fetches swap history
   * @param {number} page Page to query data from. Defaults to 1
   * @param {number} per_page Number to items to return. Defaults to 10 items
   * @returns {Promise<any | undefined>} The response
   */
  async getSwapHistory(page = 1, per_page = 10) {
    try {
      const response = await this.request.get(
        `/v1/swaps?page=${page}&per_page=${per_page}`
      );
      return response.data;
    } catch (err) {
      Helper.processError(err);
    }
  }

  // /**
  //  * Swap currencies
  //  * @param {number} amount Non zero amount and must be in the smallest unit of the From currency
  //  * @param {string} from from currency
  //  * @param {string} to to currency
  //  * @returns {Promise<any | undefined>} The response
  //  */
  // async swapCurrencies (amount, from, to) {
  //   try {
  //     const response = await this.request.post('/v1/swaps', {
  //       amount: amount,
  //       from: from,
  //       to: to
  //     })
  //     return response.data
  //   } catch (err) {
  //     Helper.processError(err)
  //   }
  // }

  /**
   * Fetches a List of transactions
   * @param {'success' | 'failed' | 'pending'} status filter results by the status of the links
   * Can either be success, failed or pending
   * @param {number} page Page to query data from. Defaults to 1
   * @param {number} per_page Number of results per page. Defaults to 10
   * @returns {Promise<any | undefined>} The response
   */
  async getAllTransactions(status, page = 1, per_page = 10) {
    try {
      let url = `/v1/transactions?page=${page}&per_page=${per_page}`;
      if (status) {
        url = `/v1/transactions?page=${status}&per_page=${per_page}&status${status}`;
      }
      const response = await this.request.get(url);
      return response.data;
    } catch (err) {
      Helper.processError(err);
    }
  }

  /**
   * Fetches a single transaction
   * @param {number} reference Unique ID for the transaction eg (TRANS_qgc)
   * @returns {Promise<any | undefined>} The response
   */
  async getSingleTransaction(reference) {
    try {
      const response = await this.request.get(`/v1/transactions/${reference}`);
      return response.data;
    } catch (err) {
      Helper.processError(err);
    }
  }
}

module.exports = FluidCoins;

module.exports.default = FluidCoins;
