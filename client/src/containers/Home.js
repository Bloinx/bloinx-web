import React from 'react';

import TextHeading from '../components/TextHeading/TextHeading';
import Card from '../components/Cards/Card';

export function Home({ registerUser, payTurn, withdrawRound, withdrawCashIn, stage, admin, account, turn }) {
  return (
    <div className="px">
      <TextHeading turn={turn}/>
      <div className="container">
        <div className="card-deck mb-3 text-center">
          {
            stage === '0' && (
              <Card stageFunction="registerStage" action={registerUser} />
            )
          }
          {
            stage === '0' && admin == account && (
              <Card stageFunction="startStage" action={startRound} />
            )
          }
          {
            stage === '1' && (
              <Card stageFunction="saveAmountStage" action={payTurn} />
            )
          }
          {
            stage === '1' && (
              <Card stageFunction="withdrawStage" action={withdrawRound} />
            )
          }
          {
            stage === '1' && admin == account &&(
              <Card stageFunction="advanceStage" action={advanceRound} />
            )
          }
          {
            (stage === '2' && admin === account) && (
              <Card stageFunction="withdrawStage" action={withdrawCashIn} />
            )
          }
          {
            (stage === '2' && admin === account) && (
              <Card stageFunction="restartStage" action={restartRound} />
            )
          }
          {
            (stage === '2' && account !== admin) && (
              <h3 className="text-center">Espera a que inicie un nuevo circulo de ahorro</h3>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Home;
