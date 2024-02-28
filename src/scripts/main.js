import { recipes } from './recipes.js';
import { recipeTemplate } from './templates/recipe.js';
import search from './utils/search.js';
import filter from './utils/filter.js';

function init() {
    displayRecipes(recipes);
}

function displayRecipes(recipes) {
    const recipesSection = document.querySelector('.recipes-cards');

    // Clear the recipes section
    recipesSection.innerHTML = '';

    const fragment = document.createDocumentFragment();

    recipes.forEach(recipe => {
        const recipeCardDOM =  recipeTemplate(recipe).getRecipeCardDOM();

        fragment.appendChild(recipeCardDOM);
    });

    recipesSection.appendChild(fragment);

    // update the recipes count
    document.getElementById('recipesCount').textContent = `${recipes.length} recettes`;
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

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('search').addEventListener('input', event => {
       const query = event.target.value;

       if(query.length >= 3) {
           const results = search(query);
           const tags = filter(results);

           displayRecipes(results);
       } else {
          displayRecipes(recipes);
       }
    });
});


init();