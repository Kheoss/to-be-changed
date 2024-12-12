const { Web3 } = require("web3");
const fs = require("fs");
const path = require("path");

// Initialize Web3 instance connected to validator1's RPC endpoint
const web3 = new Web3("http://localhost:8541");

// Read the compiled contract's ABI and bytecode
const contractPath = path.resolve(__dirname, "TargetContract.json");
const contractJson = JSON.parse(fs.readFileSync(contractPath, "utf8"));
const contractABI =
  contractJson.contracts["TargetContract.sol:TargetContract"].abi;
const contractBytecode =
  contractJson.contracts["TargetContract.sol:TargetContract"].bin;

// Validator1's credentials
const account = "0x2f140E87352B1fF61492887cB658Ae8567815Ca1"; // Replace with your account
const privateKey =
  "0xb032e85edc39953e8af21eb253fb225152957adcc3782dad442c127aec9cb05d"; // Replace with your private key
const checkBalance = async () => {
  try {
    const balanceWei = await web3.eth.getBalance(account);
    const balanceEther = web3.utils.fromWei(balanceWei, "ether");
    console.log(`Account Balance: ${balanceEther} ETH`);
  } catch (error) {
    console.error("Error fetching balance:", error);
  }
};
const deploy = async () => {
  try {
    // Create contract instance
    const contract = new web3.eth.Contract(contractABI);

    // Prepare deployment data
    const deployData = contract
      .deploy({
        data: "0x" + contractBytecode,
        arguments: [], // No constructor arguments
      })
      .encodeABI();
    checkBalance();
    // Get the nonce
    const nonce = await web3.eth.getTransactionCount(account, "latest");
    console.log(`Current Nonce: ${nonce}`);
    // Estimate gas
    const gasEstimate = await web3.eth.estimateGas({
      from: account,
      data: deployData,
    });

    console.log("OkK");
    // Get current gas price
    const gasPrice = await web3.eth.getGasPrice();

    console.log("OK");
    // Create transaction object
    const tx = {
      from: account,
      nonce: nonce,
      gas: gasEstimate,
      gasPrice: gasPrice,
      data: deployData,
    };
    console.log("OK2");
    // Sign the transaction
    const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
    console.log("OK3");
    // Send the signed transaction
    const receipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );

    console.log(
      "Target Contract deployed at address:",
      receipt.contractAddress
    );
    return receipt.contractAddress;
  } catch (error) {
    console.error("Error deploying Target Contract:", error);
  }
};

deploy();
