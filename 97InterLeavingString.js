/**
 * ------------------------------------------------------------
 * PROBLEM: Interleaving String (LeetCode 97)
 * ------------------------------------------------------------
 *
 * Given strings s1, s2, and s3, return true if s3 is formed by
 * an interleaving of s1 and s2, otherwise return false.
 *
 * Interleaving means:
 *  - You merge s1 and s2 to form s3
 *  - You must keep the relative order of characters from s1
 *  - You must keep the relative order of characters from s2
 *
 * Example:
 *   s1 = "ab", s2 = "cd"
 *   Valid interleavings include: "acbd", "cabd" ❌ (order in s1 breaks)
 *   s3 = "acbd" -> true
 *
 * ------------------------------------------------------------
 * KEY IDEA (DP on prefixes)
 * ------------------------------------------------------------
 *
 * Let:
 *   i = how many chars taken from s1
 *   j = how many chars taken from s2
 * Then we have built:
 *   s3 prefix length = i + j
 *
 * DP state:
 *   dp[i][j] = true if s3[0..i+j-1] can be formed by interleaving
 *              s1[0..i-1] and s2[0..j-1]
 *
 * Transition:
 *   dp[i][j] is true if:
 *     1) dp[i-1][j] is true AND s1[i-1] matches s3[i+j-1]
 *        (meaning we take next char from s1)
 *     OR
 *     2) dp[i][j-1] is true AND s2[j-1] matches s3[i+j-1]
 *        (meaning we take next char from s2)
 *
 * Base:
 *   dp[0][0] = true (empty + empty -> empty)
 *
 * ------------------------------------------------------------
 * TIME / SPACE
 * ------------------------------------------------------------
 * Let m = s1.length, n = s2.length
 * Time:  O(m * n)
 * Space: O(n) using 1D optimization (or O(m*n) with 2D)
 * ------------------------------------------------------------
 */

var isInterleave = function(s1, s2, s3) {
  const m = s1.length;
  const n = s2.length;

  // Length must match exactly
  if (m + n !== s3.length) return false;

  // dp[j] = dp[current_i][j] in a rolling 1D manner
  // dp[j] means: using first i chars of s1 and first j chars of s2,
  // can we form first (i+j) chars of s3?
  const dp = new Array(n + 1).fill(false);

  // Initialize dp for i = 0 (only using s2 to match s3)
  dp[0] = true;
  for (let j = 1; j <= n; j++) {
    dp[j] = dp[j - 1] && (s2[j - 1] === s3[j - 1]);
  }

  // Fill row by row for i = 1..m
  for (let i = 1; i <= m; i++) {
    // Update dp[0] for this i (only using s1 to match s3)
    dp[0] = dp[0] && (s1[i - 1] === s3[i - 1]);

    for (let j = 1; j <= n; j++) {
      const k = i + j - 1; // index in s3 we need to match next

      // Option 1: take s1[i-1] as next char (so previous was dp[j] from i-1)
      const fromS1 = dp[j] && (s1[i - 1] === s3[k]);

      // Option 2: take s2[j-1] as next char (so previous is dp[j-1] in same row)
      const fromS2 = dp[j - 1] && (s2[j - 1] === s3[k]);

      dp[j] = fromS1 || fromS2;
    }
  }

  return dp[n];
};