import React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";

import styles from "./styles.module.scss";

function ButtonOnlyOneStep({ type, onClick, disabled, label, loading }) {
  const { t } = useTranslation();
  return (
    <Button
      htmltype={type}
      size="medium"
      type="primary"
      onClick={onClick}
      disabled={disabled}
      variant="contained"
      sx={{ color: "white" }}
    >
      {label || t("commons.buttons.continue")}
    </Button>
  );
}

ButtonOnlyOneStep.defaultProps = {
  disabled: false,
  loading: false,
  type: "button",
  label: "",
  onClick: () => {},
};

ButtonOnlyOneStep.propTypes = {
  loading: PropTypes.bool,
  type: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  label: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
};

export default ButtonOnlyOneStep;
