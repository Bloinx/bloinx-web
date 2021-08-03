/* eslint-disable no-unused-vars */
import React from 'react';
import { Button } from 'antd';
import { Stepper, Step } from 'react-form-stepper';

import styles from './RoundCard.module.scss';

export default function RoundCard() {
  return (
    <div className={styles.RoundCard}>
      <div className={styles.RoundCardHeader}>
        <div className={styles.RoundCardTitle}>My new rosca</div>
        <div className={styles.RoundCardKeys}>123123124dq</div>
      </div>
      <Stepper
        activeStep={0}
        hideConnectors
        styleConfig={{
          activeBgColor: '#F58F98',
          completedBgColor: '#90525A',
          inactiveBgColor: '#C4C4C4',
          circleFontSize: '0px',
          size: '15px',
        }}
      >
        <Step label="1" />
        <Step label="2" />
        <Step label="3" />
        <Step label="4" />
        <Step label="5" />
        {/* <Step label="6" />
        <Step label="7" />
        <Step label="8" /> */}
      </Stepper>
      <div className={styles.RoundCardDescription}>
        asdasdasdasd
      </div>
      <div className={styles.RoundCardFooter}>
        <div className={styles.RoundCardTitleFooter}>Ronda</div>
        <Button className={styles.RoundCardAction} type="primary">Pagar</Button>
      </div>
    </div>
  );
}
