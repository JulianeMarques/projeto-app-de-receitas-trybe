import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import StartRecipeButton from './style';

function RecipeButton({ type, id }) {
  const [inProgress, setInProgress] = useState(false);
  const [inProgressFoodRecipeLoad, setInProgressFoodRecipeLoad] = useState(false);
  const [inProgressDrinkRecipeLoad, setInProgressDrinkRecipeLoad] = useState(false);
  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (storage && type === 'foods') {
      const findFoodnOnStorage = Object.keys(storage.meals)
        .find((foodStoreKey) => foodStoreKey === id);
      return findFoodnOnStorage ? setInProgress(true) : setInProgress(false);
    }
    if (storage && type === 'drinks') {
      const findDrinkOnStorage = Object.keys(storage.cocktails)
        .find((drinkStoreKey) => drinkStoreKey === id);
      return findDrinkOnStorage ? setInProgress(true) : setInProgress(false);
    }
  }, [id, type]);

  const handleClick = () => {
    if (type === 'foods') setInProgressFoodRecipeLoad(true);
    if (type === 'drinks') setInProgressDrinkRecipeLoad(true);
  };

  return (
    <>
      <StartRecipeButton
        type="button"
        data-testid="start-recipe-btn"
        onClick={ handleClick }
      >
        {inProgress ? 'Continue Recipe' : 'Start Recipe'}
      </StartRecipeButton>
      {inProgressFoodRecipeLoad && <Redirect to={ `/foods/${id}/in-progress` } />}
      {inProgressDrinkRecipeLoad && <Redirect to={ `/drinks/${id}/in-progress` } />}
    </>
  );
}

RecipeButton.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default RecipeButton;
