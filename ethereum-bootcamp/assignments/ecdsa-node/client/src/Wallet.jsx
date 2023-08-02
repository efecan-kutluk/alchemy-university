import {toHex} from "ethereum-cryptography/utils";
import server from "./server";
import {getPublicKey, getAddress} from "./crypto";
import { useState, useEffect } from "react";


function Wallet({ privKey, setPrivKey, account, setAccount, balance, setBalance }) {

  const [errMsg, setErrMsg] = useState("")

  async function onCommonChange(key) {
    if (privKey) {
      try {
        const publicKey = getPublicKey(key);
        const ethAddress = getAddress(publicKey);

        console.log("Public Key: " + toHex(publicKey) + ", Ethereum Address: " + toHex(ethAddress))

        const {
          data: { balance },
        } = await server.get(`balance/${toHex(ethAddress)}`);
        setBalance(balance);
        setAccount({
          privateKey: privKey,
          publicKey,
          address: ethAddress,
          balance
        })
        setErrMsg("")
      } catch(err){
        setErrMsg(err.message)
      }
    } else {
      setBalance(0);
    }
  }

  useEffect(() => {
    onCommonChange(privKey)
  }, [privKey])

  function handleChange(evt) {
    const key = evt.target.value
    console.log(key)
    setPrivKey(key)
  }

  function handlePaste(e) {
    //handle paste for some transformation
    let paste = (e.clipboardData || window.clipboardData).getData("text");
    console.log(paste)
    paste = paste.split("|").join(","); //transform your pasted content
    const selectionStart = e.target.selectionStart;

    const selectionEnd = e.target.selectionEnd;

    const currentValue = e.target.value;

    const startValue = currentValue.substring(0, selectionStart);
    const endValue = currentValue.substring(selectionEnd);

    setPrivKey(startValue + paste + endValue);
    e.preventDefault();
  };

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private Key 
        <input placeholder="Type a private key" value={privKey} onChange={handleChange} onPaste={handlePaste}></input>
      </label>

      <div className="balance">Balance: {balance}</div>
      <div className="error-message">{errMsg}</div>
    </div>
  );
}

export default Wallet;
