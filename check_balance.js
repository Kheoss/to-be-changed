const { Web3 } = require("web3");

const web3 = new Web3("http://localhost:8541");

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

checkBalance();
