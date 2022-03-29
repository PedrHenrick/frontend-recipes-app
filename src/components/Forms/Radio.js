import React from 'react';
import PropTypes from 'prop-types';

function Radio(props) {
  const { inputId, inputLabel, inputName } = props;
  return (
    <label htmlFor={ inputId }>
      {inputLabel}
      <input
        type="radio"
        id={ inputId }
        name={ inputName }
        data-testid={ dataTestid }
      />

    </label>
  );
}

Radio.defaultProps = {
  inputLabel: '',
};

Radio.propTypes = {
  inputId: PropTypes.string.isRequired,
  inputLabel: PropTypes.string,
  inputName: PropTypes.string.isRequired,
};

export default Radio;
