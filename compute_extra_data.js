const crypto = require("crypto");

/**
 * Generate the extraData field for QBFT genesis.json
 * @param {string[]} validatorAddresses - Array of validator addresses (20-byte hex strings).
 * @returns {string} - The generated extraData field as a hex string.
 */
function generateExtraData(validatorAddresses) {
  // 32 bytes of vanity data (zeros)
  const vanity = "0".repeat(64); // 64 hex characters = 32 bytes

  // Concatenate validator addresses (strip "0x" prefix)
  const validators = validatorAddresses
    .map((address) => address.replace(/^0x/, ""))
    .join("");

  // 65 bytes of zero sealer data (zeros)
  const sealer = "0".repeat(130); // 130 hex characters = 65 bytes

  // Combine all parts to form the extraData field
  const extraData = `0x${vanity}${validators}${sealer}`;

  return extraData;
}

// Example validator addresses
const validatorAddresses = [
  "0x2f140E87352B1fF61492887cB658Ae8567815Ca1",
  "0x69346A088dDA3A1719Fa7cF17Be8BAfe6c65ab4c",
  "0xb5a33962e49d461dcc6304D2d8476CCBE662c3Fb",
  "0x8A877fc2db2b44206b44C1d2846724a1A23dBF91",
];

// Generate the extraData field
const extraData = generateExtraData(validatorAddresses);

console.log("Extra Data:", extraData);
