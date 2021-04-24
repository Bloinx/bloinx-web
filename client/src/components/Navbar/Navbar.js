import React, { useState } from 'react';
import { AppBar, Grid, Toolbar } from '@material-ui/core';

// import NavLink from '../NavLink/NavLink';
import styles from './styles.module.scss';
import Wallets from '../Wallets/Wallets';

import Avatar from './Avatar';
// import BloinxLogo from '../icons/BloinxFinal.svg';

// eslint-disable-next-line no-unused-vars
export function Navbar({ accountie }, props) {
  const [account, setAccount] = useState('');
  const [walletParsed, setWalletParsed] = useState('');

  const handleAddress = (publicAddress) => {
    const walletParsedConstruction = publicAddress ? `${publicAddress.substring(0, 2) + publicAddress.substring(2, 6).toUpperCase()}...${publicAddress.slice(-5, -1).toUpperCase()}` : '';
    setAccount(publicAddress);
    setWalletParsed(walletParsedConstruction);
  };
  // const handleProvider = (provider) => {
  //   if (provider) props.provider(provider);
  // };
  return (
    <AppBar position="fixed" className={styles.appBar}>
      <div>
        <div>
          <Toolbar className={styles.toolbar}>
            <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="center"
            >
              {
                account && account.startsWith('0x') ? (
                  <Grid container justify="space-evenly" alignItems="center" spacing={3} xs={12} md={3} className={styles.navLink}>
                    {/* <NavLink
                      href="/"
                      color="primary"
                      name="account"
                      hover="primary"
                    /> */}
                    <span className="font-weight-bolder text-white mr-2" styles={{ margin: '0 auto' }}>
                      <small>
                        {walletParsed}
                      </small>
                    </span>
                    <Avatar userAddress={account} />
                  </Grid>
                ) : (
                  <Grid item xs={12} md={3} className={styles.navLink}>
                    <Wallets
                      getAddress={handleAddress}
                    />
                  </Grid>
                )
              }
            </Grid>
          </Toolbar>
        </div>
      </div>
    </AppBar>
  );
}

export default Navbar;
