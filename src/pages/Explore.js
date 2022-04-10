import React from 'react';
import PropTypes from 'prop-types';
import BottomMenu from '../components/BottomMenu';
import HeaderPage from '../components/Header';
import Button from '../components/Forms/Button';
import '../styles/explore.css';

function Explore(props) {
  const { history: { push } } = props;
  return (
    <div className="food-container">
      <HeaderPage
        title="Explore"
        showSearch={ false }
      />
      <div className="explore-container">
        <Button
          btnClass="explore-btn explore--foods"
          type="button"
          dataTestid="explore-recipes"
          clicked={ () => push('/explore/foods') }
        >
          <span>Explore Foods</span>
        </Button>

        <Button
          btnClass="explore-btn explore--drinks"
          dataTestid="explore-recipes"
          clicked={ () => push('/explore/drinks') }
        >
          <span>Explore Drinks</span>
        </Button>
      </div>
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
