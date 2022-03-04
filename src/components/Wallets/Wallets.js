import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { WalletOutlined } from "@ant-design/icons";
import detectEthereumProvider from "@metamask/detect-provider";
import { Button, Drawer, Typography, Spin, Result } from "antd";

import Web3, { walletConnect } from "../../api/config.main.web3";
import { getCurrentWallet, getCurrentProvider } from "../../redux/actions/main";

import styles from "./styles.module.scss";

const errorMessages = [
  {
    code: 503,
    status: "warning",
    title: "Servicio no disponible",
    description:
      "Metamask no se encuentra instalado en tu navegador, por favor instalalo desde su pagina oficial.",
    hrefs: [
      {
        url: "https://metamask.io/",
        title: "Ir al sitio",
      },
    ],
  },
  {
    code: 502,
    status: "warning",
    title: "Implementacion erronea",
    description:
      "Metamask no se encuentra instalado en tu navegador, por favor instalalo desde su pagina oficial.",
    hrefs: [
      {
        url: "https://metamask.io/",
        title: "Ir al sitio",
      },
    ],
  },
  {
    code: 500,
    status: "error",
    title: "No se pudo ejecutar",
    description: "",
    hrefs: [],
  },
];

const { Title } = Typography;

function Wallets({ currentAddressWallet, currentProvider }) {
  const [accountData, setAccountData] = useState({
    publicAddress: null,
    originalAdress: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  const handleToggleDrawer = () => setOpen(!open);

  const handleReset = async () => {
    setAccountData({ publicAddress: null, originalAdress: null });
    const { provider } = await walletConnect();
    await provider.disconnect();
    setError(null);
    window.location.reload();
  };

  function getAddress(originalAdress) {
    let publicAddress = "";
    if (originalAdress) {
      const firstPart = `${originalAdress.substring(0, 2)}${originalAdress
        .substring(2, 6)
        .toUpperCase()}`;
      const secondPart = `${originalAdress
        .substring(originalAdress.length - 4, originalAdress.length)
        .toUpperCase()}`;
      publicAddress = `${firstPart}...${secondPart}`;
      currentAddressWallet(originalAdress);
    }
    setAccountData({ publicAddress, originalAdress });
  }

  const loadPubKeyData = async (ethProvider) => {
    await ethProvider.on("accountsChanged", (newAccount) => {
      setLoading(true);
      setTimeout(() => {
        getAddress(newAccount[0]);
        setLoading(false);
      }, 2000);
    });
    await ethProvider.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: "0xA4EC",
          chainName: "Celo",
          nativeCurrency: {
            name: "CELO",
            symbol: "CELO",
            decimals: 18,
          },
          rpcUrls: ["https://forno.celo.org"],
          blockExplorerUrls: ["https://explorer.celo.org"],
        },
      ],
    });
    const accounts = await ethProvider.request({ method: "eth_accounts" });
    getAddress(accounts[0]);
  };

  const loadWeb3Provider = async () => {
    setLoading(true);
    const provider = await detectEthereumProvider();
    currentProvider("Metamask");
    if (provider) {
      try {
        await provider.enable();
        const web3Loadie = Web3().web3Provider;
        if (web3Loadie) {
          loadPubKeyData(provider);
          setLoading(false);
          handleToggleDrawer();
        } else {
          setLoading(false);
          setError(502);
        }
      } catch (err) {
        setLoading(false);
        setError(503);
      }
    } else {
      setLoading(false);
      setError(500);
    }
  };

  const loadWalletConnectProvider = async () => {
    setLoading(true);
    try {
      const { provider } = await walletConnect();
      currentProvider("WalletConnect");
      await provider.on("accountsChanged", (newAccount) => {
        setLoading(true);
        setTimeout(() => {
          getAddress(newAccount[0]);
          setLoading(false);
        }, 2000);
      });
      getAddress(provider.accounts[0]);
      setLoading(false);
      handleToggleDrawer();
    } catch (err) {
      console.log("Error ", err);
      setLoading(false);
      setError(500);
    }
  };

  const errorData = errorMessages.find((item) => item.code === error) || {};
  const options =
    errorData.hrefs &&
    errorData.hrefs.map((item) => (
      <a target="_blank" href={item.url} rel="noreferrer">
        <Button type="ghost">{item.title}</Button>
      </a>
    ));

  return (
    <div>
      {accountData.publicAddress &&
        accountData.publicAddress.startsWith("0x") &&
        !loading && (
          <Button type="primary" shape="round" onClick={handleReset}>
            {accountData.publicAddress}
          </Button>
        )}

      {!accountData.publicAddress && (
        <Button type="primary" shape="round" onClick={handleToggleDrawer}>
          Conecta Tu Wallet
        </Button>
      )}

      {loading && <Spin size="medium" />}

      <Drawer
        title="My Wallet"
        visible={open}
        placement="right"
        closable
        onClose={handleToggleDrawer}
        width={400}
      >
        <div className={styles.Loading}>
          <Title level={5}>Elige tu Wallet dentro de Metamask</Title>
          {!loading && !error && (
            <div>
              <Button
                type="primary"
                icon={<DownloadOutlined />}
                size="large"
                shape="round"
                onClick={loadWeb3Provider}
              >
                METAMASK
              </Button>
              <Button
                type="primary"
                icon={<DownloadOutlined />}
                size="large"
                shape="round"
                onClick={loadWalletConnectProvider}
              >
                Valora
              </Button>
            </div>
          )}
          {loading && <Spin size="large" tip="Loading..." />}
        </div>
        <div className={styles.Loading}>
          <Title level={5}>Elige tu Wallet dentro de Valora</Title>
          {!loading && !error && (
            <Button
              type="primary"
              ghost
              icon={<WalletOutlined />}
              size="large"
              shape="round"
              onClick={loadWalletConnectProvider}
            >
              VALORA
            </Button>
          )}
          {loading && <Spin size="large" tip="Loading..." />}
        </div>
        {!loading && error && (
          <Result
            status={errorData.status}
            title={errorData.title}
            subTitle={errorData.description}
            extra={options}
          />
        )}
      </Drawer>
    </div>
  );
}

Wallets.defaultProps = {
  currentAddressWallet: () => {},
  currentProvider: () => {},
};

Wallets.propTypes = {
  currentAddressWallet: PropTypes.func,
  currentProvider: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  currentAddressWallet: (address) => dispatch(getCurrentWallet(address)),
  currentProvider: (provider) => dispatch(getCurrentProvider(provider)),
});

export default connect(null, mapDispatchToProps)(Wallets);
