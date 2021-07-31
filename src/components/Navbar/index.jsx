import React from 'react';
import PropTypes from 'prop-types';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';

import styles from './styles.module.scss';
import Wallets from '../Wallets/Wallets';

export default function Navbar({ width, toggleDrawer, visible }) {
  const Icon = visible ? CloseOutlined : MenuOutlined;
  return (
    <div className={styles.navbar}>
      <span>
        {width <= 768 && (
          <Icon
            className={styles.menuIcon}
            onClick={toggleDrawer}
          />
        )}
      </span>
      <Wallets />
    </div>
  );
}

Navbar.propTypes = {
  width: PropTypes.number.isRequired,
  visible: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
};
