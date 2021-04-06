import Link from 'next/link';
import PropTypes from 'prop-types';

import useStyles from './styles';

const NavLink = ({
  href, prefetch, name, color, hover, className, style,
}) => {
  const classes = useStyles({ color, hover, className });
  return (
    <Link href={href} prefetch={prefetch}>
      <a className={`${classes.link} ${className}`} style={style}>
        { name }
      </a>
    </Link>
  );
};

NavLink.propTypes = {
  href: PropTypes.string.isRequired,
  prefetch: PropTypes.bool,
  color: PropTypes.oneOf(['primary', 'secondary', 'default']),
  hover: PropTypes.string,
};

NavLink.defaultProps = {
  color: 'default',
  hover: 'default',
  prefetch: true,
};

export default NavLink;
