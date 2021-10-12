import React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import { FormattedMessage } from "react-intl";

import styles from "./styles.module.scss";

function ButtonOnlyOneStep({ onClick, disabled }) {
  return (
    <div className={styles.ButtonOnlyOneStep}>
      <Button onClick={onClick} disabled={disabled}>
        <FormattedMessage id="commons.buttons.continue" />
      </Button>
    </div>
  );
}

ButtonOnlyOneStep.defaultProps = {
  disabled: false,
};

ButtonOnlyOneStep.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default ButtonOnlyOneStep;
