const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const mealsContainer = document.getElementById("meals");
const resultHeading = document.getElementById("result-heading");
const errorContainer = document.getElementById("error-container");
const mealDetails = document.getElementById("meal-details");
const mealDetailsContent = document.querySelector(".meal-details-content");
const backBtn = document.getElementById("back-btn");

const BASE_URL = "https://www.themealdb.com/api/json/v1/1/";
const SEARCH_URL = `${BASE_URL}search.php?s=`;
const LOOKUP_URL = `${BASE_URL}lookup.php?i=`;

searchBtn.addEventListener("click", searchMeals)
searchBtn.addEventListener("keypress",
(e) =>{
if(e.key === 'Enter') searchMeals()
})

async function searchMeals(){
  const searchTerm = searchInput.value.trim()
  //handled cases where searchbar is empty
  if(!searchTerm) {
    errorContainer.textContent = "Please Enter a valid search term"
    errorContainer.classList.remove("hidden")
    return
  }
  
  try{
resultHeading.textContent = `Searching for "${searchTerm}" ...`
mealsContainer.innerHTML= '';
errorContainer.classList.add("hidden")

//Fetch meals from api
const response = await fetch(`${SEARCH_URL}${searchTerm}`);
const data = await response.json()
console.log(data);
if(!data.meals){
  resultHeading.textContent = ``;
  mealsContainer.innerHTML = "";
errorContainer.textContent = `No recipes found for "${searchTerm}", try another search term`;
errorContainer.classList.remove("hidden")
} else {
  resultHeading = `Search Results for: "${searchTerm}"`;
  displayMeals(data.meals);
  searchInput.value = '';
}


  }catch(error){
errorContainer.textContent = 'Something went wrong'
errorContainer.classList.remove("hidden")
  }
}

function displayMeals(meals) {
mealsContainer.innerHTML = '';
meals.forEach(meal => {
  mealsContainer.innerHTML += `
       <div class="meal" data-meal-id="${meal.idMeal}">
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <div class="meal-info">
          <h3 class="meal-title">${meal.strMeal}</h3>
          ${meal.strCategory ? `<div class="meal-category">${meal.strCategory}</div>` : ""}
        </div>
      </div>
  `
})
}