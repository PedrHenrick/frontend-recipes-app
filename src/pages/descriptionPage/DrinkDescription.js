import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

function DrinkDescription({ history }) {
  const id = (Number(history.location.pathname.split('/')[2]));
  useEffect(() => {
    const requestAPI = async () => {
      const data = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const response = data.json();
      console.log(response);
    };
    requestAPI();
  }, [id]);
  return (
    <main>lalaland</main>
  );
}

export default DrinkDescription;

DrinkDescription.defaultProps = {
  history: {},
};

DrinkDescription.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
};
