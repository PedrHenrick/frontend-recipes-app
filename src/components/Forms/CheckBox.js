import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import { addMeasurementConnective } from '../../helpers/helpers';

function CheckBox(props) {
  const { changed,
    dataTestid,
    inputId,
    inputLabel,
    inputClass,
    inputValue,
    measurement,
    isChecked } = props;

  const checkIcon = isChecked ? 'checkmark' : 'add-solid';
  const ingredientClass = isChecked
    ? 'ingredients__check checked' : 'ingredients__check';
  const nameClass = isChecked
    ? 'ingredients__name checked' : 'ingredients__name';
  const notQuantifiable = measurement.toLowerCase() === 'to taste'
  || measurement.toLowerCase() === 'to serve';

  return (
    <div className="input__group">
      <input
        id={ inputId }
        type="checkbox"
        className={ inputClass }
        data-testid={ dataTestid }
        onChange={ changed }
        value={ inputValue }
        checked={ isChecked }
      />
      <label htmlFor={ inputId } className={ ingredientClass }>
        <Icon iconClass="progress-menu__icon--step" iconName={ checkIcon } />
        {!notQuantifiable && <span>{measurement}</span>}
        { addMeasurementConnective(measurement) }
        <span className={ nameClass }>{inputLabel}</span>
        { notQuantifiable && (
          <span>
            {' '}
            {measurement.toLowerCase()}
          </span>
        )}
      </label>

    </div>
  );
}

CheckBox.defaultProps = {
  inputClass: '',
  inputId: '',
  inputLabel: '',
  measurement: '',
  dataTestid: '',
  changed: () => '',
  isChecked: false,
};

CheckBox.propTypes = {
  inputClass: PropTypes.string,
  inputId: PropTypes.string,
  inputLabel: PropTypes.string,
  measurement: PropTypes.string,
  inputValue: PropTypes.string.isRequired,
  dataTestid: PropTypes.string,
  changed: PropTypes.func,
  isChecked: PropTypes.bool,
};
export default CheckBox;
