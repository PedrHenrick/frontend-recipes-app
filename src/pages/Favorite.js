import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { getfavorites, removeFavorites } from '../services/localStorage';

function Favorite() {
  const TIMER_CLOCK = 2000;

  const [favoriteObject, setFavoriteObject] = useState([]);
  const [filterCategory, setFilterCategory] = useState('all');
  const [favorite, setFavorite] = useState(true);

  useEffect(() => {
    const verifyLocalStorage = () => {
      const favoritesInlocalStorage = getfavorites();

      const objectFiltered = favoritesInlocalStorage
        .filter((favoriteInList) => favoriteInList.type === filterCategory);

      if (filterCategory === 'food') setFavoriteObject(objectFiltered);
      else if (filterCategory === 'drink') setFavoriteObject(objectFiltered);
      else setFavoriteObject(favoritesInlocalStorage);
    };
    verifyLocalStorage();
  }, [favorite, filterCategory]);

  function copyClipboard(pathname, index) {
    const linkMessage = document.body.getElementsByClassName('linkMessage');
    linkMessage[index].innerHTML = 'Link copied!';

    const copyText = `http://localhost:3000${pathname}`;
    navigator.clipboard.writeText(copyText);

    const interval = setInterval(() => {
      linkMessage[index].innerHTML = 'Copy the link!';
      clearInterval(interval);
    }, TIMER_CLOCK);
  }

  function setFavorites(id) {
    removeFavorites(id);
    setFavorite(!favorite);
  }

  function filterFunction(filter) {
    setFilterCategory(filter);
  }

  return (
    <main className="mainFavorites">
      <Header
        title="Favorite Recipes"
        showSearch={ false }
      />
      <section className="sectionFilter">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          className="buttonFilter"
          onClick={ () => filterFunction('all') }
        >
          All
        </button>

        <button
          type="button"
          data-testid="filter-by-food-btn"
          className="buttonFilter"
          onClick={ () => filterFunction('food') }
        >
          Food
        </button>

        <button
          type="button"
          data-testid="filter-by-drink-btn"
          className="buttonFilter"
          onClick={ () => filterFunction('drink') }
        >
          Drinks
        </button>
      </section>
      <section className="sectionCards">
        { favoriteObject && favoriteObject.map((favoriteInList, index) => (
          <div className="cardItem" key={ index }>
            <Link to={ `/${favoriteInList.type}s/${favoriteInList.id}` }>
              <img
                src={ favoriteInList.image }
                alt={ `Imagem da comida ${favoriteInList.name}` }
                width="150px"
                data-testid={ `${index}-horizontal-image` }
                className="imageFood"
              />
            </Link>

            <div className="informationCard">
              <p
                data-testid={ `${index}-horizontal-top-text` }
                className="topText"
              >
                { favoriteInList.type === 'food'
                  ? `${favoriteInList.nationality} - ${favoriteInList.category}`
                  : favoriteInList.alcoholicOrNot }
              </p>
              <Link to={ `/${favoriteInList.type}s/${favoriteInList.id}` }>
                <h1
                  data-testid={ `${index}-horizontal-name` }
                  className="title"
                >
                  {favoriteInList.name}
                </h1>
              </Link>

              <div>
                <button
                  type="button"
                  className="buttonIcon"
                  onClick={ () => (
                    copyClipboard(`/${favoriteInList.type}s/${favoriteInList.id}`, index)
                  ) }
                >
                  <img
                    src={ shareIcon }
                    alt="icone de compartilhamento"
                    data-testid={ `${index}-horizontal-share-btn` }
                  />
                </button>
                <button
                  type="button"
                  className="buttonIcon"
                  onClick={ () => setFavorites(favoriteInList.id) }
                >
                  <img
                    src={ blackHeartIcon }
                    alt="Icone de favorito"
                    data-testid={ `${index}-horizontal-favorite-btn` }
                  />
                </button>
              </div>
              <p className="linkMessage">
                Copy the link!
              </p>
            </div>
          </div>
        )) }
      </section>
    </main>
  );
}

export default Favorite;
