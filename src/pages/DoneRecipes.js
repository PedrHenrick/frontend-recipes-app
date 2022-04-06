import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HeaderPage from '../components/Header';
import { getDoneRecipes } from '../services/localStorage';

import shareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  const TIMER_CLOCK = 2000;

  const [doneRecipesObject, setDoneRecipesObject] = useState([]);
  const [filterCategory, setFilterCategory] = useState('all');

  useEffect(() => {
    const verifyLocalStorage = () => {
      const donRecipesInlocalStorage = getDoneRecipes();

      const objectFiltered = donRecipesInlocalStorage
        .filter((doneRecipesInList) => doneRecipesInList.type === filterCategory);

      if (filterCategory === 'food') setDoneRecipesObject(objectFiltered);
      else if (filterCategory === 'drink') setDoneRecipesObject(objectFiltered);
      else setDoneRecipesObject(donRecipesInlocalStorage);
    };
    verifyLocalStorage();
  }, [filterCategory]);

  function copyClipboard(pathname, index) {
    const linkMessage = document.body.getElementsByClassName('linkMessage');
    linkMessage[index].innerHTML = 'Link copied!';

    const copyText = `http://localhost:3000${pathname}`;
    navigator.clipboard.writeText(copyText);

    const interval = setInterval(() => {
      linkMessage[index].innerHTML = null;
      clearInterval(interval);
    }, TIMER_CLOCK);
  }

  function filterFunction(filter) {
    setFilterCategory(filter);
  }

  return (
    <main>
      <HeaderPage
        title="Done Recipes"
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

      { doneRecipesObject && doneRecipesObject.map((doneItem, index) => (
        <div className="cardItem" key={ index }>
          <Link to={ `/${doneItem.type}s/${doneItem.id}` }>
            <img
              src={ doneItem.image }
              alt={ `Imagem da comida ${doneItem.name}` }
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
              { doneItem.type === 'meal' || doneItem.type === 'food'
                ? `${doneItem.nationality} - ${doneItem.category}`
                : doneItem.alcoholicOrNot }
            </p>

            <button
              type="button"
              className="buttonIcon"
              onClick={ () => (
                copyClipboard(`/${doneItem.type}s/${doneItem.id}`, index)
              ) }
            >
              <img
                src={ shareIcon }
                alt="icone de compartilhamento"
                data-testid={ `${index}-horizontal-share-btn` }
              />
            </button>

            <Link to={ `/${doneItem.type}s/${doneItem.id}` }>
              <h1
                data-testid={ `${index}-horizontal-name` }
                className="title"
              >
                {doneItem.name}
              </h1>
            </Link>

            <p className="linkMessage">
              {null}
            </p>

            <h3 data-testid={ `${index}-horizontal-done-date` }>
              {doneItem.doneDate}
            </h3>

            <ul>
              { doneItem.tags && doneItem.tags.map((tag, indexTag) => (
                <li
                  key={ indexTag }
                  data-testid={ `0-${tag}-horizontal-tag` }
                >
                  { tag }
                </li>
              )) }
            </ul>
          </div>
        </div>
      ))}
    </main>
  );
}

export default DoneRecipes;
