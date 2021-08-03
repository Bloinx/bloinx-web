import React from 'react';
import { Button, Typography } from 'antd';

import styles from './RoundCardNew.module.scss';

const { Title, Paragraph } = Typography;

export default function RoundCardNew() {
  return (
    <div className={styles.RoundCardNew}>
      <Title level={4} className={styles.RoundCardNewTitle}>Add new rosca</Title>
      <Paragraph className={styles.RoundCardNewText}>
        Start your saving circle with your friends or family now.
      </Paragraph>
      <Paragraph className={styles.RoundCardNewText}>
        Start connecting your wallet.
      </Paragraph>
      <div className={styles.RoundCardNewOptions}>
        <Button type="primary">
          Unirme a la ronda
        </Button>
      </div>
    </div>
  );
}
