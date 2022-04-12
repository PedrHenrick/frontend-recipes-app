import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '../Forms/Button';
import Icon from '../Icon';

function Done(props) {
  const { doneItem, index } = props;
  const alcoholic = doneItem.alcoholicOrNot?.trim() ? 'alcoholic' : '';

  const copyClipboard = () => {
    const TIMER_CLOCK = 2000;
    const linkMessage = document.body.getElementsByClassName('linkMessage');
    linkMessage[index].innerHTML = 'Link copied!';

    const copyText = window.href.pathname;
    navigator.clipboard.writeText(copyText);

    const interval = setInterval(() => {
      linkMessage[index].innerHTML = null;
      clearInterval(interval);
    }, TIMER_CLOCK);
  };

  return (
    <div className="done-recipe__card">
      <Link to={ `/${doneItem.type}s/${doneItem.id}` } className="done-recipe__link">
        <img
          className="done-recipe__img"
          src={ doneItem.image }
          alt={ `Imagem da comida ${doneItem.name}` }
          data-testid={ `${index}-horizontal-image` }
        />
        <h2
          data-testid={ `${index}-horizontal-name` }
          className="done-recipe__heading"
        >
          {doneItem.name}
        </h2>
      </Link>
      <div className={ `done-recipe__options ${alcoholic}` }>
        <div
          data-testid={ `${index}-horizontal-top-text` }
          className="done-recipe__tag"
        >
          {doneItem.type === 'meal' && (
            <p>
              <span className="done-recipe__tag--nacionality">
                {doneItem.nationality}
              </span>
              <span className="done-recipe__tag--category">
                {doneItem.category}
              </span>
            </p>
          )}

          {doneItem.type === 'drink' && (
            <span className="done-recipe__tag--alcoholic">
              {doneItem.alcoholicOrNot }
            </span>

          )}
        </div>
        <ul className="tag__list">
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
      <div className="done-recipe__date">
        <span>
          <Icon iconClass="done-menu__icon" iconName="calendar" />
          <h3 data-testid={ `${index}-horizontal-done-date` }>
            {doneItem.doneDate}
          </h3>
        </span>
        <Button
          btnClass="done-menu__btn"
          clicked={ copyClipboard }
        >
          <Icon iconClass="done-menu__icon" iconName="share2" />
        </Button>

      </div>
    </div>
  );
}

Done.propTypes = {
  index: PropTypes.number.isRequired,
  doneItem: PropTypes.objectOf(PropTypes.any).isRequired,
};
export default Done;
