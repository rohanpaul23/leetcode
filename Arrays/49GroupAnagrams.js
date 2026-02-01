/**
 * Group strings that are anagrams.
 * Uses a 26-length frequency signature as the hash key.
 *
 * Time:  O(N * K)  where N = number of strings, K = max string length
 * Space: O(N * K)  for output + O(N) keys + O(1) per string (26 counts)
 *
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
  const map = new Map(); // key: frequency signature, value: list of anagrams

  for (const str of strs) {
    const key = getFrequencyKey(str);

    // If key not present, initialize with an empty array
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(str);
  }

  return Array.from(map.values());
};

/**
 * Builds a safe signature for lowercase a-z words:
 * Example: "eat" -> "1#0#0#0#1#0#...#1#0#..."
 *
 * @param {string} str
 * @return {string}
 */
function getFrequencyKey(str) {
  const count = Array(26).fill(0);

  for (let i = 0; i < str.length; i++) {
    count[str.charCodeAt(i) - 97]++;
  }

  // Use a delimiter to avoid collisions like [1,11] vs [11,1]
  return count.join("#");
}
