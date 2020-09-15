import React from 'react';
import BloinxLogo from '../../icons/BloinxFinal.svg';


import textContent from '../../textContent.json';
import './styles.css';

export const TextHeading = () => (
  <div className="px-3 py-1 pt-md-5 pb-md-2 mx-auto text-center text-heading">
    <h1 className="display-4">
      <img src={BloinxLogo} height="90" width="auto" alt="bloinx" />
    </h1>
    <p className="lead">
      {textContent.description}
    </p>
  </div>
);

export default TextHeading;