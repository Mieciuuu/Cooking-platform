import React, { useState, useEffect } from 'react';
import RecipePage from './RecipePage';
import './RecipeSearchPage.css';

/**
 * RecipeSearchPage component allows users to search for recipes by name and view
 * details of selected recipes.
 * 
 * @param {object} props - The props object containing loggedIn and userId.
 * @returns {JSX.Element} JSX representation of the RecipeSearchPage component.
 */
const RecipeSearchPage = ({ loggedIn, userId }) => {
  // State variables to store search query, recipes, filtered recipes, and selected recipe id
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);

  /**
   * useEffect hook to fetch recipes from the server when the component mounts.
   */
  useEffect(() => {
    /**
     * Fetch recipes from the server.
     */
    const fetchRecipes = async () => {
      try {
        const response = await fetch('https://ztiback.test.azuremicroservices.io/spring-app-20240503182447/default/recipes');
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

  /**
   * useEffect hook to filter recipes based on search query when searchQuery or recipes change.
   */
  useEffect(() => {
    const updatedFilteredRecipes = recipes.filter(recipe =>
      recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredRecipes(updatedFilteredRecipes);
  }, [searchQuery, recipes]);

  /**
   * Event handler function to handle changes in the search input value.
   * @param {Event} event - The event object representing the change event.
   */
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  /**
   * Function to set the selected recipe id and navigate to the RecipePage component.
   * @param {number} recipeId - The id of the selected recipe.
   */
  const goChosenRecipe = (recipeId) => {
    setSelectedRecipeId(recipeId);
  };

  /**
   * Event handler function to handle the back button click and navigate back to the search view.
   */
  const handleBackButtonClick = () => {
    setSelectedRecipeId(null);
  };

  return (
    <div>
      {/* Render search input and filtered recipes if no recipe is selected */}
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
      {/* Render RecipePage component if a recipe is selected */}
      {selectedRecipeId && <RecipePage recipeId={selectedRecipeId} onBackButtonClick={handleBackButtonClick} loggedIn={loggedIn} userId={userId} />}
    </div>
  );
};

export default RecipeSearchPage;
