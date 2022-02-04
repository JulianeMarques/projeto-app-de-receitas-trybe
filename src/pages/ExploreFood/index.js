import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Header, Footer } from '../../components';
import RecipesContext from '../../context/RecipesContext';
import { ExploreFoodContainer, ExploreFoodTitle } from './style';

function ExploreFood({ history }) {
  const [randomFoodID, setRandomFoodID] = useState([]);
  const { setTitle, setBtnSearchIcon } = useContext(RecipesContext);

  useEffect(() => {
    setTitle('Explore Foods');
    setBtnSearchIcon(false);
  }, [setTitle, setBtnSearchIcon]);

  const requestRandomFood = async () => {
    const URL = 'https://www.themealdb.com/api/json/v1/1/random.php';
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  };

  const randomFood = () => {
    history.push(`/foods/${randomFoodID}`);
  };

  useEffect(() => {
    requestRandomFood().then(({ meals }) => setRandomFoodID(meals[0].idMeal));
  }, []);

  return (
    <ExploreFoodContainer>
      <Header />
      <Link to="/explore/foods/ingredients">
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          By Ingredient
        </button>
      </Link>
      <Link to="/explore/foods/nationalities">
        <button
          type="button"
          data-testid="explore-by-nationality"
        >
          By Nationality
        </button>
      </Link>
      <button
        type="button"
        onClick={ randomFood }
        data-testid="explore-surprise"
      >
        Surprise me!
      </button>
      <ExploreFoodTitle>
        Explore Food
      </ExploreFoodTitle>
      <Footer />
    </ExploreFoodContainer>
  );
}

ExploreFood.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ExploreFood;
