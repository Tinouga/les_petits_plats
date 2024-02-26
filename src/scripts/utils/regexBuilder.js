/**
 * Build a regex from the query that will match words and/or partial words no matter the order
 * @param {string} query
 * @returns {RegExp}
 */
export default function buildRegex(query) {
    // escaping special characters
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // splitting the query into words/partial words
    const queryParts = escapedQuery.split(/\s+/);
    // constructing the regex pattern
    const regexPattern = queryParts.map(part => `(?=.*${part})`).join('');
    // adding .* at the end to match any character after the last word/partial word
    const finalRegexPattern = `${regexPattern}.*`;
    // creating and returning the case-insensitive regex
    return new RegExp(finalRegexPattern, 'i');
}