import { Typography, Switch } from 'antd';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const { Text } = Typography;

export default function InputSwitch({ label, name, checked }) {
  return (
    <div className={styles.InputSwitch}>
      <Text className={styles.Label}>{label}</Text>
      <Switch
        checked={checked}
        name={name}
      />
    </div>
  );
}

InputSwitch.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  checked: PropTypes.bool,
};
