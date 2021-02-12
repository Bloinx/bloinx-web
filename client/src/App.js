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
  const [account, setAccount] = useState(undefined);
  const [contract, setContract] = useState(undefined);
  const [admin, setAdmin] = useState(undefined);
  const [stage, setStage] = useState(undefined);
  const [turn, setTurn] = useState(undefined);
  const [addressOrderList1, setAddressOrderList1] = useState(undefined);
  const [addressOrderList2, setAddressOrderList2] = useState(undefined);
  const [addressOrderList3, setAddressOrderList3] = useState(undefined);

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
      const addressOrderList1 = await contract.methods.addressOrderList(0).call();
      const addressOrderList2 = await contract.methods.addressOrderList(1).call();
      const addressOrderList3 = await contract.methods.addressOrderList(2).call();
      setWeb3(web3);
      setAccount(accounts[0]);
      setContract(contract);
      setAdmin(admin);
      setStage(stage);
      setTurn(turn);
      setAddressOrderList1(addressOrderList1);
      setAddressOrderList2(addressOrderList2);
      setAddressOrderList3(addressOrderList3);
    }
    init();
    window.ethereum.on('accountsChanged', accounts => {
      setAccount(accounts[0])
    });
  }, [stage]);

  const isReady = () => {
    return (
      typeof contract !== 'undefined'
      && typeof web3 !== 'undefined'
      && typeof account !== 'undefined'
    );
  }

  if (!isReady()) {
    return <div>Loading Web3, accounts, and contract...</div>;
  }
  async function registerUser(userTurn) {
    await contract.methods.registerUser(userTurn).send({ from: account, value: web3.utils.toWei('1', 'ether') })
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

  async function removeUser(userTurn) {
    if (account === admin) {
      await contract.methods.removeUser(userTurn).send({ from: account, to: contract._address })
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
      }
  };

  async function startRound() {
    if (account === admin) {
      await contract.methods.startRound().send({ from: account, to: contract._address })
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
    await contract.methods.payTurn().send({ from: account, value: web3.utils.toWei('1', 'ether') })
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

  async function payLateTurn() {
    await contract.methods.payLateTurn().send({ from: account, value: web3.utils.toWei('1', 'ether') })
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
    await contract.methods.withdrawTurn().send({ from: account, to: contract._address })
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
    if (account === admin) {
      await contract.methods.advanceTurn().send({ from: account, to: contract._address })
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
    if (account === admin) {
      await contract.methods.withdrawCashIn().send({ from: account, to: contract._address })
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
    if (account === admin) {
      await contract.methods.restartRound().send({ from: account, to: contract._address })
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
    await contract.methods.payCashIn().send({ from: account, value: web3.utils.toWei('1', 'ether') })
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
      <Navbar account={account} />
      <Home
        registerUser={registerUser}
        removeUser={removeUser}
        startRound={startRound}
        payTurn={payTurn}
        payLateTurn={payLateTurn}
        withdrawRound={withdrawTurn}
        advanceTurn={advanceTurn}
        withdrawCashIn={withdrawCashIn}
        restartRound={restartRound}
        payCashIn={payCashIn}
        stage={stage}
        turn={turn}
        addressOrderList1={addressOrderList1}
        addressOrderList2={addressOrderList2}
        addressOrderList3={addressOrderList3}
        account={account}
        admin={admin}
      />
      <Footer stage={stage} />
    </div>
  );
}

export default App;
