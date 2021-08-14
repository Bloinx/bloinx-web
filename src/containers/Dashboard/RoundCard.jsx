/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { Stepper, Step } from 'react-form-stepper';
import { Link } from 'react-router-dom';

import styles from './RoundCard.module.scss';

export default function RoundCard({
  contractKey, groupSize, turn, linkTo, toPay, disabled,
}) {
  const handleGetSteps = () => {
    const indents = [];
    for (let i = 1; i <= groupSize; i += 1) {
      indents.push(<Step label={i} />);
    }
    return indents;
  };

  return (
    <div className={styles.RoundCard}>
      <Link to={linkTo}>
        <div className={styles.RoundCardHeader}>
          <div className={styles.RoundCardTitle}>Mi tanda</div>
          <div className={styles.RoundCardKeys}>{contractKey}</div>
        </div>
        <Stepper
          activeStep={turn - 1}
          hideConnectors
          styleConfig={{
            activeBgColor: '#F58F98',
            completedBgColor: '#90525A',
            inactiveBgColor: '#C4C4C4',
            circleFontSize: '0px',
            size: '15px',
          }}
        >
          {handleGetSteps()}
        </Stepper>
        <div className={styles.RoundCardDescription} />
      </Link>
      <div className={styles.RoundCardFooter}>
        <div className={styles.RoundCardTitleFooter}>{`Ronda ${turn}`}</div>
        <Button className={styles.RoundCardAction} type="primary" disabled={disabled} onClick={toPay}>Pagar</Button>
      </div>
    </div>
  );
}

RoundCard.defaultProps = {
  linkTo: '',
  toPay: () => {},
  disabled: false,
};

RoundCard.propTypes = {
  contractKey: PropTypes.string.isRequired,
  groupSize: PropTypes.number.isRequired,
  turn: PropTypes.number.isRequired,
  linkTo: PropTypes.string,
  toPay: PropTypes.func,
  disabled: PropTypes.bool,
};
