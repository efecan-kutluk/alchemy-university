import {useEffect, useState} from "react"
import server from "./server";

const Accounts = () => {
  const [accountList, setAccountList] = useState([])

  const pregenerateAccounts = async () => {
    const res = await server.get("generate/5");
    console.log(res.data)
    setAccountList(res.data)
  }

  useEffect(() => {
    pregenerateAccounts()
  }, [])

  return (
    <div className="container accounts">
      <h1>Pregenerated Accounts</h1>

        {accountList.map((acc, i) => {
          return (
            <ul key={i}>
              <li ><span className="lst-name">PRIVATE KEY:</span> {acc.privateKey}</li>
              
              <li ><span className="lst-name">PUBLIC KEY:</span> {acc.publicKey}</li>
            
              <li ><span className="lst-name">ADDRESS:</span> {acc.address}</li>
            </ul>
          )
        })}
    </div>
  )
}

export default Accounts
