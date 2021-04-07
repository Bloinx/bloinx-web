import React from 'react';
import { AppBar, Grid, Toolbar } from '@material-ui/core';

import NavLink from '../NavLink/NavLink';
import styles from './styles.module.scss';

// import Avatar from './Avatar';
// import BloinxLogo from '../icons/BloinxFinal.svg';

export function Navbar({ account }) {
  return (
    <AppBar position="fixed" className={styles.appBar}>
      <div>
        <div>
          <Toolbar className={styles.toolbar}>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item xs={12} md={3} className={styles.navLink}>
                <NavLink
                  href="/"
                  name="Account"
                  color="primary"
                  hover="primary"
                />
                { account }
              </Grid>
            </Grid>
          </Toolbar>
        </div>
      </div>
    </AppBar>
  );
}

export default Navbar;
