import Identicon from 'identicon.js';

const Avatar = ({ userAddress }) => (
  <>
    <img
      className="mx-2"
      width="30"
      height="30"
      src={`data:image/png;base64,${new Identicon(userAddress, 30).toString()}`}
      alt="avatar"
    />
  </>
);

export default Avatar;
