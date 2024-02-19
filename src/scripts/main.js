import { recipes } from './recipes.js';
import { recipeTemplate } from './templates/recipe.js';

function init() {
    const recipesSection = document.querySelector('.recipes-cards');
    const fragment = document.createDocumentFragment();

    recipes.forEach(recipe => {
       const recipeCardDOM =  recipeTemplate(recipe).getRecipeCardDOM();

       fragment.appendChild(recipeCardDOM);
    });

    recipesSection.appendChild(fragment);
}

init();