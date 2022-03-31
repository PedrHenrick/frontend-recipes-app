import React from 'react';
import PropTypes from 'prop-types';

function Input(props) {
  const {
    changed,
    dataTestid,
    inputClass,
    inputId,
    inputLabel,
    inputName,
    inputType,
    inputValue,
  } = props;

  let input;
  if (inputLabel.trim() && inputId.trim()) {
    input = (
      <label htmlFor={ inputId }>
        <input
          type={ inputType }
          className={ inputClass }
          data-testid={ dataTestid }
          name={ inputName }
          id={ inputId }
          onChange={ changed }
          value={ inputValue }
        />
      </label>
    );
  } else {
    input = (
      <input
        type={ inputType }
        className={ inputClass }
        data-testid={ dataTestid }
        onChange={ changed }
        value={ inputValue }
      />
    );
  }
  return input;
}

Input.defaultProps = {
  inputClass: '',
  inputId: '',
  inputLabel: '',
  inputName: '',
  inputType: 'text',
  dataTestid: '',
  changed: () => '',
};
Input.propTypes = {
  inputClass: PropTypes.string,
  inputId: PropTypes.string,
  inputLabel: PropTypes.string,
  inputName: PropTypes.string,
  inputType: PropTypes.string,
  dataTestid: PropTypes.string,
  changed: PropTypes.func,
};

export default Input;
