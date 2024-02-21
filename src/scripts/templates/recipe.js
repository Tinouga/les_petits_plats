export function recipeTemplate(recipe) {

    function getRecipeCardDOM() {
        const { id, name, description, image, ingredients, time } = recipe;

        const article = Object.assign(document.createElement('article'), {
            className: 'recipe-card rounded-3xl h-[45.6875rem] overflow-hidden flex flex-col',
        });
        /*
         * header
         */
        const header = Object.assign(document.createElement('header'), {
            className: 'relative h-[15.8125rem]',
        });
        const img = Object.assign(document.createElement('img'), {
            src: `./assets/images/recettes/${image}`,
            alt: `Photo de ${name}`,
            className: 'w-full h-full object-cover',
        });
        const span = Object.assign(document.createElement('span'), {
            className: 'absolute top-[1.31rem] right-[1.38rem] px-[0.94rem] py-[0.31rem] bg-primary rounded-[0.875rem] text-xs',
            textContent: `${time}min`,
        });
        header.append(img, span);
        /*
         * content
         */
        const content = Object.assign(document.createElement('div'), {
            className: 'pt-6 px-6 pb-16 flex flex-col gap-[1.81rem] bg-white flex-1',
        });
        const h3 = Object.assign(document.createElement('h3'), {
            className: 'text-lg font-display',
            textContent: name,
        });
        const innerContainer = Object.assign(document.createElement('div'), {
            className: 'flex flex-col gap-8',
        });
        /*
         * recipe
         */
        const recipeContainer = Object.assign(document.createElement('div'), {
            className: 'flex flex-col gap-[0.94rem]',
        });
        const recipeTitle = Object.assign(document.createElement('h4'), {
            className: 'text-xs font-bold text-grey',
            textContent: 'Recette'.toUpperCase(),
        });
        const recipeDescription = Object.assign(document.createElement('p'), {
            className: 'text-sm text-black line-clamp-4',
            textContent: description,
        });
        recipeContainer.append(recipeTitle, recipeDescription);
        /*
         * ingredients
         */
        const ingredientsContainer = Object.assign(document.createElement('div'), {
            className: 'flex flex-col gap-[0.94rem]',
        });
        const ingredientsTitle = Object.assign(document.createElement('h4'), {
            className: 'text-xs font-bold text-grey',
            textContent: 'Ingrédients'.toUpperCase(),
        });
        const ingredientsList = Object.assign(document.createElement('ul'), {
            className: 'grid grid-cols-2 gap-y-[1.31rem]',
        });
        ingredients.forEach(ingredient => {
            const li = Object.assign(document.createElement('li'), {
                className: 'flex flex-col gap-px',
            });
            const ingredientName = Object.assign(document.createElement('span'), {
                className: 'text-sm font-medium text-black',
                textContent: ingredient.ingredient,
            });
            if(ingredient.quantity !== undefined) {
                const ingredientQuantity = Object.assign(document.createElement('span'), {
                    className: 'text-sm text-grey',
                    textContent: `${ingredient.quantity}${ingredient.unit ?? ''}`,
                });
                li.append(ingredientName, ingredientQuantity);
            } else {
                li.append(ingredientName);
            }

            ingredientsList.append(li);
        });
        ingredientsContainer.append(ingredientsTitle, ingredientsList);

        innerContainer.append(recipeContainer, ingredientsContainer);
        content.append(h3, innerContainer);
        article.append(header, content);

        return article;
    }

    return { id: recipe.id, getRecipeCardDOM };
}