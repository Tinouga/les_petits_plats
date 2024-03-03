import { recipes } from './recipes.js';
import { recipeTemplate } from './templates/recipe.js';
import debounce from './utils/debounce.js';
import filter from './utils/filter.js';

function init() {
    handleDefaultData();
}

function handleDefaultData() {
    displayRecipes(recipes);
    // generate tags and populate the tags list
    const tags = filter(recipes);
    populateTags(tags);
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

function populateTags(tags) {
    const ingredientsList = document.getElementById('listboxIngredientsContent').querySelector('ul');
    const appliancesList = document.getElementById('listboxAppliancesContent').querySelector('ul');
    const ustensilsList = document.getElementById('listboxUstensilsContent').querySelector('ul');

    const ingredientsFragment = document.createDocumentFragment();
    const appliancesFragment = document.createDocumentFragment();
    const ustensilsFragment = document.createDocumentFragment();

    tags.ingredients.forEach(ingredient => {
        const item = Object.assign(document.createElement('li'), {
            tabIndex: 0
        });
        item.textContent = ingredient;
        ingredientsFragment.appendChild(item);
    });

    tags.appliances.forEach(appliance => {
        const item = Object.assign(document.createElement('li'), {
            tabIndex: 0
        });
        item.textContent = appliance;
        appliancesFragment.appendChild(item);
    });

    tags.ustensils.forEach(ustensil => {
        const item = Object.assign(document.createElement('li'), {
            tabIndex: 0
        });
        item.textContent = ustensil;
        ustensilsFragment.appendChild(item);
    });

    // clear the tags list
    ingredientsList.innerHTML = '';
    appliancesList.innerHTML = '';
    ustensilsList.innerHTML = '';

    // then populate them
    ingredientsList.appendChild(ingredientsFragment);
    appliancesList.appendChild(appliancesFragment);
    ustensilsList.appendChild(ustensilsFragment);
}

document.addEventListener('DOMContentLoaded', function() {
    // ingredients listbox
    const ingredientsToggle = document.getElementById('listboxIngredientsToggle');
    const ingredientsContent = document.getElementById('listboxIngredientsContent');
    handleListbox(ingredientsToggle, ingredientsContent);

    // appliances listbox
    const appliancesToggle = document.getElementById('listboxAppliancesToggle');
    const appliancesContent = document.getElementById('listboxAppliancesContent');
    handleListbox(appliancesToggle, appliancesContent);

    // ustensils listbox
    const ustensilsToggle = document.getElementById('listboxUstensilsToggle');
    const ustensilsContent = document.getElementById('listboxUstensilsContent');
    handleListbox(ustensilsToggle, ustensilsContent);
});

function handleListbox(toggle, content) {
    const searchInput  = content.querySelector('input');

    toggle.addEventListener('click', function() {
        const isOpen = content.classList.contains('open');

        if(isOpen) {
            content.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        } else {
            content.classList.add('open');
            toggle.setAttribute('aria-expanded', 'true');
        }
    });

    searchInput.addEventListener('input', function(event) {
        const query = event.target.value.toLowerCase();
        const items = content.querySelectorAll('li');

        items.forEach(item => {
            const itemText = item.textContent.toLowerCase();
            const isVisible = itemText.includes(query);

            item.hidden = !isVisible;
            if(!isVisible) {
                item.setAttribute('aria-hidden', 'true'); // hide the item from screen readers
                item.setAttribute('tabindex', '-1'); // making sure the item is not focusable
            } else {
                item.removeAttribute('aria-hidden');
                item.setAttribute('tabindex', '0');
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const debouncedSearch = debounce(function(query) {
        if(query.length >= 3) {
            searchWorker.postMessage(query);
        } else {
            handleDefaultData();
        }
    }, 150);

    document.getElementById('search').addEventListener('input', event => {
        const query = event.target.value;
        debouncedSearch(query);
    });
});

const searchWorker  = new Worker('./src/scripts/searchWorker.js', {type: 'module'});
searchWorker.onmessage = function(event) {
    const {recipes, tags} = event.data;
    displayRecipes(recipes);
    populateTags(tags);
};


init();