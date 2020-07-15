import React, { useEffect, useState } from 'react';
import './App.css';
import Recipe from './Recipe';

const App = () =>{
  
  const APP_ID = '232014d4'; //ID EDAMAM
  const APP_KEY = '44e4f446e8ead7c381ea3b16f6ab0721'; //KEY EDAMAM
  
  const [recipes, setRecipes] = useState([])//food
  const [search, setSearch] = useState('')//input search
  const[query, setQuery] = useState('potato')

  useEffect( () => {
    getRecipes()
  }, [query])//call functionCallAPI and added food in recipes[x,y,z]

  const getRecipes = async() =>{
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    const data = await response.json()
    setRecipes(data.hits)
  }//call data of api

  const updateSearch = e =>{
    setSearch(e.target.value)
  }

  const getSearch = e =>{
    e.preventDefault()
    setQuery(search)
    setSearch('')
  } 

  return(
    <div className = 'App'>
      <form className='search-form' onSubmit = {getSearch}>
        <input className='search-bar' type='text' 
        value={search} onChange = {updateSearch}/>
        <button className='search-button' type='submit'>Search</button>
      </form>
      <h4 className='text'>Find Your Recipe</h4>
      <div className='recipes'>
      {recipes.map( recipe => (
        <Recipe 
        key = {recipe.recipe.label}
        title={recipe.recipe.label}
        calories={recipe.recipe.calories}
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}/>
      ))}
      </div>
    </div>
  );
}

export default App;
