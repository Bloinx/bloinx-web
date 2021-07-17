import { Typography, Radio } from 'antd';

import styles from './styles.module.scss';

const { Text } = Typography;

export default function InputOptionSelect({
  label, value, options, onChange, name,
}) {
  return (
    <span className={styles.InputOptionSelect}>
      <Text className={styles.Label}>{label}</Text>
      <Radio.Group
        options={options}
        onChange={onChange}
        value={value}
        name={name}
        optionType="button"
      />
    </span>
  );
}
