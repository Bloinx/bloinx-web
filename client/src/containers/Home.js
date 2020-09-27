import React from 'react';

import TextHeading from '../components/TextHeading/TextHeading';
import Card from '../components/Cards/Card';

export function Home({ registerUser, payTurn, withdrawRound, withdrawCashIn, stage, admin, account }) {
  return (
    <div className="px">
      <TextHeading />
      <div className="container">
        <div className="card-deck mb-3 text-center">
          {
            stage === '0' && (
              <Card stageFunction="registerStage" action={registerUser} />
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
            (stage === '2' && admin === account) && (
              <Card stageFunction="finishedStage" action={withdrawCashIn} />
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Home;
