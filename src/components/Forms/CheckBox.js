import React from 'react';
import PropTypes from 'prop-types';

function CheckBox(props) {
  const { changed, dataTestid, inputClass, inputValue, isChecked } = props;
  return (
    <input
      type="checkbox"
      className={ inputClass }
      data-testid={ dataTestid }
      onChange={ changed }
      value={ inputValue }
      checked={ isChecked }
    />
  );
}

CheckBox.defaultProps = {
  inputClass: '',
  isChecked: false,
  dataTestid: '',
  changed: () => '',
};

CheckBox.propTypes = {
  inputClass: PropTypes.string,
  inputValue: PropTypes.string.isRequired,
  isChecked: PropTypes.bool,
  dataTestid: PropTypes.string,
  changed: PropTypes.func,
};
export default CheckBox;
