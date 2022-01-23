import React, { useState } from "react";
import PropTypes from "prop-types";
// import { DownloadOutlined } from "@ant-design/icons";
import detectEthereumProvider from "@metamask/detect-provider";
// import { Button, Drawer, Typography, Spin, Result } from "antd";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import { CubeSpinner } from "react-spinners-kit";

import Web3 from "../../config.main.web3";
// import { getWeb3 } from "../../utils/web3";

import styles from "./styles.module.scss";

// const errorMessages = [
//   {
//     code: 503,
//     status: "warning",
//     title: "Servicio no disponible",
//     description:
//       "Metamask no se encuentra instalado en tu navegador, por favor instalalo desde su pagina oficial.",
//     hrefs: [
//       {
//         url: "https://metamask.io/",
//         title: "Ir al sitio",
//       },
//     ],
//   },
//   {
//     code: 502,
//     status: "warning",
//     title: "Implementacion erronea",
//     description:
//       "Metamask no se encuentra instalado en tu navegador, por favor instalalo desde su pagina oficial.",
//     hrefs: [
//       {
//         url: "https://metamask.io/",
//         title: "Ir al sitio",
//       },
//     ],
//   },
//   {
//     code: 500,
//     status: "error",
//     title: "No se pudo ejecutar",
//     description: "",
//     hrefs: [],
//   },
// ];

// const { Title } = Typography;

function Wallets({ currentAddressWallet }) {
  const [accountData, setAccountData] = useState({
    publicAddress: null,
    originalAdress: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  const handleToggleDrawer = () => setOpen(!open);

  const handleReset = () => {
    //     setAccountData({ publicAddress: null, originalAdress: null });
    //     setError(null);
  };

  //   function getAddress(originalAdress) {
  //     let publicAddress = "";
  //     if (originalAdress) {
  //       const firstPart = `${originalAdress.substring(0, 2)}${originalAdress
  //         .substring(2, 6)
  //         .toUpperCase()}`;
  //       const secondPart = `${originalAdress
  //         .substring(originalAdress.length - 4, originalAdress.length)
  //         .toUpperCase()}`;
  //       publicAddress = `${firstPart}...${secondPart}`;
  //       currentAddressWallet(originalAdress);
  //     }
  //     setAccountData({ publicAddress, originalAdress });
  //   }

  //   const loadPubKeyData = async (ethProvider) => {
  //     await ethProvider.on("accountsChanged", (newAccount) => {
  //       setLoading(true);
  //       setTimeout(() => {
  //         getAddress(newAccount[0]);
  //         setLoading(false);
  //       }, 2000);
  //     });
  //     await ethProvider.request({
  //       method: "wallet_addEthereumChain",
  //       params: [
  //         {
  //           chainId: "0xAEF3",
  //           chainName: "Alfajores",
  //           nativeCurrency: {
  //             name: "CELO",
  //             symbol: "CELO",
  //             decimals: 18,
  //           },
  //           rpcUrls: ["https://alfajores-forno.celo-testnet.org"],
  //           blockExplorerUrls: ["https://alfajores-blockscout.celo-testnet.org"],
  //         },
  //       ],
  //     });
  //     const accounts = await ethProvider.request({ method: "eth_accounts" });
  //     getAddress(accounts[0]);
  //   };

  const loadWeb3Provider = async () => {
    setLoading(true);
    const provider = await detectEthereumProvider();
    if (provider) {
      try {
        await provider.enable();
        const web3Loadie = Web3().web3Provider;
        if (web3Loadie) {
          //           loadPubKeyData(provider);
          //           setLoading(false);
          //           handleToggleDrawer();
        } else {
          //           setLoading(false);
          //           setError(502);
        }
      } catch (err) {
        setLoading(false);
        // setError(503);
      }
    } else {
      setLoading(false);
      // setError(500);
    }
  };

  //   const errorData = errorMessages.find((item) => item.code === error) || {};
  //   const options =
  //     errorData.hrefs &&
  //     errorData.hrefs.map((item) => (
  //       <a target="_blank" href={item.url} rel="noreferrer">
  //         <Button type="ghost">{item.title}</Button>
  //       </a>
  //     ));

  return (
    <div>
      {accountData.publicAddress &&
        accountData.publicAddress.startsWith("0x") &&
        !loading && (
          <Button variant="contained" onClick={handleReset}>
            {accountData.publicAddress}
          </Button>
        )}

      {!accountData.publicAddress && (
        <Button variant="contained" onClick={handleToggleDrawer}>
          Conecta Tu Wallet
        </Button>
      )}

      <Drawer anchor="right" open={open} onClose={handleToggleDrawer}>
        <Typography variant="h6" component="div" gutterBottom>
          Elige tu Wallet
        </Typography>
        <div className={styles.Loading}>
          {!loading && !error && (
            <Button variant="contained" onClick={loadWeb3Provider}>
              METAMASK
            </Button>
          )}
          {loading && <CubeSpinner frontColor="#F58F98" size={30} />}
        </div>
        {/* {!loading && error && (
          <Result
            status={errorData.status}
            title={errorData.title}
            subTitle={errorData.description}
            extra={options}
          />
        )} */}
      </Drawer>

      {/* {/*

      {loading && <Spin size="medium" />} */}
    </div>
  );
}

export default React.memo(Wallets);
