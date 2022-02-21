const faker = require('faker')

const email = faker.internet.email().toLowerCase()
const first_name = faker.name.firstName()
const last_name = faker.name.lastName()

const userdata = {
  email,
  full_name: `${first_name} ${last_name}`,
  phone: {
    code: 'NG',
    phone: '09000000000'
  }
}

const updateUserData = {
  email: faker.internet.email().toLowerCase(),
  phone: {
    code: 'NG',
    phone: '09011111000'
  }
}

const paymentData = {
  amount: 100000,
  description: 'Test payment description',
  title: 'Test Payment'
}

module.exports = {
  userdata,
  updateUserData,
  paymentData
}
