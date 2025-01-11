const fs = require("fs");
const path = require("path");
const { Web3 } = require("web3");

// Connect to your Besu node
const web3 = new Web3("http://localhost:8541");

// Your account details
const account = "0x2f140E87352B1fF61492887cB658Ae8567815Ca1"; // Replace with your account
const privateKey =
  "b032e85edc39953e8af21eb253fb225152957adcc3782dad442c127aec9cb05d"; // Remove '0x' prefix

// Path to the compiled contract's ABI and bytecode
const contractPath = path.resolve(
  __dirname,
  "artifacts",
  "contracts",
  "TargetContract.sol",
  "TargetContract.json"
);
const contractJson = JSON.parse(fs.readFileSync(contractPath, "utf8"));
const abi = contractJson.abi;
const bytecode = contractJson.bytecode;

const deploy = async () => {
  try {
    const nonce = await web3.eth.getTransactionCount(account, "latest"); // get latest nonce

    // Create contract instance
    const contract = new web3.eth.Contract(abi);

    // Build the deployment transaction
    const deployTx = contract.deploy({
      data: bytecode,
      // arguments: [] // Add constructor arguments here if any
    });

    const gasEstimate = await deployTx.estimateGas({ from: account });
    const gasPrice = await web3.eth.getGasPrice();

    const tx = {
      from: account,
      data: deployTx.encodeABI(),
      gas: gasEstimate,
      gasPrice: gasPrice,
      nonce: nonce,
      chainId: await web3.eth.getChainId(),
    };

    // Sign the transaction
    const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);

    // Send the signed transaction
    const receipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );

    console.log("Contract deployed at address:", receipt.contractAddress);
  } catch (error) {
    console.error("Error deploying contract:", error);
  }
};

deploy();
