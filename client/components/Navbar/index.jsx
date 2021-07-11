import React, { useState } from 'react';
import { Avatar, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';

// import NavLink from '../NavLink/NavLink';
import styles from './styles.module.scss';
import Wallets from '../Wallets/Wallets';

// import Avatar from './Avatar';
// import BloinxLogo from '../icons/BloinxFinal.svg';

// eslint-disable-next-line no-unused-vars
export default function Navbar({ accountie }, props) {
  const [account, setAccount] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [walletParsed, setWalletParsed] = useState('');

  function handleAddress(publicAddress) {
    const walletParsedConstruction = publicAddress
      ? `${
        publicAddress.substring(0, 2)
          + publicAddress.substring(2, 6).toUpperCase()
      }...${publicAddress.slice(-5, -1).toUpperCase()}`
      : '';
    setAccount(publicAddress);
    setWalletParsed(walletParsedConstruction);
  }

  // // const handleProvider = (provider) => {
  // //   if (provider) props.provider(provider);
  // // };

  return (
    <div className={styles.navbar}>
      {account && account.startsWith('0x') ? (
        <>
          <Avatar
            style={{ backgroundColor: '#87d068' }}
            icon={<UserOutlined />}
          />
          <Button ghost>Default Button</Button>
        </>
      ) : (
        <Wallets getAddress={handleAddress} />
      )}
    </div>
    // <AppBar position="fixed" className={styles.appBar}>
    //   <div>
    //     <div>
    //       <Toolbar className={styles.toolbar}>
    //         <Grid
    //           container
    //           direction="row"
    //           justify="flex-end"
    //           alignItems="center"
    //         >
    //           {
    //             account && account.startsWith('0x') ? (
    //               <Grid
    //                 container
    //                 direction="row"
    //                 justify="flex-end"
    //                 alignItems="center"
    //               >
    //                 <Grid item xs={12} md={1} styles={{ margin: '0 auto' }}>
    //                   {/* <NavLink
    //                     href="/"
    //                     color="primary"
    //                     name="account"
    //                     hover="primary"
    //                   /> */}
    //                   <span className="font-weight-bolder text-white mr-2">
    //                     <small>
    //                       {walletParsed}
    //                     </small>
    //                   </span>
    //                 </Grid>
    //                 <Grid item xs={12} md={1} className={styles.navLink} styles={{ margin: '0 auto' }}>
    //                   <Avatar userAddress={account} />
    //                 </Grid>
    //               </Grid>
    //             ) : (
    //               <Grid item xs={12} md={3} className={styles.navLink}>
    //                 <Wallets
    //                   getAddress={handleAddress}
    //                 />
    //               </Grid>
    //             )
    //           }
    //         </Grid>
    //       </Toolbar>
    //     </div>
    //   </div>
    // </AppBar>
  );
}
