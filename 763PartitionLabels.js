/**
 * -------------------------------------------------------------
 * Problem: Partition Labels
 * -------------------------------------------------------------
 * Given a string s, partition it into as many parts as possible
 * such that each letter appears in at most one part.
 *
 * The partitions must be contiguous substrings whose concatenation
 * in order equals the original string s.
 *
 * Return an array of integers representing the size of each part.
 *
 * -------------------------------------------------------------
 * Greedy Strategy:
 * 1) Compute last occurrence index for each character.
 * 2) Scan s, tracking the furthest boundary `end` needed to include
 *    all characters seen so far.
 * 3) When i reaches `end`, we can close a partition.
 *
 * -------------------------------------------------------------
 * Time Complexity:  O(n)
 *   - One pass to compute last positions
 *   - One pass to form partitions
 *
 * Space Complexity: O(1)
 *   - At most 26 letters (lowercase English) for last positions
 *   - (If s can contain any chars, then O(k) where k = unique chars)
 * -------------------------------------------------------------
 */

/**
 * @param {string} s
 * @return {number[]}
 */
var partitionLabels = function (s) {
  // Map each character to its last index in the string
  const last = new Map();
  for (let i = 0; i < s.length; i++) {
    last.set(s[i], i);
  }

  const res = [];
  let start = 0; // start index of the current partition
  let end = 0;   // farthest last occurrence of chars in current partition

  for (let i = 0; i < s.length; i++) {
    // Expand the partition boundary if this character appears later
    end = Math.max(end, last.get(s[i]));

    // If we've reached the boundary, we can cut here
    if (i === end) {
      res.push(end - start + 1); // partition size
      start = i + 1;             // next partition starts after i
    }
  }

  return res;
};