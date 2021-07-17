import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

export default function DashboardLayout({ children }) {
  return (
    <div className={styles.DashboardLayout}>
      {children}
    </div>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
