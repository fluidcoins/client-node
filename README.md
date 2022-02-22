
# FluidCoins NodeJS SDK

The Official Node.js library for the Fluidcoins API.

## Installation

Install fluidcoins-node with npm

```bash
  npm install fluidcoins-node
```
    
## Usage/Examples

```javascript
const Fluidcoins = require('fluidcoins-node')

fluidcoins = new Fluidcoins(secretKey)

const addresses = fluidcoins.createNewAddress({ code: 'USDT', network: 'POLYGON' })

```

## Documentation

[Documentation](https://developers.fluidcoins.com)

