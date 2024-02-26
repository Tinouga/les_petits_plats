import {recipes} from '../recipes.js';
import buildRegex from './regexBuilder.js';


/**
 * Search for recipes matching the query
 * use native loops
 * @param query
 * @returns {*[]}
 */
export default function concatenatedSearch(query) {
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
export function concatenatedSearch2(query) {
    if (query.length < 3) {
        return [];
    }

    const regex = buildRegex(query);

    return recipes.filter(recipe => {
        const searchString = `${recipe.name} ${recipe.description} ${recipe.ingredients.map(ingredient => ingredient.ingredient).join(' ')}`;
        return regex.test(searchString);
    });
}


/**
 * Below are the original functions, results aren't good
 * TODO delete them
 */


/**
 * Search for recipes matching the query
 * use native loops
 * @param query
 * @returns {*[]}
 */
export function search(query) {
    if (query.length < 3) {
        return [];
    }
    const results = [];
    const regex = buildRegex(query);

    for (let i = 0; i < recipes.length; i++) {
        switch (true) {
            case regex.test(recipes[i].name):
            case regex.test(recipes[i].description):
            case containsIngredient(recipes[i].ingredients, regex):
                results.push(recipes[i]);
                break;
        }
    }

    return results;
}

function containsIngredient(ingredients, regex) {
    for (let i = 0; i < ingredients.length; i++) {
        if (regex.test(ingredients[i].ingredient)) {
            return true;
        }
    }
    return false;
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

    return recipes.filter(recipe =>
        regex.test(recipe.name) ||
        regex.test(recipe.description) ||
        recipe.ingredients.some(ingredient => regex.test(ingredient.ingredient))
    );
}