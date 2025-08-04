/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
    // Create a map to group anagrams using a frequency signature as the key
    const map = new Map();

    // Loop through each word in the input array
    for (let str of strs) {
        // Generate a frequency-based key for the current word
        const sortedStr = getFrequency(str);

        // If the key already exists, push the word to the corresponding group
        if (map.has(sortedStr)) {
            map.get(sortedStr).push(str);
        } else {
            // Otherwise, create a new group with the current word
            map.set(sortedStr, [str]);
        }
    }

    // Convert the map's values to an array of anagram groups and return
    return Array.from(map.values());
};

var getFrequency = function(str) {
    // Initialize a count array for 26 lowercase English letters
    const charCount = Array(26).fill(0);

    // Count the occurrences of each character in the string
    for (let i = 0; i < str.length; i++) {
        charCount[str.charCodeAt(i) - 97]++;
        // charCodeAt(i) - 97 maps 'a' to 0, 'b' to 1, ..., 'z' to 25
    }

    // Join the count array into a string to use as a unique key
    // This works as an anagram signature
    return charCount.join("");
}
