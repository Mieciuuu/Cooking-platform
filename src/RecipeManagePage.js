import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RecipeManagePage.css';

const RecipeManagePage = ({ userId }) => {
  const [userRecipes, setUserRecipes] = useState([]);
  const [addRecipe, setAddRecipe] = useState(false);
  const [modifyRecipe, setModifyRecipe] = useState(false);
  const [recipeScore, setRecipeScore] = useState(0.0);
  const [recipeToModify, setRecipeToModify] = useState();

  // var modifyRecipeId = 0;
  // var recipeToModify;

  const fetchUserRecipes = async () => {
    try {
      const response = await fetch(`http://localhost:8080/userRecipes/${userId}`);
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
      const response = await fetch(`http://localhost:8080/recipes/${modifyRecipeId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch recipe');
      }
      console.log(response);
      const data = await response.json();
      const responseScore = await axios.get(`http://localhost:8080/ratings/${modifyRecipeId}`);
      console.log(responseScore.data);
      setRecipeScore(responseScore.data);
      // if (!response.ok) {
      //   throw new Error('Failed to fetch recipe');
      // }
      // return data;
      console.log(data)
      setRecipeToModify(data.a);
      setModifyRecipe(true);
      // return data;
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

  const modifyRecipeToggle = (recipeIdToModify) => {
    fetchRecipe(recipeIdToModify);
    // setModifyRecipe(true);
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
      const response = await axios.post('http://localhost:8080/addRecipe', newRecipe);
      console.log(response)
      document.getElementById('confText').innerHTML = response.data;
    } catch (error) {
      console.log(error);
    }
  }

  // TODO MODIFY
  const handleRecipeModify = async (formRequest, recipeId) => {
    formRequest.preventDefault()
    const formData = new FormData(formRequest.target);
    const newRecipe = {
      name: formData.get('name'),
      ingredients: formData.get('ingredients'),
      instructions: formData.get('instructions')
    };

    try {
      const response = await axios.patch(`http://localhost:8080/modifyRecipe/${recipeId}`, newRecipe);
      console.log(response)
      document.getElementById('confText').innerHTML = response.data;
    } catch (error) {
      console.log(error);
    }
  }

  const deleteRecipe = async (recipeIdToDelete) => {
    try {
      const response = await axios.delete(`http://localhost:8080/deleteRecipe/${recipeIdToDelete}`);
      console.log(response)
      document.getElementById('confText').innerHTML = response.data;
      fetchUserRecipes();
    } catch (error) {
      console.log(error);
    }
  }

  const handleInputChange = (e) => {
    console.log(e);
    const { name, value } = e.target;
    setRecipeToModify(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  if (addRecipe) {
    return (
      <div id='ManagePage'>
        <h2>Dodawanie przepisu</h2>
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
    console.log(recipeToModify);
    return (
      <div id='ManagePage'>
        <h2>Modyfikacja przepisu</h2>
        <p id='backButtonHolder'><button id='backButton' onClick={() => setModifyRecipe(false)}>Powrót</button></p>
        <form id='addRecipeForm' onSubmit={(e) => handleRecipeModify(e, recipeToModify.id)}>
          <tbody>
            <tr><td>Nazwa przepisu:</td><td><input name='name' type='text' value={recipeToModify.name} onChange={(e) => handleInputChange(e)} /></td></tr>
            <tr><td>Składniki:</td><td><textarea name='ingredients' cols={150} rows={8} value={recipeToModify.ingredients} onChange={(e) => handleInputChange(e)} /></td></tr>
            <tr><td>Instrukcja wykonania:</td><td><textarea name='instructions' cols={150} rows={8} value={recipeToModify.instructions} onChange={(e) => handleInputChange(e)} /></td></tr>
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
        <tbody>
        <tr><button onClick={addRecipeTogle}>Dodaj przepis</button></tr>
        {userRecipes.map(recipe => (
          <div key={recipe.id} className="recipe">
            <tr><td>{recipe.name}</td><td><button onClick={() => modifyRecipeToggle(recipe.id)}>Modyfikuj przepis</button></td><td><button onClick={() => deleteRecipe(recipe.id)}>Usuń przepis</button></td></tr>
          </div>
        ))}
        </tbody>
      </div>
    );
  }
};

export default RecipeManagePage;
