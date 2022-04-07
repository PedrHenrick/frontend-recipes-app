import React from 'react';
import PropTypes from 'prop-types';
import BottomMenu from '../components/BottomMenu';
import HeaderPage from '../components/Header';

function Explore(props) {
  const { history: { push } } = props;
  return (
    <div>
      <HeaderPage
        title="Explore"
        showSearch={ false }
      />
      <button
        type="button"
        data-testid="explore-foods"
        onClick={ () => push('/explore/foods') }
      >
        Explore Foods
      </button>

      <button
        type="button"
        data-testid="explore-drinks"
        onClick={ () => push('/explore/drinks') }
      >
        Explore Drinks
      </button>
      <BottomMenu />
    </div>
  );
}

Explore.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Explore;
