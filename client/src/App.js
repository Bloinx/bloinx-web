import React, { useEffect, useState } from "react";
import Groups from "./contracts/Groups.json";
import getWeb3 from "./getWeb3";
import Swal from "sweetalert2";

import Home from './containers/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer/Footer';

import "./App.css";

function App() {
  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState(undefined);
  const [contract, setContract] = useState(undefined);

  useEffect(() => {
    const init = async () => {
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
      setAccounts(accounts[0]);
    });
  }, []);

  if (!web3) {
    return <div>Loading Web3, accounts, and contract...</div>;
  }

  async function registerUser(userName) {
    await contract.methods.registerUser(userName).send({ from: accounts })
    .once('receipt', async (receipt) => (
      Swal.fire({
        icon: 'success',
        title: 'La transacción se ejecuto correctamente!!',
        showConfirmButton: false,
        timer: 1600
      })
    ))
    .on('error', async (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Ooops..!!',
        text: 'Ocurrio un Error en la Transacción!',
        timer: 1600
      })
      console.log(error)
    });
  };

  async function payCashIn() {
    await contract.methods.payCashIn().send({ from: accounts, value: web3.utils.toWei('0.01100', 'ether')})
    .once('receipt', async (receipt) => (
      Swal.fire({
        icon: 'success',
        title: 'La transacción se ejecuto correctamente!!',
        showConfirmButton: false,
        timer: 1600
      })
    ))
    .on('error', async (error) => (
      Swal.fire({
        icon: 'error',
        title: 'Ooops..!!',
        text: 'Ocurrio un Error en la Transacción!',
        timer: 1600
      })
    ));
  };

  async function payRound() {
    await contract.methods.payRound().send({ from: accounts, value: web3.utils.toWei('0.01100', 'ether')})
    .once('receipt', async (receipt) => (
      Swal.fire({
        icon: 'success',
        title: 'La transacción se ejecuto correctamente!!',
        showConfirmButton: false,
        timer: 1600
      })
    ))
    .on('error', async (error) => (
      Swal.fire({
        icon: 'error',
        title: 'Ooops..!!',
        text: 'Ocurrio un Error en la Transacción!',
        timer: 1600
      })
    ));
  };

  async function withdrawRound() {
    await contract.methods.WithdrawRound().send({ from: accounts, to: '0xC82457b606C9D2D198a6cfae4C84cbbd72e274A8', value: web3.utils.toWei('0.090', "ether")})
    .once('receipt', async (receipt) => (
      Swal.fire({
        icon: 'success',
        title: 'La transacción se ejecuto correctamente!!',
        showConfirmButton: false,
        timer: 1600
      })
    ))
    .on('error', async (error) => (
      Swal.fire({
        icon: 'error',
        title: 'Ooops..!!',
        text: 'Ocurrio un Error en la Transacción!',
        timer: 1600
      })
    ));
  }

  return (
    <div>
      <Navbar account={accounts} />
      <Home
        registerUser={registerUser}
        payCashIn={payCashIn} 
        payRound={payRound}
        withdrawRound={withdrawRound}
      />
      <Footer />
    </div>
  );
}

export default App;
