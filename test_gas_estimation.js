const { Web3 } = require("web3");

// Initialize Web3 instance connected to validator1's RPC endpoint
const web3 = new Web3("http://localhost:8541");

// Account address
const account = "0x2f140E87352B1fF61492887cB658Ae8567815Ca1"; // Replace with your actual account address

const testEstimateGas = async () => {
  try {
    const tx = {
      from: account,
      to: "0x69346A088dDA3A1719Fa7cF17Be8BAfe6c65ab4c", // Replace with a valid receiver address
      value: web3.utils.toWei("0.1", "ether"),
    };

    const gasEstimate = await web3.eth.estimateGas(tx);
    console.log(`Estimated Gas: ${gasEstimate}`);
  } catch (error) {
    console.error("Error estimating gas:", error);
  }
};

testEstimateGas();
