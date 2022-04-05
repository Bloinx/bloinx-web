/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import styles from './styles.module.scss';
import Wallets from '../Wallets';

import icon from '../../assets/bloinxIcon.png';
import { Grid } from '@mui/material';

export default function Navbar({ width, toggleDrawer, visible }) {
  // const Icon = visible ? CloseOutlined : MenuOutlined;
  return (
    <Grid container justifyContent={'space-between'}>
      <AppBar position="static">
        <Toolbar>
          <Grid item xs={6} md={6}>
            <img src={icon} alt="bloinx-icon" className={styles.NavbarLogo} />
          </Grid>
          <Grid item xs={6} md={6} textAlign={'right'}>
            <Wallets />
          </Grid>
        </Toolbar>
      </AppBar>
    </Grid>
    // <div className={styles.navbar}>
    //   <div>
    //     {width <= 768 && (
    //       <>
    //         <img src={icon} alt="bloinx-icon" />
    //         <Icon className={styles.menuIcon} onClick={toggleDrawer} />
    //       </>
    //     )}
    //   </div>
    //
    // </div>
  );
}

Navbar.defaultProps = {
  visible: false,
};

Navbar.propTypes = {
  width: PropTypes.number.isRequired,
  visible: PropTypes.bool,
  toggleDrawer: PropTypes.func.isRequired,
};
