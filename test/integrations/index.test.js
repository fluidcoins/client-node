const { expect } = require('chai')
require('dotenv').config()
const Fluidcoins = require('../../index')
const { userdata, updateUserData, paymentData } = require('../fixtures')

describe('Fluidcoins', () => {
  let transactions
  let address
  let customer
  let link
  let account
  let payout

  const fluidcoins = new Fluidcoins(process.env.FLUIDCOINS_SECRET_KEY)

  describe('#Transctions', () => {
    it('Should Fetch a List of transactions', async () => {
      try {
        const data = await fluidcoins.getAllTransactions()
        transactions = data.transactions
        expect(data).to.be.an('object')
        expect(data.status).to.be.equal(true)
        expect(data.transactions).to.be.an('array')
      } catch (e) {
        expect(e.status).to.be.equal(false)
      }
    })

    it('Should Fetch a List of failed transactions', async () => {
      try {
        const data = await fluidcoins.getAllTransactions('failed')
        expect(data).to.be.an('object')
        expect(data.status).to.be.equal(true)
        expect(data.transactions).to.be.an('array')
      } catch (e) {
        expect(e.status).to.be.equal(false)
      }
    })

    it('Should Fetch a single transaction', async () => {
      try {
        const data = await fluidcoins.getSingleTransaction(transactions[0].reference)
        expect(data).to.be.an('object')
        expect(data.status).to.be.equal(true)
        expect(data.transaction).to.be.an('object')
        expect(data.transaction.reference).to.be.equal(transactions[0].reference)
      } catch (e) {
        expect(e.status).to.be.equal(false)
      }
    })
  })

  describe('#Address', () => {
    it('Should Fetch addresses', async () => {
      try {
        const data = await fluidcoins.getAddresses()
        expect(data).to.be.an('object')
        expect(data.status).to.be.equal(true)
        expect(data.addresses).to.be.an('array')
      } catch (e) {
        expect(e.status).to.be.equal(false)
      }
    })

    it('Should new address with error message', async () => {
      try {
        await fluidcoins.createNewAddress({ code: 'USDT', network: 'POLYGON' })
      } catch (e) {
        expect(e.status).to.be.equal(false)
        expect(e.message).to.be.equal('cannot generate USD Tether address in test mode.')
      }
    })

    it('Should create a new ETH address', async () => {
      try {
        const data = await fluidcoins.createNewAddress({ code: 'ETH', network: 'ERC20' })
        address = data.address
        expect(data).to.be.an('object')
        expect(data.status).to.be.equal(true)
      } catch (e) {
        expect(e.status).to.be.equal(false)
      }
    })

    it('Should create a new XRP address', async () => {
      try {
        const data = await fluidcoins.createNewAddress({ code: 'XRP', network: 'XRP' })
        expect(data).to.be.an('object')
        expect(data.status).to.be.equal(true)
      } catch (e) {
        expect(e.status).to.be.equal(false)
      }
    })

    it('Should create a new DOGE address without network field', async () => {
      try {
        const data = await fluidcoins.createNewAddress({ code: 'DOGE' })
        expect(data).to.be.an('object')
        expect(data.status).to.be.equal(true)
      } catch (e) {
        expect(e.status).to.be.equal(false)
      }
    })

    it('Should List all crypto deposits', async () => {
      try {
        const data = await fluidcoins.getCryptoDeposits()
        expect(data).to.be.an('object')
        expect(data.status).to.be.equal(true)
        expect(data.transactions).to.be.an('array')
      } catch (e) {
        expect(e.status).to.be.equal(false)
      }
    })

    it('Should Fetch a list transactions for a given address', async () => {
      try {
        const data = await fluidcoins.getAddressTransactions(address.reference)
        expect(data).to.be.an('object')
        expect(data.status).to.be.equal(true)
        expect(data.transactions).to.be.an('array')
      } catch (e) {
        expect(e.status).to.be.equal(false)
      }
    })

    it('Should Fetch a single transaction that occurred on a given address', async () => {
      try {
        const data = await fluidcoins.getAddressSingleTransaction(address.reference, transactions[0].reference)
        expect(data).to.be.an('object')
        expect(data.status).to.be.equal(true)
        expect(data.transaction).to.be.an('object')
        expect(data.transaction.reference).to.be.equal(transactions[0].reference)
      } catch (e) {
        expect(e.status).to.be.equal(false)
      }
    })

    it('Should fetches an address by its reference', async () => {
      try {
        const data = await fluidcoins.getSingleAddress(address.reference)
        expect(data).to.be.an('object')
        expect(data.status).to.be.equal(true)
        expect(data.address).to.be.an('object')
        expect(data.address.reference).to.be.equal(address.reference)
      } catch (e) {
        expect(e.status).to.be.equal(false)
      }
    })
  })

  describe('#Balances', () => {
    it('Should Fetch all balances of a merchant', async () => {
      try {
        const data = await fluidcoins.getBalance()
        expect(data).to.be.an('object')
        expect(data.status).to.be.equal(true)
        expect(data.balances).to.be.an('array')
      } catch (e) {
        expect(e.status).to.be.equal(false)
      }
    })
  })

  describe('#Currencies', () => {
    it('Should Fetch a List of all currencies', async () => {
      try {
        const data = await fluidcoins.getCurrencies()
        expect(data).to.be.an('object')
        expect(data.status).to.be.equal(true)
        expect(data.currencies).to.be.an('array')
      } catch (e) {
        expect(e.status).to.be.equal(false)
      }
    })

    it('Should Fetch a List currencies that have a test-net network', async () => {
      try {
        const data = await fluidcoins.getCurrencies(true)
        expect(data).to.be.an('object')
        expect(data.status).to.be.equal(true)
        expect(data.currencies).to.be.an('array')
      } catch (e) {
        expect(e.status).to.be.equal(false)
      }
    })

    it('Should Fetch fiat exchange rates', async () => {
      try {
        const data = await fluidcoins.getFiatRate()
        expect(data).to.be.an('object')
        expect(data.status).to.be.equal(true)
        expect(data.rates).to.be.an('array')
      } catch (e) {
        expect(e.status).to.be.equal(false)
      }
    })

    it('Should Fetch fiat exchange rates with conversion', async () => {
      try {
        const data = await fluidcoins.getFiatRate('USDT', 'NGN')
        expect(data).to.be.an('object')
        expect(data.status).to.be.equal(true)
        expect(data.rates).to.be.an('array')
      } catch (e) {
        expect(e.status).to.be.equal(false)
      }
    })
  })

  describe('#Customer', () => {
    it('Should Create a new customer', async () => {
      try {
        const data = await fluidcoins.createNewCustomer(userdata)
        customer = data.customer
        expect(data).to.be.an('object')
      } catch (e) {
        expect(e.status).to.be.equal(false)
      }
    })

    it('Should edit a single customer', async () => {
      try {
        const data = await fluidcoins.editCustomer(customer.reference, updateUserData)
        expect(data).to.be.an('object')
        expect(data.status).to.be.equal(true)
        expect(data.customer).to.be.an('object')
        expect(data.customer.reference).to.be.equal(customer.reference)
      } catch (e) {
        expect(e.status).to.be.equal(false)
      }
    })

    it('Should Fetch a list of customers', async () => {
      try {
        const data = await fluidcoins.getCustomers()
        expect(data).to.be.an('object')
        expect(data.status).to.be.equal(true)
        expect(data.customers).to.be.an('array')
      } catch (e) {
        expect(e.status).to.be.equal(false)
      }
    })

    it('Should Fetch a list of blacklisted customers', async () => {
      try {
        const data = await fluidcoins.getCustomers(true)
        expect(data).to.be.an('object')
        expect(data.status).to.be.equal(true)
        expect(data.customers).to.be.an('array')
      } catch (e) {
        expect(e.status).to.be.equal(false)
      }
    })

    it('Should Blacklist a customer', async () => {
      try {
        const data = await fluidcoins.blackListCustomer(customer.reference)
        expect(data).to.be.an('object')
        expect(data.status).to.be.equal(true)
        expect(data.customer).to.be.an('object')
        expect(data.customer.is_blacklisted).to.be.equal(true)
      } catch (e) {
        expect(e.status).to.be.equal(false)
      }
    })

    it('Should Whitelists a customer', async () => {
      try {
        const data = await fluidcoins.whiteListCustomer(customer.reference)
        expect(data).to.be.an('object')
        expect(data.status).to.be.equal(true)
        expect(data.customer).to.be.an('object')
        expect(data.customer.is_blacklisted).to.be.equal(false)
      } catch (e) {
        expect(e.status).to.be.equal(false)
      }
    })

    it('Should Fetch a List of transactions belong to a specific customer', async () => {
      try {
        const data = await fluidcoins.getCustomerTransactions(customer.reference)
        expect(data).to.be.an('object')
        expect(data.status).to.be.equal(true)
        expect(data.transactions).to.be.an('array')
      } catch (e) {
        expect(e.status).to.be.equal(false)
      }
    })

    it('Should Fetch a List of transactions with status type belong to a specific customer', async () => {
      try {
        const data = await fluidcoins.getCustomerTransactions(customer.reference, 'success')
        expect(data).to.be.an('object')
        expect(data.status).to.be.equal(true)
        expect(data.transactions).to.be.an('array')
      } catch (e) {
        expect(e.status).to.be.equal(false)
      }
    })
  })

  describe('#Payment', () => {
    it('Should create a new payement link', async () => {
      try {
        const data = await fluidcoins.createNewPaymentLink(paymentData)
        link = data.link
        expect(data).to.be.an('object')
        expect(data.status).to.be.equal(true)
        expect(data.link).to.be.an('object')
        expect(data.link.title).to.be.equal(paymentData.title)
      } catch (e) {
        expect(e.status).to.be.equal(false)
      }
    })

    it('Should fetch a payement link by reference', async () => {
      try {
        const data = await fluidcoins.getSinglePaymentLink(link.identifier)
        expect(data).to.be.an('object')
        expect(data.status).to.be.equal(true)
        expect(data.link).to.be.an('object')
        expect(data.link.identifier).to.be.equal(link.identifier)
      } catch (e) {
        expect(e.status).to.be.equal(false)
      }
    })

    it('Should Disable a payment link for collection by reference', async () => {
      try {
        const data = await fluidcoins.disablePaymentLink(link.identifier)
        expect(data).to.be.an('object')
        expect(data.status).to.be.equal(true)
        expect(data.link).to.be.an('object')
        expect(data.link.is_enabled).to.be.equal(false)
      } catch (e) {
        expect(e.status).to.be.equal(false)
      }
    })

    it('Should Fetch all disabled payement links', async () => {
      try {
        const data = await fluidcoins.getPaymentLinks('disabled')
        expect(data).to.be.an('object')
        expect(data.status).to.be.equal(true)
        expect(data.links).to.be.an('array')
        expect(data.links[0].is_enabled).to.be.equal(false)
      } catch (e) {
        expect(e.status).to.be.equal(false)
      }
    })

    it('Should enable a payment link for collection by reference', async () => {
      try {
        const data = await fluidcoins.enablePaymentLink(link.identifier)
        expect(data).to.be.an('object')
        expect(data.status).to.be.equal(true)
        expect(data.link).to.be.an('object')
        expect(data.link.is_enabled).to.be.equal(true)
      } catch (e) {
        expect(e.status).to.be.equal(false)
      }
    })

    it('Should Fetch all payement links', async () => {
      try {
        const data = await fluidcoins.getPaymentLinks()
        expect(data).to.be.an('object')
        expect(data.status).to.be.equal(true)
        expect(data.links).to.be.an('array')
      } catch (e) {
        expect(e.status).to.be.equal(false)
      }
    })

    it('Should Fetch all transactions for payement link', async () => {
      try {
        const data = await fluidcoins.getPaymentLinkTransactions(link.identifier)
        expect(data).to.be.an('object')
        expect(data.status).to.be.equal(true)
        expect(data.transactions).to.be.an('array')
      } catch (e) {
        expect(e.status).to.be.equal(false)
      }
    })
  })

  describe('#payouts', () => {
    it('Should fetch a list of all banks', async () => {
      try {
        const data = await fluidcoins.getBanks()
        expect(data).to.be.an('object')
        expect(data.status).to.be.equal(true)
        expect(data.banks).to.be.an('array')
      } catch (e) {
        expect(e.status).to.be.equal(false)
      }
    })

    // it('Should resolve a bank account', async () => {
    //   const data = await fluidcoins.resolveBankAccount('058', '0115544526')

    // })

    it('Should Creates a new payout account for ETH', async () => {
      const payload = {
        bank: {
          account_number: '0115544526',
          bank_code: '058'
        },
        crypto: {
          address: address.address,
          label: 'Test label',
          network: address.metadata.network
        },
        currency: 'ETH'
      }
      try {
        const data = await fluidcoins.createNewPayoutAccount(payload)
        expect(data).to.be.an('object')
        expect(data.status).to.be.equal(true)
        expect(data.payout).to.be.an('object')
        expect(data.payout.crypto.coin).to.be.equal('ETH')
      } catch (e) {
        expect(e.status).to.be.equal(false)
      }
    })

    it('Should Creates a new payout account for NGN', async () => {
      const payload = {
        bank: {
          account_number: '0115544526',
          bank_code: '058'
        },
        crypto: {
          address: address.address,
          label: 'Test label',
          network: address.metadata.network
        },
        currency: 'NGN'
      }
      try {
        const data = await fluidcoins.createNewPayoutAccount(payload)
        account = data.payout
        expect(data).to.be.an('object')
        expect(data.status).to.be.equal(true)
        expect(data.payout).to.be.an('object')
        expect(data.payout.bank.currency).to.be.equal('NGN')
      } catch (e) {
        expect(e.status).to.be.equal(false)
      }
    })

    it('Should Fetch all payout accounts', async () => {
      try {
        const data = await fluidcoins.getPayoutAccounts()
        expect(data).to.be.an('object')
        expect(data.status).to.be.equal(true)
        expect(data.accounts).to.be.an('array')
      } catch (e) {
        expect(e.status).to.be.equal(false)
      }
    })

    it('Should Request a new payouts', async () => {
      try {
        const data = await fluidcoins.requestNewPayout(1000, account.reference)
        payout = data.payout
        expect(data).to.be.an('object')
        expect(data.status).to.be.equal(true)
        expect(data.payout).to.be.an('object')
      } catch (e) {
        expect(e.status).to.be.equal(false)
      }
    })

    it('Should Fetch details of a payout ', async () => {
      try {
        const data = await fluidcoins.getPayoutDetails(payout.reference)
        expect(data).to.be.an('object')
        expect(data.status).to.be.equal(true)
        expect(data.payout).to.be.an('object')
      } catch (e) {
        expect(e.status).to.be.equal(false)
      }
    })

    it('Should cancel a new payouts', async () => {
      try {
        const data = await fluidcoins.cancelPayout(payout.reference)
        expect(data).to.be.an('object')
        expect(data.status).to.be.equal(true)
        expect(data.payout).to.be.an('object')
      } catch (e) {
        expect(e.status).to.be.equal(false)
      }
    })

    it('Should Fetch all payout ', async () => {
      try {
        const data = await fluidcoins.getPayouts()
        expect(data).to.be.an('object')
        expect(data.status).to.be.equal(true)
        expect(data.payouts).to.be.an('array')
      } catch (e) {
        expect(e.status).to.be.equal(false)
      }
    })
  })

  describe('#Swaps', () => {
    it('Should get swap history', async () => {
      try {
        const data = await fluidcoins.getSwapHistory()
        expect(data).to.be.an('object')
        expect(data.status).to.be.equal(true)
        expect(data.swaps).to.be.an('array')
      } catch (e) {
        expect(e.status).to.be.equal(false)
      }
    })
  })
})
