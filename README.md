
# FluidCoins NodeJS SDK

The Official Node.js library for the Fluidcoins API.

## Installation

Install node-client with npm

```bash
  npm i @fluidcoins/sdk
```
    
## Usage/Examples

```javascript
const Fluidcoins = require('@fluidcoins/sdk')

fluidcoins = new Fluidcoins(secretKey)

const addresses = fluidcoins.createNewAddress({ code: 'USDT', network: 'POLYGON' })

```

## Documentation

[Documentation](https://developers.fluidcoins.com)

