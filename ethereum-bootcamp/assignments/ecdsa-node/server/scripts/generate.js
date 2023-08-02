const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");
const {getAddress} = require("./utils.js")

const generateRandomAccounts = (count = 1) => {
  const accounts = []
  for(let i = 0; i < count; i++){
    const privateKey = secp.utils.randomPrivateKey();

    const publicKey = secp.getPublicKey(privateKey);
    const address = getAddress(publicKey);
    accounts[i] = {
      privateKey: toHex(privateKey),
      publicKey: toHex(publicKey),
      address: toHex(address),
      balance: Math.ceil(Math.random() * 100) 
    }
  }
  return accounts
}

module.exports = {generateRandomAccounts}
