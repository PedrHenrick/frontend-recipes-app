import React from 'react';
import PropTypes from 'prop-types';

function Button(props) {
  const { btnName, clicked, dataTestid } = props;
  return (
    <button type="button" data-testid={ dataTestid } onClick={ clicked }>
      {btnName}
    </button>
  );
}

Button.defaultProps = {
  clicked: () => '',
  dataTestid: '',
};

Button.propTypes = {
  btnName: PropTypes.string.isRequired,
  clicked: PropTypes.func,
  dataTestid: PropTypes.string,
};

export default Button;
