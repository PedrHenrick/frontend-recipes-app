import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

import '../styles/bottomMenu.css';

function BottomMenu({ history: { push } }) {
  return (
    <footer className="footerMenu" data-testid="footer">
      <button
        type="button"
        onClick={ () => push('/drinks') }
      >
        <img
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="drinkIcon"
        />
      </button>
      <button
        type="button"
        onClick={ () => push('/explore') }
      >
        <img
          data-testid="explore-bottom-btn"
          src={ exploreIcon }
          alt="exploreIcon"
        />
      </button>
      <button
        type="button"
        onClick={ () => push('/foods') }
      >
        <img
          data-testid="food-bottom-btn"
          src={ mealIcon }
          alt="mealIcon"
        />
      </button>
    </footer>
  );
}

export default withRouter(BottomMenu);

BottomMenu.defaultProps = {
  history: {},
};

BottomMenu.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
};
