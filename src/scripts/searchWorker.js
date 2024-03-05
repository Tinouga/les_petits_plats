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