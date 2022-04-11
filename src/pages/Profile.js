import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import BottomMenu from '../components/BottomMenu';
import HeaderPage from '../components/Header';

function Profile({ history: { push } }) {
  const [email, setEmail] = useState('');
  useEffect(() => {
    const localStorageUser = localStorage.getItem('user');
    setEmail(JSON.parse(localStorageUser).email);
  }, []);
  return (
    <div className="food-container">
      <HeaderPage
        title="Profile"
        showSearch={ false }
      />
      <p data-testid="profile-email">{ email }</p>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => push('/done-recipes') }
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => push('/favorite-recipes') }
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ () => {
          localStorage.clear();
          push('/');
        } }
      >
        Logout
      </button>
      <BottomMenu />
    </div>

  );
}

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Profile;
