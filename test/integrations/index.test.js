const { expect } = require('chai')
require('dotenv').config()
const Fluidcoins = require('../../index')

describe('Fluidcoins', () => {
  let transactions
  let address
  const fluidcoins = new Fluidcoins(process.env.FLUIDCOINS_SECRET_KEY)

  describe('#Transctions', () => {
    it('Should Fetch a List of transactions', async () => {
      try {
        const data = await fluidcoins.getAllTransactions(1, 10, 'failed')
        transactions = data.transactions
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
})
