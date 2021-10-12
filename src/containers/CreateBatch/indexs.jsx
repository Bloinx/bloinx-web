import React, { useState } from "react";
import { Row, Col } from "antd";
import { FormattedMessage } from "react-intl";

import Stepper from "../../components/Stepper";

import GeneralData from "./GeneralData";
import Configuration from "./Configuration";
import Summary from "./Summary";
import Invitation from "./Invitation";

export default function CreateBatch() {
  const [currentStep, setStep] = useState(0);
  const [data, setData] = useState({
    name: null,
    startDate: new Date(),
    isPrivate: false,
    longevity: "Semanal",
    participant: 3,
    amount: 0,
    adminposition: "",
  });

  const handleChange = ({ target: { value, name } }) => {
    setData({ ...data, [name]: value });
  };

  const handleNextStep = () => setStep(currentStep + 1);
  const handleBackStep = () => setStep(currentStep - 1);

  const screens = [GeneralData, Configuration, Summary, Invitation];
  const CurrentScreen = screens[currentStep];

  return (
    <Row>
      <Col span={8}>
        <Stepper
          current={currentStep}
          steps={[
            {
              title: <FormattedMessage id="createBatch.stepper.step1" />,
            },
            {
              title: <FormattedMessage id="createBatch.stepper.step2" />,
            },
            {
              title: <FormattedMessage id="createBatch.stepper.step3" />,
            },
          ]}
        />
      </Col>
      <Col span={16}>
        <CurrentScreen
          formData={data}
          onChangeValue={handleChange}
          onSuccess={handleNextStep}
          onBack={handleBackStep}
        />
      </Col>
    </Row>
  );
}
