import React from "react";
import PropTypes from "prop-types";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";

import styles from "./styles.module.scss";
import Wallets from "../Wallets/Wallets";

import icon from "../../assets/icon.png";

export default function Navbar({ width, toggleDrawer, visible }) {
  const Icon = visible ? CloseOutlined : MenuOutlined;
  return (
    <div className={styles.navbar}>
      <div>
        {width <= 768 && (
          <>
            <img src={icon} alt="bloinx-icon" />
            <Icon className={styles.menuIcon} onClick={toggleDrawer} />
          </>
        )}
      </div>
      <Wallets />
    </div>
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
