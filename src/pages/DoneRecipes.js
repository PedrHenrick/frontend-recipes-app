import React, { useEffect, useState } from 'react';
import Done from '../components/Recipes/Done';
import HeaderPage from '../components/Header';
import { getDoneRecipes } from '../services/localStorage';
import Button from '../components/Forms/Button';

function DoneRecipes() {
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

  const filterFunction = (filter) => {
    setFilterCategory(filter);
  };

  return (
    <main className="food-container done-recipe">
      <HeaderPage
        title="Done Recipes"
        showSearch={ false }
      />
      <section>
        <Button
          btnClass="category__btn"
          dataTestid="filter-by-all-btn"
          clicked={ () => filterFunction('all') }
        >
          All
        </Button>

        <Button
          btnClass="category__btn"
          dataTestid="filter-by-all-btn"
          clicked={ () => filterFunction('food') }
        >
          Food
        </Button>

        <Button
          btnClass="category__btn"
          dataTestid="filter-by-all-btn"
          clicked={ () => filterFunction('drink') }
        >
          Drinks
        </Button>
      </section>

      <div className="recipes done">
        { doneRecipesObject && doneRecipesObject.map((doneItem, index) => (
          <Done key={ index } doneItem={ doneItem } index={ index } />
        ))}
      </div>
    </main>
  );
}

export default DoneRecipes;
