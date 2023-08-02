import Wallet from "./Wallet";
import Transfer from "./Transfer";
import Accounts from "./Accounts"
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [privKey, setPrivKey] = useState("");
  const [account, setAccount] = useState({});

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        privKey={privKey}
        setPrivKey={setPrivKey}
        account={account}
        setAccount={setAccount}
      />
      <Transfer setBalance={setBalance} account={account} />
      <Accounts />
    </div>
  );
}

export default App;
