/**
 * Generate 3 list of tags from a recipes list
 * @param recipes
 * @returns {{ingredients: string[], appliances: string[], ustensils: string[]}}
 */
export function generateTags(recipes) {
    const ingredientsTags = new Set();
    const applianceTags = new Set();
    const ustensilsTags = new Set();

    recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            ingredientsTags.add(ingredient.ingredient);
        });
        applianceTags.add(recipe.appliance);
        recipe.ustensils.forEach(ustensil => {
            ustensilsTags.add(ustensil);
        });
    });

    return {
        ingredients: Array.from(ingredientsTags),
        appliances: Array.from(applianceTags),
        ustensils: Array.from(ustensilsTags)
    };
}

export function filterByTags(recipes, selectedTags) {
    return recipes.filter(recipe => {
        return selectedTags.ingredients.every(tag => {
                return recipe.ingredients.some(ingredient => ingredient.ingredient === tag);
            }) &&
            selectedTags.appliances.every(tag => recipe.appliance === tag) &&
            selectedTags.ustensils.every(tag => recipe.ustensils.includes(tag))
    });
}