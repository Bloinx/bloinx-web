import React, { useEffect, useState } from "react";
import Groups from "./contracts/oneRoundReusable.json";
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
  const [turn, setTurn] = useState(undefined);

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
      const admin = await contract.methods.admin().call();
      const stage = await contract.methods.stage().call();
      const turn = await contract.methods.turn().call();
      setWeb3(web3);
      setAccounts(accounts[0]);
      setContract(contract);
      setAdmin(admin);
      setStage(stage);
      setTurn(turn);
    }
    init();
    window.ethereum.on('accountsChanged', accounts => {
      setAccounts(accounts[0])
    });
  }, []);

  const isReady = () => {
    return (
      typeof contract !== 'undefined'
      && typeof web3 !== 'undefined'
      && typeof accounts !== 'undefined'
      && typeof stage !== 'undefined'
      && typeof turn !== 'undefined'
    );
  }

  if (!isReady()) {
    return <div>Loading Web3, accounts, and contract...</div>;
  }
  async function registerUser(userTurn) {
    await contract.methods.registerUser(userTurn).send({ from: accounts, value: web3.utils.toWei('0.5', 'ether') })
      .once('receipt', async (receipt) => (
        Swal.fire({
          icon: 'success',
          title: 'The transaction was executed correctly!!',
          showConfirmButton: false,
          timer: 1600
        })
      ))
      .on('error', async (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Ooops..!!',
          text: 'An error in the transaction has occured!',
          timer: 1600
        })
        console.log(error)
      });
  };

  async function startRound() {
    if (accounts === admin) {
      await contract.methods.startRound().send({ from: accounts, to: contract._address })
        .once('receipt', async (receipt) => (
          Swal.fire({
            icon: 'success',
            title: 'The round has started',
            showConfirmButton: false,
            timer: 1800
          })
        ))
        .on('error', async (error) => (
          Swal.fire({
            icon: 'error',
            title: 'Ooops..!!',
            text: 'An error in the transaction has occured!',
            showConfirmButton: false,
            timer: 1600
          })
        ))
    }
  };

  async function payTurn() {
    await contract.methods.payTurn().send({ from: accounts, value: web3.utils.toWei('0.5', 'ether') })
      .once('receipt', async (receipt) => (
        Swal.fire({
          icon: 'success',
          title: 'The transaction was executed correctly!!',
          showConfirmButton: false,
          timer: 1600
        })
      ))
      .on('error', async (error) => (
        Swal.fire({
          icon: 'error',
          title: 'Ooops..!!',
          text: 'An error in the transaction has occured!',
          showConfirmButton: false,
          timer: 1600
        })
      ));
  };

  async function withdrawTurn() {
    await contract.methods.withdrawTurn().send({ from: accounts, to: contract._address })
      .once('receipt', async (receipt) => (
        Swal.fire({
          icon: 'success',
          title: 'The transaction was executed correctly!!',
          showConfirmButton: false,
          timer: 1600
        })
      ))
      .on('error', async (error) => (
        Swal.fire({
          icon: 'error',
          title: 'Ooops..!!',
          text: 'An error in the transaction has occured!',
          showConfirmButton: false,
          timer: 1600
        })
      ));
  }

  async function advanceTurn() {
    if (accounts === admin) {
      await contract.methods.advanceTurn().send({ from: accounts, to: contract._address })
        .once('receipt', async (receipt) => (
          Swal.fire({
            icon: 'success',
            title: 'The savings were deposited.',
            showConfirmButton: false,
            timer: 1800
          })
        ))
        .on('error', async (error) => (
          Swal.fire({
            icon: 'error',
            title: 'Ooops..!!',
            text: 'An error in the transaction has occured!',
            showConfirmButton: false,
            timer: 1600
          })
        ))
    }
  };

  async function withdrawCashIn() {
    if (accounts === admin) {
      await contract.methods.withdrawCashIn().send({ from: accounts, to: contract._address })
        .once('receipt', async (receipt) => (
          Swal.fire({
            icon: 'success',
            title: 'The security deposit has been returned!',
            showConfirmButton: false,
            timer: 1800
          })
        ))
        .on('error', async (error) => (
          Swal.fire({
            icon: 'error',
            title: 'Ooops..!!',
            text: 'An error in the transaction has occured!',
            showConfirmButton: false,
            timer: 1600
          })
        ))
    }
  }
  async function restartRound() {
    if (accounts === admin) {
      await contract.methods.restartRound().send({ from: accounts, to: contract._address })
        .once('receipt', async (receipt) => (
          Swal.fire({
            icon: 'success',
            title: 'Get ready for an other round!',
            showConfirmButton: false,
            timer: 1800
          })
        ))
        .on('error', async (error) => (
          Swal.fire({
            icon: 'error',
            title: 'Ooops..!!',
            text: 'An error in the transaction has occured!',
            showConfirmButton: false,
            timer: 1600
          })
        ))
    }
  }

  async function payCashIn() {
    await contract.methods.payCashIn().send({ from: accounts, value: web3.utils.toWei('0.5', 'ether') })
      .once('receipt', async (receipt) => (
        Swal.fire({
          icon: 'success',
          title: 'The transaction was executed correctly!!',
          showConfirmButton: false,
          timer: 1600
        })
      ))
      .on('error', async (error) => (
        Swal.fire({
          icon: 'error',
          title: 'Ooops..!!',
          text: 'An error in the transaction has occured!',
          showConfirmButton: false,
          timer: 1600
        })
      ));
  };


  return (
    <div>
      <Navbar account={accounts} />
      <Home
        registerUser={registerUser}
        startRound={startRound}
        payTurn={payTurn}
        withdrawRound={withdrawTurn}
        advanceTurn={advanceTurn}
        withdrawCashIn={withdrawCashIn}
        restartRound={restartRound}
        payCashIn={payCashIn}
        stage={stage}
        turn={turn}
        account={accounts}
        admin={admin}
      />
      <Footer stage={stage} />
    </div>
  );
}

export default App;
