import React, { useState } from 'react';
import Web3 from 'web3';
import swal from 'sweetalert';
// import { WalletLink } from 'walletlink';
import Button from '@material-ui/core/Button';
import detectEthereumProvider from '@metamask/detect-provider';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
// import metamaskLogo from '../../icons/logo_meta.png';
// import coinbase_logo from '../icons/logo_coinbase.png';

// require('dotenv').config();

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const Wallets = (props) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [web3, setWeb3] = useState(undefined);
  // const { REACT_APP_INFURA_ROPSTEN_KEY } = process.env;

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
  };

  const loadWeb3Provider = async () => {
    setOpen(false);
    const provider = await detectEthereumProvider();
    if (provider) {
      try {
        await provider.enable();
        const web3Loadie = new Web3(provider);
        setWeb3(web3Loadie);
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

  // const loadCoinBase = () => {
  //   const APP_NAME = 'Bloinx Dapp';
  //   const APP_LOGO_URL = '@/assets/images/logo.png';
  //   const ETH_JSONRPC_URL = REACT_APP_INFURA_ROPSTEN_KEY;
  //   // const ETH_JSONRPC_URL = 'https://ropsten.infura.io/v3/c1d213585ead4758adc7b7f06571bd00'
  //   const CHAIN_ID = 3;

  //   const walletLink = new WalletLink({
  //     appName: APP_NAME,
  //     appLogoUrl: APP_LOGO_URL,
  //     darkMode: true,
  //   });
  //   const ethereum = walletLink.makeWeb3Provider(ETH_JSONRPC_URL, CHAIN_ID);
  //   const web3Loadie = new Web3(ethereum);
  //   ethereum.enable().then((accounts) => {
  //     // eslint-disable-next-line prefer-destructuring
  //     web3Loadie.eth.defaultAccount = accounts[0];
  //     props.getAddress(accounts[0]);
  //   });
  // };

  return (
    <div>
      <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
        Conecta Tu Wallet
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Elige tu Wallet dentro de Metamask</DialogTitle>
        <DialogContent>
          <div className="wallet-container">
            <button
              className="metamask_wallet"
              onClick={loadWeb3Provider}
              type="button"
            >
              {/* <img
                src={metamaskLogo}
                alt="metamask_wallet"
                className="logo_metamask"
                width="35px"
              /> */}
              <span className="font-weight-bold">METAMASK</span>
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Wallets;
