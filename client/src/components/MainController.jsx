import React from 'react';
import Stepper from './CreateTanda/Stepper/Stepper';
import TandaRising from './CreateTanda/TandaRising/TandaRising';
import RegisterPay from './ActualTanda/RegisterPay';

export const MainController = (props) => {
  const { account } = props;
  return (
    <div className="createTanda-container">
      <div className="createTanda-header">Crea tu tanda</div>
      <div className="createTanda-TandaANDStepper-container">
        <Stepper />
        <TandaRising />
      </div>
      <div className="createTanda-TandaANDStepper-container">
        <RegisterPay account={account} />
      </div>
    </div>
  );
};
export default MainController;
