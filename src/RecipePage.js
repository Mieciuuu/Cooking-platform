import React, { useState, useEffect } from 'react';
import './RecipePage.css';
import axios from 'axios';

/**
 * RecipePage component displays the details of a recipe, including its name, ingredients,
 * instructions, author, average rating, and allows logged-in users to rate the recipe.
 * 
 * @param {object} props - The props object containing recipeId, onBackButtonClick, 
 * loggedIn, and userId.
 * @returns {JSX.Element} JSX representation of the RecipePage component.
 */
const RecipePage = ({ recipeId, onBackButtonClick, loggedIn, userId }) => {
  // State variables to store recipe details, average rating, and user's rating
  const [recipe, setRecipe] = useState(null);
  const [averageRating, setAverageRating] = useState(null);
  const [userRating, setUserRating] = useState(null);

  /**
   * useEffect hook to fetch recipe details and ratings when the component mounts or 
   * when recipeId, loggedIn, or userId changes.
   */
  useEffect(() => {
    /**
     * Fetch recipe details and ratings from the server.
     */
    const fetchRecipe = async () => {
      try {
        // Fetch recipe details
        const response = await fetch(`https://ztiback.test.azuremicroservices.io/spring-app-20240503182447/default/recipes/${recipeId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch recipe');
        }
        const recipeData = await response.json();
        setRecipe(recipeData);
  
        // Fetch average ratings for the recipe
        const ratingsResponse = await axios.get(`https://ztiback.test.azuremicroservices.io/spring-app-20240503182447/default/ratings/${recipeId}`);
        if (ratingsResponse.status === 200) {
          setAverageRating(ratingsResponse.data);

          // Fetch user's rating for the recipe if logged in
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

  /**
   * Event handler function to handle changes in user's rating selection.
   * @param {Event} e - The event object representing the rating change event.
   */
  const handleRatingChange = async (e) => {
    const newRating = parseInt(e.target.value);
    setUserRating(newRating);
  
    try {
      // Post user's rating for the recipe to the server
      const userScore = {
        recipeId: recipeId,
        userId: userId,
        ratingValue: newRating
      };
      const response = await axios.post(`https://ztiback.test.azuremicroservices.io/spring-app-20240503182447/default/addRating`, userScore);
      if (response.status === 200) {
        // Refresh average ratings after user's rating is posted
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
            {/* Render recipe details */}
            <tr><td className='recipeViewSegment'>Nazwa:</td><td className='recipeViewSegment'>{recipe.a.name}</td></tr>
            <tr><td className='recipeViewSegment'>Składniki:</td><td className='recipeViewSegment'>{recipe.a.ingredients}</td></tr>
            <tr><td className='recipeViewSegment'>Instrukcje:</td><td className='recipeViewSegment'>{recipe.a.instructions}</td></tr>
            <tr><td className='recipeViewSegment'>Autor:</td><td className='recipeViewSegment'>{recipe.b}</td></tr>
            <tr><td className='recipeViewSegment'>Ocena:</td><td className='recipeViewSegment'>{(averageRating !== null && averageRating !== 0) ? averageRating.toFixed(2) + '/5.00' : 'Brak ocen'}</td></tr>
            
            {/* Render user rating selection if logged in and not author of the recipe */}
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

            {/* Render indicator for user's own recipe */}
            {userId === recipe.a.authorId && (
              <tr><td className='recipeViewSegment' id='ownRecipeIndicator'>Twój przepis</td><td/></tr>
            )}

            {/* Render back button */}
            <tr><td colSpan={2}><button onClick={onBackButtonClick}>Powrót do wyszukiwania</button></td></tr>
          </tbody>
        </>
      )}
    </div>
  );
};

export default RecipePage;
