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

document.addEventListener('DOMContentLoaded', function() {
    const listboxToggle = document.getElementById('listboxIngredientsToggle');
    const listboxContent = document.getElementById('listboxIngredientsContent');

    listboxToggle.addEventListener('click', function() {
       const isOpen = listboxContent.classList.contains('open');

       if(isOpen) {
           listboxContent.classList.remove('open');
           listboxToggle.setAttribute('aria-expanded', 'false');
       } else {
              listboxContent.classList.add('open');
              listboxToggle.setAttribute('aria-expanded', 'true');
       }
    });
});


init();