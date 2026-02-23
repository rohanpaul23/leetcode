/**
 * Problem: Tribonacci Number
 * ---------------------------
 * T0 = 0
 * T1 = 1
 * T2 = 1
 * Tn = T(n-1) + T(n-2) + T(n-3)
 *
 * Return Tn
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */

var tribonacci = function(n) {
  // Handle small cases directly
  if (n === 0) return 0;
  if (n === 1 || n === 2) return 1;

  const dp = new Array(n + 1);

  dp[0] = 0;
  dp[1] = 1;
  dp[2] = 1;

  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2] + dp[i - 3];
  }

  return dp[n];
};