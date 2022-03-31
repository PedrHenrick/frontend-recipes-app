import React from 'react';

function FoodsDescription() {
  // useEffect(() => {
  //   const requestAPI = async () => {
  //     const data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${}`);
  //     const response = data.json();
  //     console.log(response);
  //   };
  //   requestAPI();
  // });
  return (
    <main>
      <img
        data-testid="recipe-photo"
        src=""
        alt=""
      />

      <h1
        data-testid="recipeTitle"
      >
        Title Item
      </h1>

      <button
        data-testid="share-btn"
        type="button"
      >
        share
      </button>

      <button
        data-testid="favorite-btn"
        type="button"
      >
        favorite
      </button>

      <h2
        data-testid="recipe-category"
      >
        title category
      </h2>

      {/* <ul>
        ingredients.map((ingredient, index) => (
        <li
          key={ index }
          data-testid='${index}-ingredient-name-and-measure'
        >
          { ingredient }
        </li>
        ))
      </ul> */}

      <p
        data-testid="instructions"
      >
        instructions
      </p>

      <video
        width="300px"
        height="200px"
      >
        <source src="" type="video/mp4" />
        <track kind="captions" />
      </video>

      {/* { name === 'foods'
        ? 'lalaland'
        : null } */}

      {/* <ul>
      cardsOfRecomendation.map((recomendation, index) => (
        <li
          key={ index }
          data-testid="${index}-recomendation-card"
        >
          { recomendation }
        </li>
      </ul> */}

      <button
        type="button"
        data-testid="start-recipe-btn"
      >
        Fazer
      </button>
    </main>
  );
}

export default FoodsDescription;
