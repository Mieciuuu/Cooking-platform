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
        const response = await fetch(`http://localhost:8080/recipes/${recipeId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch recipe');
        }
        const recipeData = await response.json();
        setRecipe(recipeData);
  
        // Pobierz średnią ocenę przepisu z bazy danych
        const ratingsResponse = await axios.get(`http://localhost:8080/ratings/${recipeId}`);
        if (ratingsResponse.status === 200) {
          const averageRating = ratingsResponse.data;
          setAverageRating(averageRating);
          
          // Sprawdź, czy użytkownik już ocenił ten przepis
          if (loggedIn) {
            console.log('FIRST');
            const userRatingResponse = await axios.get(`http://localhost:8080/ratings/${recipeId}/user/${userId}`);
            if (userRatingResponse.status === 200) {
              console.log(userRatingResponse.data);
              const userRating = userRatingResponse.data;
              setUserRating(userRating.ratingValue);
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
    // console.log(e.target.valu);
    const newRating = parseInt(e.target.value);
    console.log(newRating)
    setUserRating(newRating);
  
    try {
      if (loggedIn) {
        const userRatingResponse = await axios.get(`http://localhost:8080/ratings/${recipeId}/user/${userId}`);
        const response = await axios.post(`http://localhost:8080/addRating`, {
          recipeId: recipeId,
          userId: userId,
          ratingValue: newRating
        });
        if (response.status === 200) {
          // Pobierz zaktualizowaną średnią ocenę przepisu
          const updatedRatingsResponse = await axios.get(`http://localhost:8080/ratings/${recipeId}`);
          if (updatedRatingsResponse.status === 200) {
            const averageRating = updatedRatingsResponse.data;
            setAverageRating(averageRating);
          }
        }
        // if (userRatingResponse.status === 200) {
        //   const userRating = userRatingResponse.data.ratingValue;
        //   console.log(userRating);
        //   setUserRating(userRating);
        // }
      }
    } catch (error) {
      console.error('Error adding rating:', error);
    }
  };

  console.log(loggedIn);
  console.log(userId);
  return (
    <div id='Recipe'>
      {recipe && (
        <>
          <tbody id='recipeClass'>
            <tr><td className='recipeViewSegment'>Nazwa:</td><td className='recipeViewSegment'>{recipe.a.name}</td></tr>
            <tr><td className='recipeViewSegment'>Składniki:</td><td className='recipeViewSegment'>{recipe.a.ingredients}</td></tr>
            <tr><td className='recipeViewSegment'>Instrukcje:</td><td className='recipeViewSegment'>{recipe.a.instructions}</td></tr>
            <tr><td className='recipeViewSegment'>Autor:</td><td className='recipeViewSegment'>{recipe.b}</td></tr>
            <tr><td className='recipeViewSegment'>Ocena:</td><td className='recipeViewSegment'>{(averageRating !== null && averageRating !== 0) ? averageRating.toFixed(2) : 'Brak ocen'}</td></tr>
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
          </tbody>
          <button onClick={onBackButtonClick}>Powrót do wyszukiwania</button>
        </>
      )}
    </div>
  );
};

export default RecipePage;
