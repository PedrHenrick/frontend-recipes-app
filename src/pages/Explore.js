import React from 'react';
import PropTypes from 'prop-types';
import BottomMenu from '../components/BottomMenu';
import HeaderPage from '../components/Header';
import Button from '../components/Forms/Button';

function Explore(props) {
  const { history: { push } } = props;
  return (
    <div>
      <HeaderPage
        title="Explore"
        showSearch={ false }
      />
      <Button
        type="button"
        dataTestid="explore-foods"
        clicked={ () => push('/explore/foods') }
      >
        Explore Foods
      </Button>

      <Button
        dataTestid="explore-drinks"
        clicked={ () => push('/explore/drinks') }
      >
        Explore Drinks
      </Button>
      <BottomMenu />
    </div>
  );
}

/* Login.defaulftProps = {
  history: {},
}; */

Explore.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Explore;
