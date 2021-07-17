import Link from 'next/link';
import PropTypes from 'prop-types';

export default function NavLink({
  href, name,
}) {
  return (
    <Link href={href}>
      {/* <a className={`${classes.link} ${className}`} style={style}> */}
      { name }
      {/* </a> */}
    </Link>
  );
}

NavLink.propTypes = {
  href: PropTypes.string.isRequired,
  name: PropTypes.string,
};
