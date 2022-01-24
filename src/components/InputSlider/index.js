import React from "react";
import PropTypes from "prop-types";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

import styles from "./styles.module.scss";

export default function InputSlider(props) {
  const { label, value = 0, onChange, min, max, name, step } = props;

  return (
    <div className={styles.InputSlider}>
      <Typography className={styles.Label}>{label}</Typography>
      <Slider
        onChange={onChange}
        value={value}
        min={min}
        max={max}
        step={step}
        name={name}
      />
    </div>
  );
}

InputSlider.defaultProps = {
  label: "",
  step: 1,
  onChange: () => {},
};

InputSlider.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  step: PropTypes.number,
};
