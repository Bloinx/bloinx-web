const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config()
const path = require("path");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    test: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    ropsten: {
      provider: () => new HDWalletProvider(process.env.MNENOMIC, `https://ropsten.infura.io/v3/${process.env.PROJECT_ID}`),
      network_id: 3
    },
    avalanche_fuji: {
      provider: () => new HDWalletProvider(process.env.MNENOMIC, `https://api.avax-test.network/ext/bc/C/rpc}`),
      port: 443,
      chain_id:43113,
      network_id: 1
    },
  }
};
