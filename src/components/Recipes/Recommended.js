import React from 'react';
import PropTypes from 'prop-types';

const NUMBER_RECOMMENDED = 6;

function Recommended(props) {
  const { recommended, type } = props;

  const recipeType = type === 'meals' ? 'Meal' : 'Drink';
  return (
    <div className="recipe-description__recommended">
      <h3 className="recommended__heading">
        Recommended
        {' '}
        {type}
      </h3>
      <ul className="recommended__list">
        { Object.entries(recommended).slice(0, NUMBER_RECOMMENDED)
          .map((recommend, index) => (
            <li
              className="recommended__item"
              key={ index }
              data-testid={ `${index}-recomendation-card` }
            >
              <img
                className="recommended__img"
                src={ recommend[1][`str${recipeType}Thumb`] }
                alt={ `Imagem da receita ${recommend[1][`str${recipeType}`]}` }
              />
              <h3
                className="recommended__name"
                data-testid={ `${index}-recomendation-title` }
              >
                { recommend[1][`str${recipeType}`] }
              </h3>
            </li>
          )) }
      </ul>
    </div>
  );
}

Recommended.propTypes = {
  recommended: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  type: PropTypes.string.isRequired,
};

export default Recommended;
