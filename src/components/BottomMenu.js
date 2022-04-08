import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from './Forms/Button';
import Icon from './Icon';
import '../styles/bottomMenu.css';

function BottomMenu({ history: { push } }) {
  return (
    <footer data-testid="footer" className="recipe__footer">
      <Button
        btnClass="menu__btn"
        clicked={ () => push('/drinks') }
      >
        <Icon iconClass="menu__icon" iconName="glass2" />
      </Button>
      <Button
        btnClass="menu__btn"
        clicked={ () => push('/explore') }
      >
        <Icon iconClass="menu__icon" iconName="compass2" />
      </Button>
      <Button
        btnClass="menu__btn"
        clicked={ () => push('/foods') }
      >
        <Icon iconClass="menu__icon" iconName="food" />
      </Button>
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
