/**
 * Encodes a list of strings to a single string.
 * Format: Each string is prefixed with its length and a delimiter `#`.
 * This helps in decoding the exact boundaries later.
 * 
 * @param {string[]} strs - Array of strings to encode
 * @returns {string} - Encoded single string
 */
var encode = (strs) => {
    let res = "";

    for (let s of strs) {
        // Add the length of the string followed by '#' and the string itself
        res += s.length + "#" + s;
    }

    return res;
}

/**
 * Decodes a single string back into an array of strings.
 * It reads the length prefix before each string to determine where each word ends.
 * 
 * @param {string} str - Encoded string
 * @returns {string[]} - Decoded array of original strings
 */
var decode = (str) => {
    let res = [];
    let i = 0;

    while (i < str.length) {
        let j = i;

        // Find the delimiter '#' to get the full number before it
        while (str[j] !== '#') {
            j++;
        }

        // Parse the number from i to j (this is the length of the next word)
        let length = parseInt(str.substring(i, j));

        // Move i to the start of the actual word (after the '#')
        i = j + 1;

        // Extract the word of `length` characters starting from i
        j = i + length;
        res.push(str.substring(i, j));

        // Move i to the next encoded part
        i = j;
    }

    return res;
}
