import {recipes} from '../data/recipes.js';
import buildRegex from './regexBuilder.js';


/**
 * Search for recipes matching the query
 * use native loops
 * @param query
 * @returns {*[]}
 */
export default function search(query) {
    // if the query is less than 3 characters, return all the recipes
    if (query.length < 3) {
        return recipes;
    }
    const results = [];
    const regex = buildRegex(query);

    for (let i = 0; i < recipes.length; i++) {
        let ingredientsAsString = ingredientsListToString(recipes[i].ingredients);

        const searchString = `${recipes[i].name} ${recipes[i].description} ${ingredientsAsString}`;
        if (regex.test(searchString)) {
            results.push(recipes[i]);
        }
    }

    return results;
}

/**
 * Convert an array of ingredients to a string
 * @param ingredients
 * @returns {string}
 */
function ingredientsListToString(ingredients) {
    let str = '';
    for (let i = 0; i < ingredients.length; i++) {
        str += `${ingredients[i].ingredient} `;
    }
    return str;
}