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
  const [admin, setAdmin] = useState(undefined);
  const [stage, setStage] = useState(undefined);

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
      const admin = await contract.methods
        .admin()
        .call();
      const stage = await contract.methods.stage().call();
      setWeb3(web3);
      setAccounts(accounts[0]);
      setContract(contract);
      setAdmin(admin);
      setStage(stage);
    }
    init();
    window.ethereum.on('accountsChanged', accounts => {
      window.location.reload();
    });
  }, []);

  const isReady = () => {
    return (
      typeof contract !== 'undefined'
      && typeof web3 !== 'undefined'
      && typeof accounts !== 'undefined'
      && typeof admin !== 'undefined'
    );
  }

  if (!isReady()) {
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
    await contract.methods.payCashIn().send({ from: accounts, value: web3.utils.toWei('0.001', 'ether') })
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
          showConfirmButton: false,
          timer: 1600
        })
      ));
  };

  async function payRound() {
    await contract.methods.payRound().send({ from: accounts, value: web3.utils.toWei('0.001', 'ether') })
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
          showConfirmButton: false,
          timer: 1600
        })
      ));
  };

  async function withdrawRound() {
    await contract.methods.withdrawRound().send({ from: accounts, to: contract._address })
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
          showConfirmButton: false,
          timer: 1600
        })
      ));
  }

  async function withdrawCashIn() {
    if (accounts === admin) {
      await contract.methods.withdrawCashIn().send({ from: accounts, to: contract._address, value: web3.utils.toWei('0.002', 'ether') })
        .once('receipt', async (receipt) => (
          Swal.fire({
            icon: 'success',
            title: 'La garantia fue pagada a los usuarios!!',
            showConfirmButton: false,
            timer: 1800
          })
        ))
        .on('error', async (error) => (
          Swal.fire({
            icon: 'error',
            title: 'Ooops..!!',
            text: 'Ocurrio un Error en la Transacción!',
            showConfirmButton: false,
            timer: 1600
          })
        ))
    } else {
      return (
        Swal.fire({
          icon: 'error',
          title: 'Ooops..!!',
          text: 'Soló el admin puede ejecutar esta función!',
          showConfirmButton: false,
          timer: 1600
        })
      )
    }
  }

  return (
    <div>
      <Navbar account={accounts} />
      <Home
        registerUser={registerUser}
        payCashIn={payCashIn}
        payRound={payRound}
        withdrawRound={withdrawRound}
        withdrawCashIn={withdrawCashIn}
        stage={stage}
        admin={admin}
        account={accounts}
      />
      <Footer stage={stage} />
    </div>
  );
}

export default App;
