const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

// Using Mnemonic phrase here because it is a test account.
// Don't hardcode for real account.
const provider = new HDWalletProvider(
  'leg axis winter vapor zero edit recycle harsh judge original height taxi',
  'https://rinkeby.infura.io/v3/8b522f7576274ea588a917130545f859'
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ gas: '1000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};
deploy();
