import React from 'react';
import PropTypes from 'prop-types';

function Radio(props) {
  const { inputId,
    inputLabel,
    inputName,
    inputClass,
    dataTestid,
    changed,
    radioValue } = props;
  return (
    <div className="radio__group">
      <input
        type="radio"
        id={ inputId }
        name={ inputName }
        data-testid={ dataTestid }
        onChange={ changed }
        value={ radioValue }
      />
      <label htmlFor={ inputId } className={ inputClass }>
        {inputLabel}
      </label>

    </div>

  );
}

Radio.defaultProps = {
  inputLabel: '',
  inputClass: '',
  dataTestid: '',
  radioValue: '',
  changed: () => '',
};

Radio.propTypes = {
  inputId: PropTypes.string.isRequired,
  inputClass: PropTypes.string,
  inputLabel: PropTypes.string,
  inputName: PropTypes.string.isRequired,
  dataTestid: PropTypes.string,
  changed: PropTypes.func,
  radioValue: PropTypes.string,
};

export default Radio;
