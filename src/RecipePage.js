import React, { useState, useEffect } from 'react';
import './RecipePage.css';
import axios from 'axios';

const RecipePage = ({ recipeId, onBackButtonClick, loggedIn, userId }) => {
  const [recipe, setRecipe] = useState(null);
  const [averageRating, setAverageRating] = useState(null);
  const [userRating, setUserRating] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`https://ztiback.test.azuremicroservices.io/spring-app-20240503182447/default/recipes/${recipeId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch recipe');
        }
        const recipeData = await response.json();
        setRecipe(recipeData);
  
        const ratingsResponse = await axios.get(`https://ztiback.test.azuremicroservices.io/spring-app-20240503182447/default/ratings/${recipeId}`);
        if (ratingsResponse.status === 200) {
          setAverageRating(ratingsResponse.data);

          if (loggedIn) {
            const userRatingResponse = await axios.get(`https://ztiback.test.azuremicroservices.io/spring-app-20240503182447/default/ratings/${recipeId}/user/${userId}`);
            if (userRatingResponse.status === 200) {
              setUserRating(userRatingResponse.data.ratingValue);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };
  
    fetchRecipe();
  }, [recipeId, loggedIn, userId]);

  const handleRatingChange = async (e) => {
    const newRating = parseInt(e.target.value);
    setUserRating(newRating);
  
    try {
      const userScore = {
        recipeId: recipeId,
        userId: userId,
        ratingValue: newRating
      };
      const response = await axios.post(`https://ztiback.test.azuremicroservices.io/spring-app-20240503182447/default/addRating`, userScore);
      if (response.status === 200) {
        const updatedRatingsResponse = await axios.get(`https://ztiback.test.azuremicroservices.io/spring-app-20240503182447/default/ratings/${recipeId}`);
        if (updatedRatingsResponse.status === 200) {
          setAverageRating(updatedRatingsResponse.data);
        }
      }
    } catch (error) {
      console.error('Error adding rating:', error);
    }
  };

  return (
    <div id='Recipe'>
      {recipe && (
        <>
          <tbody id='recipeClass'>
            <tr><td className='recipeViewSegment'>Nazwa:</td><td className='recipeViewSegment'>{recipe.a.name}</td></tr>
            <tr><td className='recipeViewSegment'>Składniki:</td><td className='recipeViewSegment'>{recipe.a.ingredients}</td></tr>
            <tr><td className='recipeViewSegment'>Instrukcje:</td><td className='recipeViewSegment'>{recipe.a.instructions}</td></tr>
            <tr><td className='recipeViewSegment'>Autor:</td><td className='recipeViewSegment'>{recipe.b}</td></tr>
            <tr><td className='recipeViewSegment'>Ocena:</td><td className='recipeViewSegment'>{(averageRating !== null && averageRating !== 0) ? averageRating.toFixed(2) + '/5.00' : 'Brak ocen'}</td></tr>
            {loggedIn && userId !== recipe.a.authorId && (
              <tr>
                <td className='recipeViewSegment'>Twoja ocena:</td>
                <td className='recipeViewSegment'>
                  <select value={userRating || ''} onChange={handleRatingChange}>
                    <option value=''>Wybierz ocenę</option>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                  </select>
                </td>
              </tr>
            )}
            {userId === recipe.a.authorId && (
              <tr><td className='recipeViewSegment' id='ownRecipeIndicator'>Twój przepis</td><td/></tr>
            )}
            <tr><td colSpan={2}><button onClick={onBackButtonClick}>Powrót do wyszukiwania</button></td></tr>
          </tbody>
        </>
      )}
    </div>
  );
};

export default RecipePage;
