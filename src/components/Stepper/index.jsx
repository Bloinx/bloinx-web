/* eslint-disable no-unused-vars */
import React, { Fragment } from "react";
import { Steps } from "antd";
import PropTypes from "prop-types";
import { EnvironmentOutlined } from "@ant-design/icons";

import styles from "./index.module.scss";

const { Step } = Steps;

export default function Stepper({ steps, current, turnWithDraw }) {
  return (
    <div className={styles.StepperContainer}>
      <div className={styles.StepperIndicators}>
        {steps.map((step, index) => (
          <span>
            <EnvironmentOutlined
              style={{
                fontSize: "20px",
                color: turnWithDraw - 1 !== index ? "transparent" : "#F58F98",
              }}
            />
          </span>
        ))}
      </div>
      <Steps current={current - 1} size="small">
        {steps.map((step) => (
          <Step />
        ))}
      </Steps>
      <div className={styles.StepperTitles}>
        {steps.map((step) => (
          <span>{step.title}</span>
        ))}
      </div>
    </div>
  );
}

Stepper.defaultProps = {
  steps: [],
  current: 0,
  turnWithDraw: 0,
};

Stepper.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.object),
  current: PropTypes.number,
  turnWithDraw: PropTypes.number,
};
