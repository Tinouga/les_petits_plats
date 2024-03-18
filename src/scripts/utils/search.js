import {recipes} from '../data/recipes.js';
import buildRegex from './regexBuilder.js';


/**
 * Search for recipes matching the query
 * use array methods
 * @param query
 * @returns {*[]}
 */
export default function search(query) {
    // if the query is less than 3 characters, return all the recipes
    if (query.length < 3) {
        return recipes;
    }

    const regex = buildRegex(query);

    return recipes.filter(recipe => {
        const searchString = `${recipe.name} ${recipe.description} ${recipe.ingredients.map(ingredient => ingredient.ingredient).join(' ')}`;
        return regex.test(searchString);
    });
}