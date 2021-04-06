import React from 'react';
import { AppBar, Grid, Toolbar } from '@material-ui/core';

import NavLink from './NavLink/NavLink';

// import Avatar from './Avatar';
// import BloinxLogo from '../icons/BloinxFinal.svg';

export function Navbar({ account }) {
  return (
    <AppBar>
      <div>
        <div>
          <Toolbar>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item xs={12} md={3}>
                <NavLink
                  href="/"
                  name="Account"
                  color="white"
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
