/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import PropTypes from "prop-types";

import Navbar from "../../components/Navbar";
import NavAside from "../../components/NavAside";
import useWindowDimensions from "../../utils/useWindowDimensions";
import styles from "./index.module.scss";



import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import Wallets from '../../components/Wallets';

import icon from '../../assets/bloinxIcon.png';
import { Grid } from '@mui/material';
function Markup({ children }) {
  const { width } = useWindowDimensions();
  const [visible, setVisible] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleDrawer = (status) => {
    if (status) {
      setVisible(!visible);
    } else {
      setVisible(status);
    }
  };

  const handleToggleDrawer = () => {
    if (visible) {
      setVisible(false);
    }
  };
  const handleDrawerOpenToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    // <div className={styles.Markup}>
    //   <Navbar width={width} toggleDrawer={toggleDrawer} visible={visible} />
    //   <NavAside width={width} toggleDrawer={toggleDrawer} visible={visible} />
    //   <div className={styles.MarkupContent} onClick={handleToggleDrawer}>
    //     {children}
    //   </div>
    // </div>
    <>
      <Box sx={{ flexGrow: 1 }}  >
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Grid item xs={6} md={6}>
                  <img src={icon} alt="bloinx-icon" className={styles.NavbarLogo} />
                </Grid>
              <Grid item xs={6} md={6} textAlign={'right'}>
                  <Wallets />
              </Grid>
            </Toolbar>
          </AppBar>
        </Box>
        <div className={styles.MarkupContent} onClick={handleToggleDrawer}>
         {children}
        </div>
    </>

  
  );
}

Markup.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Markup;
