import React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";

import styles from "./styles.module.scss";

function ButtonOnlyOneStep({ type, onClick, disabled, label, loading }) {
  const { t } = useTranslation();
  return (
    <div className={styles.ButtonOnlyOneStep}>
      <Button
        htmltype={type}
        type="primary"
        size="large"
        onClick={onClick}
        disabled={disabled}
      >
        {label || t("commons.buttons.continue")}
      </Button>
    </div>
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
