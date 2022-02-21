const { expect } = require('chai')
require('dotenv').config()
const Fluidcoins = require('../../index')

describe('Fluidcoins', () => {
  let address
  const fluidcoins = new Fluidcoins(process.env.FLUIDCOINS_SECRET_KEY)

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

    it('Should fetches an address by its id', async () => {
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
})
