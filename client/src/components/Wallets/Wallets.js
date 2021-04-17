import React, { useState } from 'react';
import Web3 from 'web3';
import swal from 'sweetalert';
import { WalletLink } from 'walletlink';
import detectEthereumProvider from '@metamask/detect-provider';
// import '../../pages/Wallets.css';
// import metamask_logo from '../icons/logo_meta.png';
// import coinbase_logo from '../icons/logo_coinbase.png';

// require('dotenv').config();

const Wallets = (props) => {
  const [web3, setWeb3] = useState(undefined);
  const { REACT_APP_INFURA_ROPSTEN_KEY } = process.env;

  const loadPubKeyData = async (ethProvider) => {
    const accounts = await ethProvider.request({ method: 'eth_accounts' });
    props.getAddress(accounts[0]);
    ethProvider.on('accountsChanged', (account) => {
      props.getAddress(account[0]);
    });
    ethProvider.request({
      method: 'wallet_addEthereumChain',
      params: [{
        chainId: '0xa869',
        chainName: 'Fuji Testnet',
        nativeCurrency: {
          name: 'AVAX',
          symbol: 'AVAX',
          decimals: 18,
        },
        rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
        blockExplorerUrls: ['https://cchain.explorer.avax-test.network/'],
      }],
    });
    // props.provider(ethProvider);
  };

  const loadWeb3Provider = async () => {
    const provider = await detectEthereumProvider();
    if (provider) {
      try {
        await provider.enable();
        const web3Loadie = new Web3(provider);
        setWeb3(web3Loadie);
        const modal = document.getElementById('exampleModal');
        modal.click();
      } catch (error) {
        console.error(error);
      }
      loadPubKeyData(provider);
    } else if (
      !web3
      && !provider
    ) {
      const link = document.createElement('div');
      link.innerHTML = `<p>Si estás desde un dispositivo móvil, prueba instalando Metamask Browser desde la tienda de tu plataforma</p>
          <div class="meta_btn_container">
            <a class='metamask_link' target='_blank' href='https://play.google.com/store/apps/details?id=io.metamask'>
              <button class="logo_metamask_playstore">
              </button>
            </a>
            <a class='metamask_link' target='_blank' href='https://apps.apple.com/us/app/metamask/id1438144202'>
              <button class="logo_metamask_ios">
              </button>
            </a>
          </div>
        `;
      swal({
        title: 'Metamask no encontrado',
        icon: 'warning',
        content: link,
        button: 'Aceptar',
      });
    } else {
      const link = document.createElement('div');
      link.innerHTML = "Metamask no se encuentra instalado en tu navegador, por favor instalalo desde su  <a class='metamask_link' target='_blank' href='https://metamask.io/'>página oficial</a>";
      swal({
        title: 'Metamask no encontrado',
        icon: 'warning',
        content: link,
        button: 'Aceptar',
      });
    }
  };

  const loadCoinBase = () => {
    const APP_NAME = 'Bloinx Dapp';
    const APP_LOGO_URL = '@/assets/images/logo.png';
    const ETH_JSONRPC_URL = REACT_APP_INFURA_ROPSTEN_KEY;
    // const ETH_JSONRPC_URL = 'https://ropsten.infura.io/v3/c1d213585ead4758adc7b7f06571bd00'
    const CHAIN_ID = 3;

    const walletLink = new WalletLink({
      appName: APP_NAME,
      appLogoUrl: APP_LOGO_URL,
      darkMode: true,
    });
    const ethereum = walletLink.makeWeb3Provider(ETH_JSONRPC_URL, CHAIN_ID);
    const web3Loadie = new Web3(ethereum);
    ethereum.enable().then((accounts) => {
      // eslint-disable-next-line prefer-destructuring
      web3Loadie.eth.defaultAccount = accounts[0];
      props.getAddress(accounts[0]);
    });
  };

  return (
    <div>
      <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
        Conecta tu Wallet
      </button>
      <div className="modal fade" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Selecciona tu Wallet</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="wallet-container">
                <button
                  className="metamask_wallet"
                  onClick={loadWeb3Provider}
                  type="button"
                >
                  {/* <img
                    src={metamask_logo}
                    alt="metamask_wallet"
                    className="logo_metamask"
                    width="35px"
                  /> */}
                  <span className="font-weight-bold">METAMASK</span>
                </button>
                <button
                  className="coinbase_wallet"
                  onClick={loadCoinBase}
                  type="button"
                >
                  {/* <img
                    src={coinbase_logo}
                    alt="coinbase_wallet"
                    className="logo_metamask"
                    width="35px"
                  /> */}
                  <span className="font-weight-bold">COINBASE</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallets;
