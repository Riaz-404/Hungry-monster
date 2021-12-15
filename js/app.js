

//input item handler
// const searchItem = document.getElementById('input-text').innerText;


//search button handler



//fetching from site

const div = document.getElementById('food');
const mealDetails = document.getElementById('food-details');

const renderMeal = () => {
    const search = document.getElementById('input-text').value;
    const searchText = document.getElementById('input-text');
    searchText.value = "";

    div.style.display= 'grid';
    mealDetails.style.display= 'none';

    div.innerHTML="";
    

    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`

    fetch(url)
        .then(res => res.json())
        .then(data => displayAllMeals(data));


    const displayAllMeals = meals => {

            console.log(meals);

            if(meals.meals == null){
                div.innerHTML=`
                    <img class="null-img" src="images/sad-face.png">
                    <h2> Sorry this meal is not avaiable. Try another meal... </h2>
                `
            }
            else{
                for (let i = 0; i < meals.meals.length; i++) {
                    const meal = meals.meals[i];
        
                    const mealDiv = document.createElement('div');
                    mealDiv.className = 'meal-div';
        
                    const mealInfo = `
                        <img src="${meal.strMealThumb}">
                        <h5> ${meal.strMeal} </h5>
                        <button onclick="displayIndrediants('${meal.strMeal}')">Show Instructions</button>
                    `
        
                    mealDiv.innerHTML = mealInfo;
                    div.appendChild(mealDiv);
            }

            
        }
        
        
    }

}



const displayIndrediants = meal =>{
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`

    fetch(url)
    .then (res => res.json())
    .then (data => renderMealIngredients(data));
}

const renderMealIngredients = meals => {

    div.style.display= 'none';

    const meal = meals.meals[0];


    mealDetails.style.display= 'block';

    mealDetails.innerHTML=`
        <img src="${meal.strMealThumb}">
        <h2> ${meal.strMeal} </h2>

        <h5 style="font-weight:bold">Instructions: </h5>

        <p> ${meal.strInstructions} </p>

        <button class="back" onclick="backFunction()">Back  <i class="fas fa-arrow-circle-left"></i></button>
       
    `

}

const backFunction = () => {
    div.style.display= 'grid';
    mealDetails.style.display= 'none';
}









