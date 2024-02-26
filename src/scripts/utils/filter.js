export default function generateTags(recipes) {
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

function generateTags2(recipes) {
    return recipes.reduce((tags, recipe) => {
        recipe.ingredients.forEach(ingredient => {
            tags.ingredients.add(ingredient.ingredient);
        });
        tags.appliances.add(recipe.appliance);
        recipe.ustensils.forEach(ustensil => {
            tags.ustensils.add(ustensil);
        });
       return tags;
    }, {
        ingredients: new Set(),
        appliances: new Set(),
        ustensils: new Set()
    });
}