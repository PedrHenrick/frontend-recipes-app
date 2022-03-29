import React from 'react';
import PropTypes from 'prop-types';

function Radio(props) {
  const { inputId, inputLabel, inputName, clicked } = props;
  return (
    <label htmlFor={ inputId }>
      {inputLabel}
      <input
        type="radio"
        id={ inputId }
        name={ inputName }
        data-testid={ dataTestid }
        onClick={ clicked }
      />

    </label>
  );
}

Radio.defaultProps = {
  inputLabel: '',
  clicked: () => '',
};

Radio.propTypes = {
  inputId: PropTypes.string.isRequired,
  inputLabel: PropTypes.string,
  inputName: PropTypes.string.isRequired,
  clicked: PropTypes.func,
};

export default Radio;
