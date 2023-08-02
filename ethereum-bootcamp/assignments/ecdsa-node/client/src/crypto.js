import * as secp256k1 from "ethereum-cryptography/secp256k1";
import {keccak256} from "ethereum-cryptography/keccak";
import {toHex, utf8ToBytes} from "ethereum-cryptography/utils";

export const getPublicKey = privateKey => secp256k1.getPublicKey(privateKey);

export const getAddress = publicKey => keccak256(publicKey.slice(1)).slice(-20);

export const signMessage = async (message, privateKey) => {
  const msgHash = keccak256(utf8ToBytes(JSON.stringify(message)))
  const sign = await secp256k1.sign(msgHash, privateKey, {recovered: true})
  return [toHex(sign[0]), sign[1]] 
}

export const isPrivateKey = privateKey => privateKey.length === 32
