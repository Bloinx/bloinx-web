import React from 'react';
import circle3UsersImage from '../../icons/CirculoDAPP_UNICEF-01.svg';


import textContent from '../../textContent.json';
import './styles.css';

export const TextHeading = ({turn}) => (
  <div className="px-3 py-1 pt-md-1 pb-md-1 mx-auto text-center text-heading">
    <h1 className="display-4">
      <img src={circle3UsersImage} height="250" width="auto" alt="bloinx" />
    </h1>
    <p className="lead">
      {textContent.description}
    </p>
    <h5>Turno: {turn} </h5>
  </div>
);

export default TextHeading;
