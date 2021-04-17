import React from 'react';
import Identicon from 'identicon.js';

const Avatar = ({ userAddress }) => (
  <>
    <img
      className="mx-2 rounded-avatar"
      width="38"
      height="38"
      src={`data:image/png;base64,${new Identicon(userAddress, 30).toString()}`}
      alt="avatar"
    />
  </>
);

export default Avatar;
