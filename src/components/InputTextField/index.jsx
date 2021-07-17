import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Input } from 'antd';

import styles from './styles.module.scss';

const { Text } = Typography;

export default function InputTextField({
  placeholder, label, value, onChange, name,
}) {
  return (
    <>
      <Text className={styles.TextFieldLabel}>{label}</Text>
      <Input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
      />
    </>
  );
}

InputTextField.defaultProps = {
  placeholder: '',
  label: '',
  value: '',
  onChange: () => {},
};

InputTextField.propTypes = {
  placeholder: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};
