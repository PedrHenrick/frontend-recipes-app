import React from 'react';
import PropTypes from 'prop-types';

function Button(props) {
  const { btnName, clicked, dataTestid, isDisabled } = props;
  return (
    <button
      type="button"
      data-testid={ dataTestid }
      onClick={ clicked }
      disabled={ isDisabled }
    >
      {btnName}
    </button>
  );
}

Button.defaultProps = {
  clicked: () => '',
  dataTestid: '',
  isDisabled: false,
};

Button.propTypes = {
  btnName: PropTypes.string.isRequired,
  clicked: PropTypes.func,
  dataTestid: PropTypes.string,
  isDisabled: PropTypes.bool,
};

export default Button;
