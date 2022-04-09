import React from 'react';
import PropTypes from 'prop-types';

function Instructions(props) {
  const { instructionsStr } = props;

  const steps = instructionsStr.split('. ');
  const renderSteps = (instructions) => {
    if (instructions?.length > 0) {
      return instructions.map((step, index) => (
        <li key={ index } className="instructions__item">
          <h5 className="instructions__heading">{`Step ${index + 1}`}</h5>
          <p className="instructions__text">{step}</p>
        </li>
      ));
    }
  };

  return (
    <ol
      className="instructions__list"
      data-testid="instructions"
    >
      {renderSteps(steps)}
    </ol>
  );
}

Instructions.propTypes = {
  instructionsStr: PropTypes.string.isRequired,
};

export default Instructions;
