import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RecipeManagePage.css';

const RecipeManagePage = ({ userId }) => {
  const [userRecipes, setUserRecipes] = useState([]);
  const [addRecipe, setAddRecipe] = useState(false);
  const [modifyRecipe, setModifyRecipe] = useState(false);
  const [recipeScore, setRecipeScore] = useState(0.0);
  const [recipeToModify, setRecipeToModify] = useState();

  const fetchUserRecipes = async () => {
    try {
      const response = await fetch(`https://ztiback.test.azuremicroservices.io/spring-app-20240503182447/default/userRecipes/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }
      const data = await response.json();
      setUserRecipes(data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const fetchRecipe = async (modifyRecipeId) => {
    try {
      const response = await fetch(`https://ztiback.test.azuremicroservices.io/spring-app-20240503182447/default/recipes/${modifyRecipeId}`);
      const responseScore = await axios.get(`https://ztiback.test.azuremicroservices.io/spring-app-20240503182447/default/ratings/${modifyRecipeId}`);
      if (!response.ok || responseScore.status !== 200) {
        throw new Error('Failed to fetch recipe');
      }
      const data = await response.json();
      setRecipeScore(responseScore.data);
      setRecipeToModify(data.a);
      setModifyRecipe(true);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  }

  useEffect(() => {
    fetchUserRecipes();
  }, []);

  const addRecipeTogle = () => {
    setAddRecipe(true);
    setModifyRecipe(false);
  }

  const handleRecipeAdd = async (formRequest, userId) => {
    formRequest.preventDefault()
    const formData = new FormData(formRequest.target);
    const newRecipe = {
      name: formData.get('name'),
      ingredients: formData.get('ingredients'),
      instructions: formData.get('instructions'),
      authorId: userId
    };

    try {
      const response = await axios.post('https://ztiback.test.azuremicroservices.io/spring-app-20240503182447/default/addRecipe', newRecipe);
      document.getElementById('confText').innerHTML = "Dodano przepis '" + response.data.name + "'";
    } catch (error) {
      console.log(error);
    }
  }

  const handleRecipeModify = async (formRequest, recipeId) => {
    formRequest.preventDefault()
    const formData = new FormData(formRequest.target);
    const newRecipe = {
      name: formData.get('name'),
      ingredients: formData.get('ingredients'),
      instructions: formData.get('instructions')
    };

    try {
      const response = await axios.patch(`https://ztiback.test.azuremicroservices.io/spring-app-20240503182447/default/modifyRecipe/${recipeId}`, newRecipe);
      document.getElementById('confText').innerHTML = response.data;
    } catch (error) {
      console.log(error);
    }
  }

  const deleteRecipe = async (recipeIdToDelete) => {
    try {
      const response = await axios.delete(`https://ztiback.test.azuremicroservices.io/spring-app-20240503182447/default/deleteRecipe/${recipeIdToDelete}`);
      document.getElementById('confText').innerHTML = response.data;
      fetchUserRecipes();
    } catch (error) {
      console.log(error);
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipeToModify(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  if (addRecipe) {
    return (
      <div id='ManagePage'>
        <h3>Dodawanie przepisu</h3>
        <p id='backButtonHolder'><button id='backButton' onClick={() => setAddRecipe(false)}>Powrót</button></p>
        <form id='addRecipeForm' onSubmit={(e) => handleRecipeAdd(e, userId)}>
          <tbody>
            <tr><td>Nazwa przepisu:</td><td><input name='name' type='text'/></td></tr>
            <tr><td>Składniki:</td><td><textarea name='ingredients' cols={150} rows={8}/></td></tr>
            <tr><td>Instrukcja wykonania:</td><td><textarea name='instructions' cols={150} rows={8}/></td></tr>
            <tr><td/><td><input type="submit" value="Dodaj przepis"/></td></tr>
          </tbody>
        </form>
        <p id='confText'></p>
      </div>
    );
  } else if (modifyRecipe) {
    return (
      <div id='ManagePage'>
        <h3>Modyfikacja przepisu</h3>
        <p id='backButtonHolder'><button id='backButton' onClick={() => setModifyRecipe(false)}>Powrót</button></p>
        <form id='addRecipeForm' onSubmit={(e) => handleRecipeModify(e, recipeToModify.id)}>
          <tbody>
            <tr><td>Nazwa przepisu:</td><td><input name='name' type='text' value={recipeToModify.name} onChange={(e) => handleInputChange(e)} /></td></tr>
            <tr><td>Składniki:</td><td><textarea name='ingredients' cols={150} rows={7} value={recipeToModify.ingredients} onChange={(e) => handleInputChange(e)} /></td></tr>
            <tr><td>Instrukcja wykonania:</td><td><textarea name='instructions' cols={150} rows={7} value={recipeToModify.instructions} onChange={(e) => handleInputChange(e)} /></td></tr>
            <tr><td>Ocena: {(recipeScore !== null && recipeScore !== 0) ? recipeScore.toFixed(2) + '/5' : 'Brak ocen'}</td><td><input type="submit" value="Zmień przepis" /></td></tr>
          </tbody>
        </form>
        <p id='confText'></p>
      </div>
    );
  } else {
    return (
      <div id='ManagePage'>
        <p id='confText'></p>
        <table><tbody>
          <tr><td colSpan={3}><button onClick={addRecipeTogle}>Dodaj przepis</button></td></tr>
          <br/>
          {userRecipes.map(recipe => (
            <tr key={recipe.id}><td>{recipe.name}</td><td><button onClick={() => fetchRecipe(recipe.id)}>Modyfikuj przepis</button></td><td><button onClick={() => deleteRecipe(recipe.id)}>Usuń przepis</button></td></tr>
          ))}
        </tbody></table>
      </div>
    );
  }
};

export default RecipeManagePage;
