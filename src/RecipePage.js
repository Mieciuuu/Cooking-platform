import React, { useState, useEffect } from 'react';
import './RecipePage.css';

const RecipePage = ({ recipeId, onBackButtonClick }) => {
  const [recipe, setRecipe] = useState(null);
  
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`http://localhost:8080/recipes/${recipeId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch recipe');
        }
        // console.log(response);
        const recipeData = await response.json();
        console.log(recipeData);
        setRecipe(recipeData);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  return (
    <div id='Recipe'>
      {recipe && (
        <>
        <tbody id='recipeClass'>
          <tr><td className='recipeViewSegment'>Nazwa:</td><td className='recipeViewSegment'>{recipe.a.name}</td></tr>
          <tr><td className='recipeViewSegment'>Składniki:</td><td className='recipeViewSegment'>{recipe.a.ingredients}</td></tr>
          <tr><td className='recipeViewSegment'>Instrukcje:</td><td className='recipeViewSegment'>{recipe.a.instructions}</td></tr>
          <tr><td className='recipeViewSegment'>Autor:</td><td className='recipeViewSegment'>{recipe.b}</td></tr>
        </tbody>
        <button onClick={onBackButtonClick}>Powrót do wyszukiwania</button>
        </>
      )}
    </div>
  );
};

export default RecipePage;
