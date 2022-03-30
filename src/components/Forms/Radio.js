import React from 'react';
import PropTypes from 'prop-types';

function Radio(props) {
  const { inputId, inputLabel, inputName, dataTestid, changed, radioValue } = props;
  return (
    <label htmlFor={ inputId }>
      {inputLabel}
      <input
        type="radio"
        id={ inputId }
        name={ inputName }
        data-testid={ dataTestid }
        onChange={ changed }
        value={ radioValue }
      />
    </label>
  );
}

Radio.defaultProps = {
  inputLabel: '',
  dataTestid: '',
  radioValue: '',
  changed: () => '',
};

Radio.propTypes = {
  inputId: PropTypes.string.isRequired,
  inputLabel: PropTypes.string,
  inputName: PropTypes.string.isRequired,
  dataTestid: PropTypes.string,
  changed: PropTypes.func,
  radioValue: PropTypes.string,
};

export default Radio;
