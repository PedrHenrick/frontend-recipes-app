import React from 'react';
// import tryunfoVideo from './Tryunfo.mp4';

/*
  * A foto deve possuir o atributo `data-testid="recipe-photo"`; ✅
  * O título deve possuir o atributo `data-testid="recipe-title"`; ✅
  * O botão de compartilhar deve possuir o atributo `data-testid="share-btn"`; ✅
  * O botão de favoritar deve possuir o atributo `data-testid="favorite-btn"`; ✅
  * O texto da categoria deve possuir o atributo `data-testid="recipe-category"`; ✅
  * Os ingredientes devem possuir o atributo `data-testid="${index}-ingredient-name-and-measure"`; ✅
  * O texto de instruções deve possuir o atributo `data-testid="instructions"`; ✅
  * O vídeo, presente somente na tela de comidas, deve possuir o atributo `data-testid="video"`; ✅
  * O card de receitas recomendadas deve possuir o atributo `data-testid="${index}-recomendation-card"`; ✅
  * O botão de iniciar receita deve possuir o atributo `data-testid="start-recipe-btn"`; ✅

*/
function FoodsDescription() {
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
