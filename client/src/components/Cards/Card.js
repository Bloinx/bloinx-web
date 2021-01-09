import React from 'react';

import text from '../../textContent.json';

export const Card = ({ stageFunction, action }) => {
  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body">
        <h4 className="card-title">{text.cardsStages[stageFunction].stageTitle}</h4>
        <ul className="list-unstyled mt-3 mb-4">
          <li>Ahorra de Forma Segura</li>
        </ul>
        <button
          className="btn btn-lg btn-block btn-outline-primary"
          onClick={(e) => {
            action(e.target.name, 'UserUno')
          }}
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
