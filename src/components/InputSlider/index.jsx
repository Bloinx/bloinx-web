import PropTypes from 'prop-types';
import { Typography, Slider } from 'antd';

import styles from './styles.module.scss';

const { Text } = Typography;

export default function InputSlider({
  label, value = 0, onChange, min, max, name,
}) {
  const handleOnChange = (arg) => onChange({ target: { value: arg, name } });

  return (
    <div className={styles.InputSlider}>
      <Text className={styles.Label}>{label}</Text>
      <Slider
        onChange={handleOnChange}
        value={value}
        min={min}
        max={max}
      />
    </div>
  );
}

InputSlider.propTypes = {
  label: PropTypes.string,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};
