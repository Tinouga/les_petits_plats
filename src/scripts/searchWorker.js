import search from './utils/search.js';
import { filterByTags, generateTags } from './utils/filter.js';

self.onmessage = function(event) {
    const msg = event.data;

    switch(msg.type) {
        case 'search':
            handleSearch(msg.query, msg.selectedTags);
            break;
        default:
            console.error('Unknown message type', msg.type);

    }
}

/**
 * Search the recipes with the query and the selected tags,
 * generate a list of tags matching the filtered recipes
 * and send the result (filtered recipes and generated tags) to the main thread
 * @param query
 * @param selectedTags
 */
function handleSearch(query, selectedTags) {
        const results = search(query);
        const filteredResults = filterByTags(results, selectedTags);

        const tags = generateTags(filteredResults);

        self.postMessage({
            type: 'search',
            data: {
                recipes: filteredResults,
                tags
            }
        });
}