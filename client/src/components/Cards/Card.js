import React from 'react';

import text from '../../textContent.json';

export const Card = ({ stage, action }) => {
  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body">
        <h2 className="card-title">{text.cardsStages[stage].stageTitle}</h2>
        <ul className="list-unstyled mt-3 mb-4">
          <li>Ahorra de Forma Segura</li>
          <li>Genera ganancias</li>
          <li>Sistema Seguro</li>
        </ul>
        <button
          className="btn btn-lg btn-block btn-outline-primary"
          onClick={(e) => {
            action(e.target.name, 'UserUno')
          }}
        >
          {text.cardsStages[stage].buttonAction}
        </button>
      </div>
    </div>
  );
};

Card.defaultProps = {
  stage: 'registerStage'
};

export default Card;
