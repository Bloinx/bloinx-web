/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";


import styles from "./styles.module.scss";

function InputCheck({ name, onChange, error, checked, label }) {
  return (
    <div className={styles.InputCheck}>
      <input
        type="checkbox"
        name={name}
        onChange={onChange}
        error={error}
        checked={checked}
      />
      <span>{label}</span>
    </div>
  );
}

InputCheck.defaultProps = {
  name: null,
  onChange: null,
  error: null,
  checked: null,
  label: null,
};

InputCheck.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  checked: PropTypes.bool,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

export default React.memo(InputCheck);
