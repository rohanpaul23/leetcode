/**
 * Edit Distance (LeetCode 72)
 *
 * Problem:
 * Given two strings word1 and word2, return the minimum number of operations
 * required to convert word1 to word2.
 *
 * Allowed operations (cost 1 each):
 * 1) Insert a character
 * 2) Delete a character
 * 3) Replace a character
 *
 * DP meaning:
 * dp[i][j] = min ops to convert word1[0..i-1] (first i chars)
 *                     into word2[0..j-1] (first j chars)
 *
 * Answer is dp[m][n], where m = word1.length, n = word2.length.
 *
 * Base cases:
 * dp[i][0] = i  (convert i chars into empty => delete i times)
 * dp[0][j] = j  (convert empty into j chars => insert j times)
 *
 * Transition:
 * If last chars match: dp[i][j] = dp[i-1][j-1]
 * Else:
 *   insert  -> 1 + dp[i][j-1]
 *   delete  -> 1 + dp[i-1][j]
 *   replace -> 1 + dp[i-1][j-1]
 *
 * Time:  O(m * n)
 * Space: O(m * n)
 */

/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
function minDistance(word1, word2) {
  const m = word1.length;
  const n = word2.length;

  // dp has (m+1) rows and (n+1) cols because we include empty prefixes
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  // Base: convert word1 prefix -> empty word2 (all deletes)
  for (let i = 0; i <= m; i++) dp[i][0] = i;

  // Base: convert empty word1 -> word2 prefix (all inserts)
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  // Fill table
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const c1 = word1[i - 1]; // last char of current word1 prefix
      const c2 = word2[j - 1]; // last char of current word2 prefix

      if (c1 === c2) {
        // Characters already match, no new operation needed
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        // 1) Insert c2 into word1 -> we matched c2, so j reduces
        const insertCost = 1 + dp[i][j - 1];

        // 2) Delete c1 from word1 -> we removed c1, so i reduces
        const deleteCost = 1 + dp[i - 1][j];

        // 3) Replace c1 with c2 -> both i and j reduce
        const replaceCost = 1 + dp[i - 1][j - 1];

        dp[i][j] = Math.min(insertCost, deleteCost, replaceCost);
      }
    }
  }

  return dp[m][n];
}