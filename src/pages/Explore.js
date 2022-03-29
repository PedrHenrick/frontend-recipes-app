import React from 'react';
import PropTypes from 'prop-types';

import HeaderPage from '../components/Header';

function Explore(props) {
  const { location } = props;
  console.log(location);
  return (
    <HeaderPage
      title="Explore"
      showSearch={ false }
    />
  );
}

export default Explore;

Explore.defaultProps = {
  location: {},
};

Explore.propTypes = {
  location: PropTypes.objectOf(PropTypes.any),
};
