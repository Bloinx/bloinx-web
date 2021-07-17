import React from 'react';
import { InputNumber, Typography } from 'antd';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const { Text } = Typography;

export default function InputAmount({
  label, value, currency, onChange, name,
}) {
  const handleOnChange = (arg) => onChange({ target: { value: arg, name } });

  return (
    <div className={styles.container}>
      <Text className={styles.Label}>{label}</Text>
      <div className={styles.amountContainer}>
        <Text>$</Text>
        <InputNumber
          value={value}
          // formatter={value => `$ ${value} ${currency}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          // parser={value => value.replace(/\$\sA-Za-z?|(,*)/g, '')}
          name={name}
          onChange={handleOnChange}
          className={styles.amount}
        />
        <Text>{currency}</Text>
      </div>
    </div>
  );
}

InputAmount.defaultProps = {
  currency: '',
};

InputAmount.propTypes = {
  currency: PropTypes.string,
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};
