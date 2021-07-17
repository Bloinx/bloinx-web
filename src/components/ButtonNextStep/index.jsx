import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { FormattedMessage } from 'react-intl';

import styles from './styles.module.scss';

export function ButtonNextStep({ onBack, onClick, disabled }) {
  return (
    <div className={styles.ButtonNextStep}>
      <Button onClick={onBack}>
        <FormattedMessage id="commons.buttons.back" />
      </Button>
      <Button onClick={onClick} disabled={disabled}>
        <FormattedMessage id="commons.buttons.continue" />
      </Button>
    </div>
  );
}

ButtonNextStep.defaultProps = {
  onBack: () => {},
  disabled: false,
};

ButtonNextStep.propTypes = {
  onBack: PropTypes.func,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default ButtonNextStep;
