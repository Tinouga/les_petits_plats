import search from './utils/search.js';
import filter from './utils/filter.js';

self.onmessage = function(event) {
    const msg = event.data;

    switch(msg.type) {
        case 'search':
            handleSearch(event.data.query);
            break;
        case 'filter':
            handleFiltering(event.data.selectedTags);
            break;
        default:
            console.error('Unknown message type', msg.type);

    }
}

function handleSearch(query) {
    if(query.length >= 3) {
        const results = search(query);
        const tags = filter(results);

        self.postMessage({
            type: 'search',
            data: {
                recipes: results,
                tags
            }
        });
    }
}

function handleFiltering(selectedTags) {

}