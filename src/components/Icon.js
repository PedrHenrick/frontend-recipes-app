import React from 'react';
import PropTypes from 'prop-types';

function Icon({ iconClass, iconSrc }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className={ iconClass }
    >
      <use xlinkHref={ iconSrc } />
    </svg>
  );
}

Icon.defaultProps = {
  iconClass: '',
};

Icon.propTypes = {
  iconClass: PropTypes.string,
  iconSrc: PropTypes.string.isRequired,
};

export default Icon;
