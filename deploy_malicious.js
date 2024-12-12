const { Web3 } = require("web3");
const fs = require("fs");
const path = require("path");

// Connect to validator1's RPC
const web3 = new Web3("http://localhost:8541");

// Read the compiled contract's ABI and bytecode
const contractJson = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "MaliciousContract.json"), "utf8")
);
const abi = contractJson.abi;
const bytecode = contractJson.bytecode;

const account = "0x2f140E87352B1fF61492887cB658Ae8567815Ca1"; // Replace with your account
const privateKey =
  "0xb032e85edc39953e8af21eb253fb225152957adcc3782dad442c127aec9cb05d"; // Replace with your private key

const deploy = async () => {
  const contract = new web3.eth.Contract(abi);

  const deployTx = contract.deploy({ data: bytecode });

  const gas = await deployTx.estimateGas({ from: account });
  const gasPrice = await web3.eth.getGasPrice();

  const tx = {
    from: account,
    gas,
    gasPrice,
    data: deployTx.encodeABI(),
  };

  const signed = await web3.eth.accounts.signTransaction(tx, privateKey);

  const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction);
  console.log("Contract deployed at:", receipt.contractAddress);
};

deploy();
