const secp256k1 = require("ethereum-cryptography/secp256k1")
const {generateRandomAccounts} = require("./scripts/generate.js")
const {restorePublicKey, hashMessage} = require("./scripts/utils.js")
const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

global.balances = new Map()

app.get("/generate/:count", (req, res) => {
  const { count } = req.params;
  const accounts = generateRandomAccounts(parseInt(count));
  global.balances = new Map([...accounts.map(acc => [acc.address, acc.balance])]);
  res.send(accounts)
})

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = global.balances.get(address) || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const {msg, signPair} = req.body;
  const { sender, recipient, amount } = msg;
  const sign = signPair[0];
  console.log(sign)
  const recoveryBit = signPair[1]

  const msgHash = hashMessage(msg)
  const pubKey = restorePublicKey(msgHash, sign, recoveryBit)

  setInitialBalance(sender);
  setInitialBalance(recipient);
  if(!secp256k1.verify(sign, msgHash, pubKey)){
    res.status(400).send({ message: "Invalid sign!" })
  }
  else if (sender === recipient) {
    res.status(400).send({message: "Sending to self is not allowed!"})
  }
  else if (!(global.balances.has(sender) || global.balances.has(recipient))) {
    res.status(400).send({message: "Only the pregenerated accounts are able to transfer money to each other for now..."})
  }
  else if (global.balances.get(sender) < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    global.balances.set(sender, balances.get(sender) - amount);
    global.balances.set(recipient, balances.get(recipient) + amount);
    res.send({ balance: global.balances.get(sender) });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!global.balances.get(address)) {
    global.balances.set(address, 0);
  }
}
