/**
 * Stone Game III (LeetCode 1406)
 *
 * We compute dp[i] = best possible (current player's score - other player's score)
 * starting from index i (i.e., with stones i..n-1 remaining).
 *
 * Transition:
 *   If we take k stones (k = 1..3), we gain sum(stoneValue[i..i+k-1]).
 *   Then opponent becomes the "current player" at position i+k and can achieve dp[i+k].
 *   So our net advantage for taking k stones is:
 *        takeSum - dp[i+k]
 *
 * dp[i] = max over k=1..3 of (takeSum - dp[i+k])
 *
 * Base:
 *   dp[n] = 0 (no stones left => difference 0)
 *
 * Result:
 *   dp[0] > 0 => Alice
 *   dp[0] < 0 => Bob
 *   dp[0] == 0 => Tie
 *
 * Time:  O(n)  (each i tries up to 3 moves)
 * Space: O(n)
 */
var stoneGameIII = function(stoneValue) {
  const n = stoneValue.length;

  // dp array of size n+1 so dp[n] exists (base case)
  const dp = new Array(n + 1).fill(0);

  // Build from right to left
  for (let i = n - 1; i >= 0; i--) {
    let best = -Infinity;
    let takeSum = 0;

    // Try taking 1, 2, or 3 stones if possible
    for (let k = 1; k <= 3 && i + k <= n; k++) {
      takeSum += stoneValue[i + k - 1];  // add next stone into sum
      best = Math.max(best, takeSum - dp[i + k]);
    }

    dp[i] = best;
  }

  if (dp[0] > 0) return "Alice";
  if (dp[0] < 0) return "Bob";
  return "Tie";
};