import React from "react";
import PropTypes from "prop-types";
import { Typography, Radio } from "antd";

import styles from "./styles.module.scss";

const { Text } = Typography;

export default function InputOptionSelect({
  label,
  value,
  options,
  onChange,
  name,
}) {
  return (
    <span className={styles.InputOptionSelect}>
      <Text className={styles.InputOptionSelectLabel}>{label}</Text>
      <Radio.Group
        className={styles.InputCheck}
        options={options}
        onChange={onChange}
        value={value}
        name={name}
        optionType="button"
        buttonStyle="solid"
      />
    </span>
  );
}

InputOptionSelect.defaultProps = {
  label: "",
  value: "",
};

InputOptionSelect.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]),
  options: PropTypes.instanceOf(Array).isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};
