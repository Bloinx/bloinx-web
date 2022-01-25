import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";

import styles from "./styles.module.scss";

export default function InputOptionSelect({
  label,
  value,
  options,
  onChange,
  name,
}) {
  const handleOnClick = (value) => {
    onChange({
      target: {
        value,
        name,
      },
    });
  };

  return (
    <div className={styles.InputOptionSelect}>
      <Typography
        variant="body1"
        component="div"
        className={styles.InputOptionSelectLabel}
      >
        {label}
      </Typography>
      <div className={styles.InputOptionSelectOptions}>
        {options.map((option) => {
          return (
            <button
              key={option.label}
              type="button"
              onClick={() => handleOnClick(option.value)}
              className={classnames(
                styles.InputOptionSelectOptionsButton,
                option.value === value && styles.InputOptionSelectOptionsActive
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
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
