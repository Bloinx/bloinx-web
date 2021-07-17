import React from 'react';

import styles from './styles.module.scss';
import Wallets from '../Wallets/Wallets';

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <Wallets />
    </div>
  );
}
