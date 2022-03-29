import React from 'react';
import PropTypes from 'prop-types';

function Button(props) {
  const { btnName, clicked } = props;
  return (
    <button type="button" onClick={ clicked }>
      {btnName}
    </button>
  );
}

Button.defaultProps = {
  clicked: () => '',
};

Button.propTypes = {
  btnName: PropTypes.string.isRequired,
  clicked: PropTypes.func,
};

export default Button;
