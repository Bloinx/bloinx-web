import { Typography, Select } from 'antd';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const { Option } = Select;
const { Text } = Typography;

export default function InputSelect({
  label, options = [], value, onChange, name,
}) {
  const handleOnChange = (arg) => onChange({ target: { value: arg, name } });

  return (
    <div className={styles.InputSelect}>
      <Text className={styles.Label}>{label}</Text>
      <Select value={value} onChange={handleOnChange}>
        {
          options.map((item) => (
            <Option value={item.value}>{item.label}</Option>
          ))
        }
      </Select>
    </div>
  );
}

InputSelect.propTypes = {
  options: PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func,
};
