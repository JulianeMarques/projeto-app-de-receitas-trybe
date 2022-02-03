import React, { useContext, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import RecipesContext from '../../context/RecipesContext';

function Explore() {
  const { setTitle, setBtnSearchIcon } = useContext(RecipesContext);
  useEffect(() => {
    setTitle('Explore');
    setBtnSearchIcon(false);
  }, [setTitle, setBtnSearchIcon]);

  return (
    <div>
      <Header />
      <button
        id="btn"
        type="button"
        data-testid="explore-food"
      >
        Explore Foods
      </button>
      <button
        id="btn"
        type="button"
        data-testid="explore-drinks"
      >
        Explore Drinks
      </button>
      <Footer />
    </div>
  );
}

export default Explore;
