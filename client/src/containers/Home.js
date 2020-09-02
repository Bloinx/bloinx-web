import React from 'react';

import TextHeading from '../components/TextHeading/TextHeading';
import Card from '../components/Cards/Card';

export function Home({ registerUser, payCashIn, payRound, withdrawRound, withdrawCashIn, stage, admin, account }) {
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
            stage === '0' && (
              <Card stageFunction="payCashInStage" action={payCashIn} />
            )
          }
          {
            stage === '1' && (
              <Card stageFunction="saveAmountStage" action={payRound} />
            )
          }
          {
            stage === '2' && (
              <Card stageFunction="withdrawStage" action={withdrawRound} />
            )
          }
          {
            admin === account && (
              <Card stageFunction="finishedStage" action={withdrawCashIn} />
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Home;
