import React from 'react';
import PropTypes from 'prop-types';

const NUMBER_RECOMMENDED = 6;

function Recommended(props) {
  const { recommended } = props;
  return (
    <div className="recipe-description__recommended">
      <h3 className="recommended__heading">Recommended Drinks</h3>
      <ul className="recommended__list">
        { Object.entries(recommended).slice(0, NUMBER_RECOMMENDED)
          .map((recommend, index) => (
            <li
              className="recommended__item"
              key={ recommend[1].idDrink }
              data-testid={ `${index}-recomendation-card` }
            >
              <img
                className="recommended__img"
                src={ recommend[1].strDrinkThumb }
                alt={ `Imagem da comida ${recommend[1].strDrink}` }
              />
              <h3
                className="recommended__name"
                data-testid={ `${index}-recomendation-title` }
              >
                { recommend[1].strDrink }
              </h3>
            </li>
          )) }
      </ul>
    </div>
  );
}

Recommended.propTypes = {
  recommended: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default Recommended;
