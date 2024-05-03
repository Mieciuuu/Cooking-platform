import React, { useState, useEffect } from 'react';
import RecipePage from './RecipePage';
import './RecipeSearchPage.css';

const RecipeSearchPage = ({ loggedIn, userId }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('http://localhost:8080/recipes');
        if (!response.ok) {
          throw new Error('Failed to fetch recipes');
        }
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };
    fetchRecipes();
  }, []);

  useEffect(() => {
    const updatedFilteredRecipes = recipes.filter(recipe =>
      recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredRecipes(updatedFilteredRecipes);
  }, [searchQuery, recipes]);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const goChosenRecipe = (recipeId) => {
    setSelectedRecipeId(recipeId);
  };

  const handleBackButtonClick = () => {
    setSelectedRecipeId(null);
  };

  return (
    <div>
      {!selectedRecipeId && (
        <>
          <h2>Wyszukaj przepisy</h2>
          <input
            type="text"
            placeholder="Spaghetti..."
            value={searchQuery}
            onChange={handleSearchInputChange}
            id='searchInput'
          />
          <div>
            {filteredRecipes.map(recipe => (
              <div key={recipe.id} onClick={() => goChosenRecipe(recipe.id)} className='recipeDiv'>
                <p>{recipe.name}</p>
              </div>
            ))}
          </div>
        </>
      )}
      {selectedRecipeId && <RecipePage recipeId={selectedRecipeId} onBackButtonClick={handleBackButtonClick} loggedIn={loggedIn} userId={userId} />}
    </div>
  );
};

export default RecipeSearchPage;
