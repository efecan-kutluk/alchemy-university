import { useState } from "react";
import server from "./server";
import {toHex} from "ethereum-cryptography/utils"
import {signMessage} from "./crypto"

function Transfer({ account, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    try {
      const msg = {
        sender: toHex(account.address),
        amount: parseInt(sendAmount),
        recipient
      }
      console.log(msg)
      const signPair = await signMessage(msg, account.privateKey)
      const res = await server.post(`send`, {msg, signPair});
      setBalance(res.data.balance);
    } catch (ex) {
      alert(ex.response.data.message)
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an ethereum address, for example: 5c973ecd1f1dc1e242755a380de055afdc8cc685"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
