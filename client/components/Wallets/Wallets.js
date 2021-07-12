import React, { useState } from 'react';
import Web3 from 'web3';
import { DownloadOutlined } from '@ant-design/icons';
import detectEthereumProvider from '@metamask/detect-provider';
import {
  Button, Drawer, Typography, Spin, message, Result,
} from 'antd';
// import { WalletLink } from 'walletlink';

// require('dotenv').config();

const errorMessages = [{
  code: '404M',
  status: 'warning',
  title: 'Metamask no encontrado',
  description: 'Si estás desde un dispositivo móvil, prueba instalando Metamask Browser desde la tienda de tu plataforma.',
  hrefs: [{
    url: 'https://play.google.com/store/apps/details?id=io.metamask',
    title: 'PayStore',
  }, {
    url: 'https://apps.apple.com/us/app/metamask/id1438144202',
    title: 'AppStore',
  }],
}, {
  code: '404W',
  status: 'warning',
  title: 'Metamask no encontrado',
  description: 'Metamask no se encuentra instalado en tu navegador, por favor instalalo desde su pagina oficial.',
  hrefs: [{
    url: 'https://metamask.io/',
    title: 'Ir al sitio',
  }],
}, {
  code: 500,
  status: 'error',
  title: '',
  description: '',
  hrefs: [],
}];

const { Title } = Typography;

export default function Wallets() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [web3, setWeb3] = useState(null);

  const handleToggleDrawer = () => setOpen(!open);

  // // const { REACT_APP_INFURA_ROPSTEN_KEY } = process.env;

  // eslint-disable-next-line no-unused-vars
  const loadPubKeyData = async (ethProvider) => {
    // const accounts = await ethProvider.request({ method: 'eth_accounts' });
    // props.getAddress(accounts[0]);
  //   ethProvider.on('accountsChanged', (account) => {
  //     props.getAddress(account[0]);
  //   });
  //   ethProvider.request({
  //     method: 'wallet_addEthereumChain',
  //     params: [{
  //       chainId: '0xa869',
  //       chainName: 'Fuji Testnet',
  //       nativeCurrency: {
  //         name: 'AVAX',
  //         symbol: 'AVAX',
  //         decimals: 18,
  //       },
  //       rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
  //       blockExplorerUrls: ['https://cchain.explorer.avax-test.network/'],
  //     }],
  //   });
  };

  const loadWeb3Provider = async () => {
    setLoading(true);
    const provider = await detectEthereumProvider();
    if (provider) {
      try {
        await provider.enable();
        const web3Loadie = new Web3(provider);
        setWeb3(web3Loadie);
      } catch (err) {
        message.error(err);
      }
      loadPubKeyData(provider);
    } else if (!web3 && !provider) {
      setLoading(false);
      setError('404W');
    } else {
      setLoading(false);
      setError('404W');
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

  const errorData = errorMessages.find((item) => item.code === error) || {};
  const options = errorData.hrefs && errorData.hrefs.map((item) => (
    <a target="_blank" href={item.url} rel="noreferrer">
      <Button type="ghost">{item.title}</Button>
    </a>
  ));

  return (
    <div>
      <Button ghost onClick={handleToggleDrawer}>Conecta Tu Wallet</Button>
      <Drawer
        title="My Wallet"
        visible={open}
        placement="right"
        closable
        onClose={handleToggleDrawer}
        width={400}
      >
        <Title level={4}>Elige tu Wallet dentro de Metamask</Title>
        {
          !loading && !error && (
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              size="large"
              shape="round"
              onClick={loadWeb3Provider}
            >
              METAMASK
            </Button>
          )
        }
        {
          loading && (
            <Spin size="large" tip="Loading..." />
          )
        }
        {
          !loading && error && (
            <Result
              status={errorData.status}
              title={errorData.title}
              subTitle={errorData.description}
              extra={options}
            />
          )
        }
      </Drawer>
    </div>
  );
}
