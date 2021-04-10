import React, { useState } from 'react';
import GeneralData from '../TandaRisingChilds/GeneralData';
import Configuration from '../TandaRisingChilds/Configuration';
import Summary from '../TandaRisingChilds/Summary';

const TandaRising = (props) => {
  const [currentStep, setStep] = useState(props.step || 1);
  const [data, setData] = useState(
    {
      name: '',
      date: new Date(),
      type: '',
      longevity: '',
      participant: undefined,
      amount: undefined,
      adminposition: undefined,
    },
  );

  const handleChange = (event) => {
    setData({ ...data, [event.name]: event.value });
  };

  const handleStep = (step) => {
    setStep(step);
  };

  return (
    <div className="TandaRising-container" xs={12} md={6}>
      <GeneralData
        currentStep={currentStep}
        handleChange={handleChange}
        data={data}
        stepMove={handleStep}
      />
      <Configuration
        currentStep={currentStep}
        periodValue={data.longevity}
        handleChange={handleChange}
        data={data}
        stepMove={handleStep}
      />
      <Summary
        currentStep={currentStep}
        handleChange={handleChange}
        data={data}
        stepMove={handleStep}
      />
    </div>
  );
};
export default TandaRising;
