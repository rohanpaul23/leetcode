/**
 * LeetCode 279: Perfect Squares
 *
 * Problem:
 * Given an integer n, return the least number of perfect square numbers that sum to n.
 *
 * Example:
 * n = 12 -> 12 = 4 + 4 + 4 => answer 3
 * n = 13 -> 13 = 4 + 9     => answer 2
 *
 * Key idea (DP / "min coins" style):
 * - Think of each perfect square (1, 4, 9, 16, ...) as a "coin".
 * - We want the minimum number of coins to make sum = n.
 *
 * DP definition:
 * dp[i] = minimum number of perfect squares needed to sum to i
 *
 * Transition:
 * dp[i] = min over all squares s (s <= i) of (dp[i - s] + 1)
 *
 * Base:
 * dp[0] = 0  (need 0 squares to make sum 0)
 *
 * Time Complexity:
 * - For each i (1..n), we try all squares <= i  => about sqrt(i)
 * - Total ~ O(n * sqrt(n))
 *
 * Space Complexity:
 * O(n) for dp array
 */

/**
 * @param {number} n
 * @return {number}
 */
function numSquares(n) {
  // dp[i] = min # of perfect squares that sum to i
  const dp = new Array(n + 1).fill(Infinity);

  // Base case: 0 needs 0 squares
  dp[0] = 0;

  // Precompute all perfect squares <= n to avoid recomputing j*j each time
  const squares = [];
  for (let j = 1; j * j <= n; j++) {
    squares.push(j * j);
  }

  // Build dp from 1 to n
  for (let i = 1; i <= n; i++) {
    // Try using each square "coin"
    for (const s of squares) {
      // If square is bigger than current target i, no need to continue
      if (s > i) break;

      // If we use square s as the last square:
      // remaining sum = i - s, which needs dp[i - s] squares
      // so total = dp[i - s] + 1
      dp[i] = Math.min(dp[i], dp[i - s] + 1);
    }
  }

  return dp[n];
}

console.log(numSquares(12)); // 3
console.log(numSquares(13)); // 2