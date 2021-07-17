import { Typography, Input } from 'antd';
import { Fragment } from 'react';

import styles from './styles.module.scss';

const { Text } = Typography;

export default function InputTextField({
  placeholder, label, value, onChange, name,
}) {
  return (
    <>
      <Text className={styles.TextFieldLabel}>{label}</Text>
      <Input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
      />
    </>
  );
}
