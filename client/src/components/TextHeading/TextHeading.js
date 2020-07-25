import React from 'react';

import textContent from '../../textContent.json';
import './styles.css';

export const TextHeading = () => (
  <div className="px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center text-heading">
    <h1 className="display-4">{textContent.titleHeading}</h1>
    <p className="lead">
      {textContent.description}
    </p>
  </div>
);

export default TextHeading;