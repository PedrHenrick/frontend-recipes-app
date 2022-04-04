import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { getfavorites, removeFavorites } from '../services/localStorage';

function Favorite(/* { history } */) {
  const TIMER_CLOCK = 3000;

  const [favoriteObject, setFavoriteObject] = useState([]);
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    const verifyLocalStorage = () => {
      const favoritesInlocalStorage = getfavorites();
      setFavoriteObject(favoritesInlocalStorage);
    };
    verifyLocalStorage();
  }, []);

  function copyClipboard(pathname) {
    const copyText = `http://localhost:3000${pathname}`;
    navigator.clipboard.writeText(copyText);

    setLinkCopied(true);
    const interval = setInterval(() => {
      setLinkCopied(false);
      clearInterval(interval);
    }, TIMER_CLOCK);
  }

  function setFavorites(id) {
    removeFavorites(id);
  }

  console.log(favoriteObject);
  return (
    <main>
      <Header
        title="Favorite Recipes"
        showSearch={ false }
      />
      <section className="sectionFilter">
        <button
          type="button"
          data-testid="filter-by-all-btn"
        >
          All
        </button>

        <button
          type="button"
          data-testid="filter-by-food-btn"
        >
          Food
        </button>

        <button
          type="button"
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
      </section>
      <section>
        { favoriteObject && favoriteObject.map((favoriteInList, index) => (
          <div key={ index }>
            <Link to={ `/${favoriteInList.type}s/${favoriteInList.id}` }>
              <img
                src={ favoriteInList.image }
                alt={ `Imagem da comida ${favoriteInList.name}` }
                width="150px"
                data-testid={ `${index}-horizontal-image` }
              />
            </Link>

            <p data-testid={ `${index}-horizontal-top-text` }>
              { favoriteInList.type === 'food'
                ? `${favoriteInList.nationality} - ${favoriteInList.category}`
                : favoriteInList.alcoholicOrNot }
            </p>

            <Link to={ `/${favoriteInList.type}s/${favoriteInList.id}` }>
              <h1 data-testid={ `${index}-horizontal-name` }>
                {favoriteInList.name}
              </h1>
            </Link>

            <div className="divButtons">
              <div className="divButtonShare">
                { linkCopied
                  ? <p className="linkMessage">Link copied!</p>
                  : <p className="linkMessage">Copy the link!</p> }
                <button
                  type="button"
                  onClick={ () => (
                    copyClipboard(`/${favoriteInList.type}s/${favoriteInList.id}`)
                  ) }
                >
                  <img
                    src={ shareIcon }
                    alt="icone de compartilhamento"
                    data-testid={ `${index}-horizontal-share-btn` }
                  />
                </button>
              </div>
              <button
                type="button"
                onClick={ () => setFavorites(favoriteInList.id) }
              >
                <img
                  src={ blackHeartIcon }
                  alt="Icone de favorito"
                  data-testid={ `${index}-horizontal-favorite-btn` }
                />
              </button>
            </div>
          </div>
        )) }
      </section>
    </main>
  );
}

export default Favorite;

// Favorite.defaultProps = {
//   history: {},
// };

// Favorite.propTypes = {
//   history: PropTypes.objectOf(PropTypes.any),
// };
