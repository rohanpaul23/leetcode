/**
 * Integer Break (DP)
 * Split n into k >= 2 positive integers to maximize product.
 *
 * dp[x] = best (maximum) product you can get by splitting x into >= 2 parts
 *
 * Transition:
 *   Try first cut: x = i + (x - i)
 *   Left part i: we keep it as a number (no need to break i here)
 *   Right part (x - i): we have two options:
 *     1) don't break it -> value = (x - i)
 *     2) break it using dp -> value = dp[x - i]
 *   Best using this cut = i * max(x - i, dp[x - i])
 *
 * dp[x] = max over all i of that.
 */
function integerBreak(n) {
  // dp size n+1 so we can index directly
  const dp = new Array(n + 1).fill(0);

  // Base cases:
  // 2 -> 1+1 => 1
  dp[2] = 1;

  // Build dp from 3..n
  for (let x = 3; x <= n; x++) {
    let best = 0;

    // try every first cut i + (x - i)
    for (let i = 1; i <= x - 1; i++) {
      const right = x - i;

      // right can be either kept whole or broken further
      const bestRight = Math.max(right, dp[right]);

      // product for this split
      const product = i * bestRight;

      best = Math.max(best, product);
    }

    dp[x] = best;
  }

  return dp[n];
}