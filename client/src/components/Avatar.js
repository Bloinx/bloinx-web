import React from 'react';
import Identicon from 'identicon.js';

const Avatar = ({userAddress}) => (
  <React.Fragment>
    <img 
      className="mx-2" 
      width="30" 
      height="30" 
      src={`data:image/png;base64,${new Identicon(userAddress, 30).toString()}`} 
      alt='avatar'
    />
  </React.Fragment>
);

export default Avatar;