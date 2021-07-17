import React from 'react';
import PropTypes from 'prop-types';
import styles from './Aside.module.scss';

export default function Aside({ children }) {
  return (
    <div className={styles.Aside}>
      {children}
    </div>
  );
}

Aside.propTypes = {
  children: PropTypes.node.isRequired,
};
