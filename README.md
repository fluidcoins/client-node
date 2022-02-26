
# FluidCoins NodeJS SDK

The Official Node.js library for the Fluidcoins API.

## Installation

Install node-client with npm

```bash
  npm i @fluidcoins/sdk
```

## Usage/Examples

#### create a new crypto deposit address

```javascript
const Fluidcoins = require('@fluidcoins/sdk')

fluidcoins = new Fluidcoins(secretKey)

// code can be any supported currency
// network can be any supported currency. If no network is provided, the default
// network is used
const addresses = fluidcoins.createNewAddress({ code: 'USDT', network: 'POLYGON' })

```


#### create a payment link


```javascript
const Fluidcoins = require('@fluidcoins/sdk')

fluidcoins = new Fluidcoins(secretKey)

const paymentData = {
  amount: 100000,
  description: "Test payment description",
  title: "Test Payment",
};

const link = fluidcoins.createNewPaymentLink(paymentData);

```


#### fetch supported currencies ( crypto and fiat currencies )

```javascript
const Fluidcoins = require('@fluidcoins/sdk')

fluidcoins = new Fluidcoins(secretKey)

const supportedCurrencies = fluidcoins.getCurrencies()

```


#### fetch balances

```javascript
const Fluidcoins = require('@fluidcoins/sdk')

fluidcoins = new Fluidcoins(secretKey)

const balances = fluidcoins.getBalance()

```

## Documentation/API reference

[Documentation](https://developers.fluidcoins.com)

