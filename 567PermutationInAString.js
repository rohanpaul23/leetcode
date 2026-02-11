/**
 * Problem: Permutation in String (LeetCode 567)
 *
 * Given two strings s1 and s2, return true if s2 contains
 * a permutation (an anagram) of s1 as a contiguous substring.
 *
 * Definitions:
 * - Permutation / Anagram:
 *   Two strings are permutations of each other if they contain
 *   the same characters with the same frequencies, regardless of order.
 *
 * - Substring:
 *   Characters must be contiguous and in the original order of s2.
 *
 * Example:
 * s1 = "ab", s2 = "eidbaooo"
 * Output: true
 * Explanation: "ba" is a substring of s2 and is a permutation of "ab".
 *
 * ------------------------------------------------------------
 * Solution Approach: Sliding Window + Frequency Arrays
 * (with Early Comparison Guard)
 *
 * Key Observations:
 * 1. A permutation must have the SAME length as s1.
 * 2. A permutation must have the SAME character frequencies as s1.
 * 3. Since characters are lowercase English letters,
 *    we can use fixed-size arrays of length 26 to store frequencies.
 *
 * High-level Strategy:
 * - Build a frequency array for s1 (freq1).
 * - Slide a window of size s1.length across s2.
 * - Maintain a frequency array (freq2) for the current window.
 * - Only when the window size equals s1.length do we compare freq1 and freq2.
 *
 * This avoids unnecessary comparisons and keeps the solution efficient.
 *
 * Time Complexity:
 * - O(n), where n = s2.length
 *   (Each character enters and leaves the window once.
 *    Frequency comparison is O(26) = O(1))
 *
 * Space Complexity:
 * - O(1) (constant space for two arrays of size 26)
 */
var checkInclusion = function (s1, s2) {
  const m = s1.length; // length of pattern string
  const n = s2.length; // length of text string

  // If s1 is longer than s2, it is impossible
  // for any substring of s2 to be a permutation of s1
  if (m > n) return false;

  // Frequency array for s1
  // freq1[i] represents how many times character (i + 'a') appears in s1
  const freq1 = Array(26).fill(0);

  // Frequency array for the current sliding window in s2
  // freq2[i] represents how many times character (i + 'a') appears in the window
  const freq2 = Array(26).fill(0);

  // Helper function to convert a character to an array index (0–25)
  const idx = (ch) => ch.charCodeAt(0) - 97;

  // ------------------------------------------------------------
  // Step 1: Build the frequency map for s1
  // ------------------------------------------------------------
  for (let i = 0; i < m; i++) {
    freq1[idx(s1[i])]++;
  }

  // Left pointer of the sliding window
  let left = 0;

  // ------------------------------------------------------------
  // Step 2: Slide the window over s2 using the right pointer
  // ------------------------------------------------------------
  for (let right = 0; right < n; right++) {
    // Add the current character (s2[right]) to the window
    freq2[idx(s2[right])]++;

    // --------------------------------------------------------
    // Step 3: If window size exceeds m, shrink from the left
    // --------------------------------------------------------
    // Window size is (right - left + 1)
    // We must keep the window size <= m
    if (right - left + 1 > m) {
      // Remove the character that is leaving the window
      freq2[idx(s2[left])]--;

      // Move the left boundary to the right
      left++;
    }

    // --------------------------------------------------------
    // Step 4: Early comparison guard
    // --------------------------------------------------------
    // Only when the window size is EXACTLY m do we check
    // if the current window is a permutation of s1
    if (right - left + 1 === m) {
      // Compare frequency arrays
      if (arraysMatch(freq1, freq2)) {
        // A permutation of s1 exists as a substring in s2
        return true;
      }
    }
  }

  // If no matching window was found
  return false;
};

/**
 * Helper function to compare two frequency arrays.
 *
 * Returns true if both arrays have identical counts
 * for all 26 lowercase English letters.
 */
function arraysMatch(a, b) {
  for (let i = 0; i < 26; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}
