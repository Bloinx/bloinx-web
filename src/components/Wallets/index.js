import React, { useState } from "react";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import detectEthereumProvider from "@metamask/detect-provider";
import { CubeSpinner } from "react-spinners-kit";

import Web3 from "../../config.main.web3";

import styles from "./styles.module.scss";

function Wallets() {
  const [accountData, setAccountData] = useState({
    publicAddress: localStorage.getItem("currentWalletShort") || null,
    originalAddress: localStorage.getItem("currentWallet") || null,
  });
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleToggleDrawer = () => setOpen(!open);

  const handleReset = () => {
    setAccountData({ publicAddress: null, originalAddress: null });
    localStorage.removeItem("currentWalletShort");
    localStorage.removeItem("currentWallet");
  };

  function getAddress(originalAddress) {
    if (originalAddress) {
      const firstPart = `${originalAddress.substring(
        0,
        2
      )}${originalAddress.substring(2, 6)}`;
      const secondPart = `${originalAddress.substring(
        originalAddress.length - 4,
        originalAddress.length
      )}`;
      const publicAddress = `${firstPart}...${secondPart}`;
      localStorage.setItem("currentWallet", originalAddress.toUpperCase());
      localStorage.setItem("currentWalletShort", publicAddress.toUpperCase());
      setAccountData({ publicAddress, originalAddress });
    }
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
          chainId: "0xAEF3",
          chainName: "Alfajores",
          nativeCurrency: {
            name: "CELO",
            symbol: "CELO",
            decimals: 18,
          },
          rpcUrls: ["https://alfajores-forno.celo-testnet.org"],
          blockExplorerUrls: ["https://alfajores-blockscout.celo-testnet.org"],
        },
      ],
    });
    const accounts = await ethProvider.request({ method: "eth_accounts" });
    getAddress(accounts[0]);
  };

  const loadWeb3Provider = async () => {
    setLoading(true);
    const provider = await detectEthereumProvider();
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
        }
      } catch (err) {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  return (
    <>
      {accountData.publicAddress &&
        accountData.publicAddress.startsWith("0X") &&
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
          {!loading && (
            <Button variant="contained" onClick={loadWeb3Provider}>
              METAMASK
            </Button>
          )}
          {loading && <CubeSpinner frontColor="#F58F98" size={30} />}
        </div>
      </Drawer>
    </>
  );
}

export default React.memo(Wallets);
