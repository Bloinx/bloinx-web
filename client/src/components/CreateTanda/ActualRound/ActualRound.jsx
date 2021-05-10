import React, { useState } from 'react';
import GeneralData from '../TandaRisingChilds/GeneralData';
import Configuration from '../TandaRisingChilds/Configuration';
import Summary from '../TandaRisingChilds/Summary';
import Invitation from '../TandaRisingChilds/Invitation';

const ActualRound = (props) => {
  const [currentStep, setStep] = useState(props.step || 1);
  const [data, setData] = useState(
    {
      name: '',
      date: new Date(),
      type: '',
      longevity: 'Semanal',
      participant: 3,
      amount: '',
      adminposition: '',
    },
  );

  const handleChange = (event) => {
    setData({ ...data, [event.name]: event.value });
  };

  const handleStep = (step) => {
    setStep(step);
  };

  return (
    <div className="TandaRising-container">
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
      <Invitation
        currentStep={currentStep}
        handleChange={handleChange}
        data={data}
        stepMove={handleStep}
      />
    </div>
  );
};
export default ActualRound;
