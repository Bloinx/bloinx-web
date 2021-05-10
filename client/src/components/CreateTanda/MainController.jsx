import React from 'react';
import Stepper from './Stepper/Stepper';
import TandaRising from './TandaRising/TandaRising';

export const MainController = () => (
  <div className="createTanda-container">
    <div className="createTanda-header">Crea tu tanda</div>
    <div className="createTanda-TandaANDStepper-container">
      <Stepper />
      <TandaRising />
    </div>
    <div className="createTanda-TandaANDStepper-container">
      <Stepper />
      <TandaRising />
    </div>
  </div>
);
export default MainController;
