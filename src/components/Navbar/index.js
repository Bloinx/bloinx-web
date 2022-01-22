/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";

import styles from "./styles.module.scss";
import Wallets from "../Wallets/Wallets";

import icon from "../../assets/icon.png";

export default function Navbar({ width, toggleDrawer, visible }) {
  // const Icon = visible ? CloseOutlined : MenuOutlined;
  return (
    <AppBar position="static">
      <Toolbar>
        <img src={icon} alt="bloinx-icon" />
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Wallets />
      </Toolbar>
    </AppBar>
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
