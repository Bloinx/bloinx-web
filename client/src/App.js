import React, { useEffect, useState } from "react";
import Groups from "./contracts/Groups.json";
import getWeb3 from "./getWeb3";

import Home from './containers/Home';
import Navbar from './components/Navbar';

import "./App.css";

function App() {
  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState(undefined);
  const [contract, setContract] = useState(undefined);
  
  useEffect(() => {
    const init = async() => {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Groups.networks[networkId];
      const contract = new web3.eth.Contract(
        Groups.abi,
        deployedNetwork && deployedNetwork.address,
      );
      setWeb3(web3);
      setAccounts(accounts[0]);
      setContract(contract);
    }
    init();
    window.ethereum.on('accountsChanged', accounts => {
      setAccounts(accounts);
    });
  }, []);
  
    if (!web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }

    return (
      <div className="App">
        <Navbar account={accounts} />
        <Home />
      </div>
    );
  }

export default App;
