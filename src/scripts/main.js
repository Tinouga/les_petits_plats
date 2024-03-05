import {recipes} from './recipes.js';
import {recipeTemplate} from './templates/recipe.js';
import {tagTemplate} from './templates/tag.js';
import debounce from './utils/debounce.js';
import filter from './utils/filter.js';

const INGREDIENTS = 'ingredients';
const APPLIANCES = 'appliances';
const USTENSILS = 'ustensils';

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
        const recipeCardDOM = recipeTemplate(recipe).getRecipeCardDOM();

        fragment.appendChild(recipeCardDOM);
    });

    recipesSection.appendChild(fragment);

    // update the recipes count
    document.getElementById('recipesCount').textContent = `${recipes.length} recettes`;
}

const selectedTags = {
    ingredients: [],
    appliances: [],
    ustensils: []
};

function populateTags(tags) {
    const selectedIngredientsList = document.getElementById('selectedIngredientsList');
    const ingredientsList = document.getElementById('ingredientsList');
    const selectedAppliancesList = document.getElementById('selectedAppliancesList');
    const appliancesList = document.getElementById('appliancesList');
    const selectedUstensilsList = document.getElementById('selectedUstensilsList');
    const ustensilsList = document.getElementById('ustensilsList');

    const unselectedIngredients = tags.ingredients.filter(tag => !selectedTags.ingredients.includes(tag));
    const unselectedAppliances = tags.appliances.filter(tag => !selectedTags.appliances.includes(tag));
    const unselectedUstensils = tags.ustensils.filter(tag => !selectedTags.ustensils.includes(tag));

    populateTagsList(INGREDIENTS, selectedIngredientsList, selectedTags.ingredients, true);
    populateTagsList(INGREDIENTS, ingredientsList, unselectedIngredients);
    populateTagsList(APPLIANCES, selectedAppliancesList, selectedTags.appliances, true);
    populateTagsList(APPLIANCES, appliancesList, unselectedAppliances);
    populateTagsList(USTENSILS, selectedUstensilsList, selectedTags.ustensils, true);
    populateTagsList(USTENSILS, ustensilsList, unselectedUstensils);
}

function populateTagsList(type, list, tags, selectedTags) {
    const fragment = document.createDocumentFragment();

    if (selectedTags) {
        tags.forEach(tag => {
            const selectedTagDOM = tagTemplate(tag).getSelectedTagDOM();
            fragment.appendChild(selectedTagDOM);
        });
    } else {
        tags.forEach(tag => {
            const tagDOM = tagTemplate(tag).getTagDOM(type, selectTag);
            fragment.appendChild(tagDOM);
        });
    }

    list.innerHTML = ''; // clear the list
    list.appendChild(fragment); // then populate it
}

function selectTag(tag, type) {
    selectedTags[type].push(tag); // add the tag to the selected tags
    searchWorker.postMessage({
        type: 'filter',
        selectedTags
    });
    // todo either repopulate or remove+add the tag
    // maybe repopulate to keep the tags in order
}

document.addEventListener('DOMContentLoaded', function () {
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
    const searchInput = content.querySelector('input');

    toggle.addEventListener('click', function () {
        const isOpen = content.classList.contains('open');

        if (isOpen) {
            content.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        } else {
            content.classList.add('open');
            toggle.setAttribute('aria-expanded', 'true');
        }
    });

    searchInput.addEventListener('input', function (event) {
        const query = event.target.value.toLowerCase();
        const items = content.querySelectorAll('li');

        items.forEach(item => {
            const itemText = item.textContent.toLowerCase();
            const isVisible = itemText.includes(query);

            item.hidden = !isVisible;
            if (!isVisible) {
                item.setAttribute('aria-hidden', 'true'); // hide the item from screen readers
                item.setAttribute('tabindex', '-1'); // making sure the item is not focusable
            } else {
                item.removeAttribute('aria-hidden');
                item.setAttribute('tabindex', '0');
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const debouncedSearch = debounce(function (query) {
        if (query.length >= 3) {
            searchWorker.postMessage({
                type: 'search',
                query
            });
        } else {
            handleDefaultData();
        }
    }, 150);

    document.getElementById('search').addEventListener('input', event => {
        const query = event.target.value;
        debouncedSearch(query);
    });
});

const searchWorker = new Worker('./src/scripts/searchWorker.js', {type: 'module'});
searchWorker.onmessage = function (event) {
    const msg = event.data;

    switch(msg.type) {
        case 'search':
            handleSearchResults(msg.data);
            break;
        default:
            console.error('Unknown message type', msg.type);
    }
};

function handleSearchResults(data) {
    const {recipes, tags} = data;
    displayRecipes(recipes);
    populateTags(tags);
}


init();