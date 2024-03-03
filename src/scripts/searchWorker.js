import search from './utils/search.js';
import filter from './utils/filter.js';

self.onmessage = function(event) {
    const query = event.data;

    if(query.length >= 3) {
        const results = search(query);
        const tags = filter(results);

        self.postMessage({
            recipes: results,
            tags
        });
    }
}