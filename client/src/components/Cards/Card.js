import React, { useState } from 'react';

import text from '../../textContent.json';

export const Card = ({ stageFunction, action, addressOrderList1, addressOrderList2, addressOrderList3}) => {
  const [userTurn, setUserTurn] = useState("1");

  const handleClick = () => {
   action(userTurn)
  }

  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body">
        <h4 className="card-title">{text.cardsStages[stageFunction].stageTitle}</h4>
        <ul className="list-unstyled mt-3 mb-4">
          <li>Trust worthy saving rounds</li>
        </ul>
        {
          stageFunction === "registerStage" && (
            <select className="form-select" onChange={(e) => setUserTurn(e.target.value)}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          )
        }
        {
          stageFunction === "removeStage" && (
            <select className="form-select" onChange={(e) => setUserTurn(e.target.value)}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          )
        }
        {
          stageFunction === "startStage" && (
            <ol>
              <li>{addressOrderList1}</li>
              <li>{addressOrderList2}</li>
              <li>{addressOrderList3}</li>
            </ol>
          )
        }
        <button
          className="btn btn-lg btn-block btn-outline-primary"
          onClick={handleClick}
        >
          {text.cardsStages[stageFunction].buttonAction}
        </button>
      </div>
    </div>
  );
};

Card.defaultProps = {
  stage: 'registerStage'
};

export default Card;
