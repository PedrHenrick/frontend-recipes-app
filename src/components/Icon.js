import React from 'react';
import PropTypes from 'prop-types';
import sprite from '../assets/icons/sprite.svg';

function Icon({ iconClass, iconName }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className={ iconClass }
    >
      <use xlinkHref={ `${sprite}#icon-${iconName}` } />
    </svg>
  );
}

Icon.defaultProps = {
  iconClass: '',
};

Icon.propTypes = {
  iconClass: PropTypes.string,
  iconName: PropTypes.string.isRequired,
};

export default Icon;
