import {recipes} from '../recipes.js';
import buildRegex from './regexBuilder.js';


/**
 * Search for recipes matching the query
 * use native loops
 * @param query
 * @returns {*[]}
 */
export default function search(query) {
    if (query.length < 3) {
        return [];
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

function ingredientsListToString(ingredients) {
    let str = '';
    for (let i = 0; i < ingredients.length; i++) {
        str += `${ingredients[i].ingredient} `;
    }
    return str;
}

/**
 * Search for recipes matching the query
 * use array methods
 * @param query
 * @returns {*[]}
 */
export function search2(query) {
    if (query.length < 3) {
        return [];
    }

    const regex = buildRegex(query);

    return recipes.filter(recipe => {
        const searchString = `${recipe.name} ${recipe.description} ${recipe.ingredients.map(ingredient => ingredient.ingredient).join(' ')}`;
        return regex.test(searchString);
    });
}