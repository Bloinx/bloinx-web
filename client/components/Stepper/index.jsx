import { Steps } from 'antd';
import PropTypes from 'prop-types';

const { Step } = Steps;

export default function Stepper({ steps, current }) {
  return (
    <Steps direction="vertical" current={current}>
      {steps.map((item) => <Step key={`step-${item.title}`} title={item.title} />)}
    </Steps>
  );
}

Stepper.defaultProps = {
  steps: [],
  current: 0,
};

Stepper.propTypes = {
  steps: PropTypes.shape({
    title: PropTypes.string,
  }),
  current: PropTypes.number,
};
