import Link from 'next/link';
import PropTypes from 'prop-types';

import useStyles from './styles';

const NavLink = ({
  href, name, color, hover, className, style,
}) => {
  const classes = useStyles({ color, hover, className });
  return (
    <Link href={href}>
      <a className={`${classes.link} ${className}`} style={style}>
        { name }
      </a>
    </Link>
  );
};

NavLink.propTypes = {
  href: PropTypes.string.isRequired,
  hover: PropTypes.string,
};

NavLink.defaultProps = {
  hover: 'default',
};

export default NavLink;
