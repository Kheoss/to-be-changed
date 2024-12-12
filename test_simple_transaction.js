const { Web3 } = require("web3");

// Initialize Web3 instance connected to validator1's RPC endpoint
const web3 = new Web3("http://localhost:8541");

// Sender credentials
const account = "0x2f140E87352B1fF61492887cB658Ae8567815Ca1"; // Replace with your account
const privateKey =
  "0xb032e85edc39953e8af21eb253fb225152957adcc3782dad442c127aec9cb05d"; // Replace with your private key

// Receiver address (another account or the same)
const receiverAddress = "0x69346A088dDA3A1719Fa7cF17Be8BAfe6c65ab4c"; // Replace with a valid receiver address

const sendSimpleTx = async () => {
  try {
    // Get nonce
    const nonce = await web3.eth.getTransactionCount(account, "latest");

    // Create transaction object
    const tx = {
      from: account,
      to: receiverAddress,
      value: web3.utils.toWei("1", "ether"), // Sending 1 ETH
      gas: 21000,
      gasPrice: await web3.eth.getGasPrice(),
      nonce: nonce,
    };

    // Sign the transaction
    const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);

    // Send the signed transaction
    const receipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );

    console.log(
      "Simple transaction successful with hash:",
      receipt.transactionHash
    );
  } catch (error) {
    console.error("Error sending simple transaction:", error);
  }
};

sendSimpleTx();
