import React from 'react';

import TextHeading from '../components/TextHeading/TextHeading';
import Card from '../components/Cards/Card';

export function Home({ registerUser, payCashIn, payRound, withdrawRound, withdrawCashIn }) {
  return (
    <div className="px">
      <TextHeading />
      <div className="container">
        <div className="card-deck mb-3 text-center">
          <Card stage="registerStage" action={registerUser} />
          <Card stage="payCashInStage" action={payCashIn} />
          <Card stage="saveAmountStage" action={payRound} />
          <Card stage="withdrawStage" action={withdrawRound} />
          <Card stage="finishedStage" action={withdrawCashIn} />
        </div>
      </div>
    </div>
  )
}

export default Home;