import './RecipeSearchPage.css';

import React, { useState } from 'react';

const RecipeSearchPage = () => {
  // State to hold the search query
  const [searchQuery, setSearchQuery] = useState('');
  
  // State to hold the list of recipes (dummy data for demonstration)
  const [recipes, setRecipes] = useState([
    { id: 1, name: 'Pasta Carbonara', ingredients: ['pasta', 'eggs', 'bacon', 'cheese'] },
    { id: 2, name: 'Chicken Curry', ingredients: ['chicken', 'curry paste', 'coconut milk', 'vegetables'] },
    // Add more dummy recipes as needed
  ]);

  // Function to handle search input change
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to filter recipes based on search query
  const filteredRecipes = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="RecipeSearchPage">
      <h2>Search Recipes</h2>
      {/* Search input field */}
      <input
        type="text"
        placeholder="Search recipes..."
        value={searchQuery}
        onChange={handleSearchInputChange}
      />
      {/* Display filtered recipes */}
      <div className="recipes-list">
        {filteredRecipes.map(recipe => (
          <div key={recipe.id} className="recipe">
            <a href={`/recipe/${recipe.id}`}>
              <h3>{recipe.name}</h3>
            </a>
            <ul>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeSearchPage;