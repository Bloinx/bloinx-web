import React from 'react';

import Column from './Column';

export const Footer = () => (
  <div className="container">
    <footer className="pt-4 my-md-5 pt-md-5 border-top">
      <div className="row mx-auto">
        <Column>
          <h5>Features</h5>
        </Column>
        <Column>
          <h5> Team </h5>
        </Column>
        <Column>
          <h5> Resources </h5>
        </Column>
      </div>
    </footer>
  </div>
);

export default Footer;