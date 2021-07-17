import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Radio } from 'antd';

import styles from './styles.module.scss';

const { Text } = Typography;

export default function InputOptionSelect({
  label, value, options, onChange, name,
}) {
  return (
    <span className={styles.InputOptionSelect}>
      <Text className={styles.Label}>{label}</Text>
      <Radio.Group
        options={options}
        onChange={onChange}
        value={value}
        name={name}
        optionType="button"
      />
    </span>
  );
}

InputOptionSelect.defaultProps = {
  label: '',
  value: '',
};

InputOptionSelect.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  options: PropTypes.instanceOf(Array).isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};
