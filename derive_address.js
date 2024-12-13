const { Web3 } = require("web3");

const privateKey =
  "0xb032e85edc39953e8af21eb253fb225152957adcc3782dad442c127aec9cb05d";

const web3 = new Web3("http://localhost:8541");

// Derive the account address
const account = web3.eth.accounts.privateKeyToAccount(privateKey);
console.log("Account Address:", account.address);
