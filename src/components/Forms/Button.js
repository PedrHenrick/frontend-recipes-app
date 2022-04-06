import React from 'react';
import PropTypes from 'prop-types';

function Button(props) {
  const { children, clicked, changed, dataTestid, isDisabled } = props;
  return (
    <button
      type="button"
      data-testid={ dataTestid }
      onClick={ clicked }
      onChange={ changed }
      disabled={ isDisabled }
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  changed: () => '',
  clicked: () => '',
  dataTestid: '',
  isDisabled: false,
};

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]).isRequired,
  changed: PropTypes.func,
  clicked: PropTypes.func,
  dataTestid: PropTypes.string,
  isDisabled: PropTypes.bool,
};

export default Button;
