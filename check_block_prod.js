const { Web3 } = require("web3");

// Initialize Web3 instance connected to validator1's RPC endpoint
const web3 = new Web3("http://localhost:8541");

const getLatestBlock = async () => {
  try {
    const latestBlock = await web3.eth.getBlockNumber();
    console.log(`Latest Block Number: ${latestBlock}`);
  } catch (error) {
    console.error("Error fetching latest block:", error);
  }
};

getLatestBlock();
