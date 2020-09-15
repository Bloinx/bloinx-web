import React from 'react';

import Avatar from './Avatar';
import BloinxLogo from '../icons/BloinxFinal.svg';

export function Navbar({ account }) {
  return (
    <div className="mb-5 pb-5 py-4 border-bottom shadow">
      <nav className="navbar fixed-top navbar-expand-md navbar-dark bg-dark">
        <a className="navbar-brand" href="/">
          <img src={BloinxLogo} height="50" alt="logo" />
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <span className="font-weight-bolder text-white mr-2">
                <small>
                  {account}
                </small>
              </span>
              {
                account && (
                  <Avatar userAddress={account} />
                )
              }
            </li>

          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;