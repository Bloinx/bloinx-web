/* eslint-disable no-undef */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import { Typography } from "antd";

import styles from "./styles.module.scss";

const { Text } = Typography;

function InputTextField({ label, name, value, onChange, placeholder, error }) {
  return (
    <div className={styles.TextField}>
      <Text className={styles.TextFieldLabel}>{label}</Text>
      <input
        id={name}
        key={name}
        className={styles.TextFieldInput}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
      />
      {error && <span className={styles.TextFieldError}>{error}</span>}
    </div>
  );
}

InputTextField.defaultProps = {
  placeholder: "",
  label: "",
  value: "",
  error: null,
  onChange: () => {},
};

InputTextField.propTypes = {
  placeholder: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  error: PropTypes.string,
};

export default React.memo(InputTextField);
