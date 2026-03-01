/**
 * ------------------------------------------------------------
 * PROBLEM: Target Sum (LeetCode 494)
 * ------------------------------------------------------------
 *
 * You are given an integer array nums and an integer target.
 *
 * You must put either '+' or '-' in front of every number, forming an expression,
 * and count how many different expressions evaluate to `target`.
 *
 * Example:
 *   nums = [1,1,1,1,1], target = 3
 *   Output = 5
 *
 * ------------------------------------------------------------
 * KEY IDEA (Transform to Subset Sum)
 * ------------------------------------------------------------
 *
 * Suppose we split nums into two groups:
 *   P = numbers we put '+' in front of
 *   N = numbers we put '-' in front of
 *
 * Then the expression value is:
 *   sum(P) - sum(N) = target
 *
 * Also:
 *   sum(P) + sum(N) = totalSum
 *
 * Add both equations:
 *   2 * sum(P) = target + totalSum
 *
 * So:
 *   sum(P) = (target + totalSum) / 2
 *
 * That means:
 *   The problem becomes: "How many subsets of nums sum to S"
 *   where S = (target + totalSum) / 2
 *
 * IMPORTANT CONDITIONS:
 *   1) target + totalSum must be even (otherwise S not integer => 0 ways)
 *   2) |target| must be <= totalSum (otherwise impossible => 0 ways)
 *
 * ------------------------------------------------------------
 * DP MEANING
 * ------------------------------------------------------------
 * dp[s] = number of ways to pick some numbers (subset) that sum to s
 *
 * Start:
 *   dp[0] = 1  (one way to make 0: pick nothing)
 *
 * For each number x:
 *   update dp backwards:
 *     dp[s] += dp[s - x]
 *
 * Backwards is crucial so each number is used at most once.
 *
 * ------------------------------------------------------------
 * TIME COMPLEXITY
 * ------------------------------------------------------------
 * Let:
 *   n = nums.length
 *   S = (target + totalSum) / 2
 *
 * Time:  O(n * S)
 * Space: O(S)
 * ------------------------------------------------------------
 */

var findTargetSumWays = function(nums, target) {
  // Sum of all numbers
  let totalSum = 0;
  for (const x of nums) totalSum += x;

  // If target is too large in magnitude, impossible
  if (Math.abs(target) > totalSum) return 0;

  // We need (target + totalSum) to be even to form integer S
  const sumPlus = target + totalSum;
  if (sumPlus % 2 !== 0) return 0;

  // Subset sum target
  const S = sumPlus / 2;

  // dp[s] = number of ways to reach sum s
  const dp = new Array(S + 1).fill(0);
  dp[0] = 1;

  // For each number, update dp from right to left
  for (const x of nums) {
    for (let s = S; s >= x; s--) {
      dp[s] += dp[s - x];
    }
  }

  return dp[S];
};