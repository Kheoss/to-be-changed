require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.0",
  networks: {
    besu: {
      url: "http://localhost:8541", // Replace with your Besu node URL
      accounts: [
        "0xb032e85edc39953e8af21eb253fb225152957adcc3782dad442c127aec9cb05d",
      ], // Your private key
    },
  },
};
