import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Carousel from 'react-elastic-carousel';
import styles from './styles.module.scss';
import './styles.css';

const breakPoints = [
  { width: 1, itemsToShow: 4 },
  { width: 550, itemsToShow: 6, itemsToScroll: 2 },
  { width: 768, itemsToShow: 10 },
  { width: 1200, itemsToShow: 10 },
];

export default function InputTurnSelect({
  label,
  value,
  options,
  onChange,
  name,
}) {
  const handleOnClick = (value) => {
    onChange({
      target: {
        value,
        name,
      },
    });
  };

  return (
    <div className={styles.InputOptionSelect}>
      <Typography
        variant="body1"
        component="div"
        className={styles.InputOptionSelectLabel}
      >
        {label}
      </Typography>

      <div className={styles.InputOptionSelectOptions}>
        <Carousel breakPoints={breakPoints}>
          {options.map((option) => (
            <button
              key={option.label}
              type="button"
              onClick={() => handleOnClick(option.value)}
              className={classnames(
                styles.InputOptionSelectOptionsButton,
                option.value === value && styles.InputOptionSelectOptionsActive
              )}
            >
              {option.label}
            </button>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

InputTurnSelect.defaultProps = {
  label: '',
  value: '',
};

InputTurnSelect.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]),
  options: PropTypes.instanceOf(Array).isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};
