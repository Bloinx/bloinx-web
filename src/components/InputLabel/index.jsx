import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.module.scss';

export default function InputLabel({ value, label }) {
  return (
    <div className={styles.InputLabel}>
      <div className={styles.InputLabelLabel}>{label}</div>
      <div className={styles.InputLabelValue}>{value}</div>
    </div>
  );
}

InputLabel.defaultProps = {
  value: null,
  label: '',
};

InputLabel.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  label: PropTypes.string,
};
