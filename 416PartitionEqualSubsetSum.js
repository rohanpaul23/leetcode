/**
 * LeetCode 416 — Partition Equal Subset Sum
 *
 * Problem statement:
 * Given an integer array nums, return true if you can split nums into TWO subsets
 * such that the sum of elements in both subsets is equal. Otherwise return false.
 *
 * Key idea (DP / subset-sum):
 * If totalSum is odd -> impossible (because equal halves would be .5).
 * Otherwise target = totalSum / 2.
 * Now the question becomes: "Can we pick some numbers that add up to target?"
 *
 * We'll use 1D DP where:
 * dp[s] = true means "using some of the first few numbers, we can make sum = s".
 *
 * Initialization:
 * dp[0] = true because we can always make sum 0 by picking nothing.
 *
 * Transition (0/1 knapsack style):
 * For each number x, update dp from RIGHT to LEFT:
 * dp[s] = dp[s] OR dp[s - x]
 *
 * Why right-to-left?
 * Because each number can be used at most once.
 * If we went left-to-right, we might reuse the same number multiple times in one iteration.
 *
 * Time complexity: O(n * target)
 * Space complexity: O(target)
 */
var canPartition = function (nums) {
  // 1) Compute total sum
  let total = 0;
  for (const x of nums) total += x;

  // 2) If total is odd, can't split into two equal integers
  if (total % 2 !== 0) return false;

  const target = total / 2;

  // 3) dp[s] tells if sum s is achievable
  const dp = new Array(target + 1).fill(false);

  // Sum 0 is always achievable: choose nothing
  dp[0] = true;

  // 4) Try to build achievable sums using each number once
  for (const x of nums) {
    // If x is bigger than target, it can never be part of reaching target directly,
    // but it still doesn't hurt to keep the loop guarded:
    // we start from target down to x so (s - x) is valid.
    for (let s = target; s >= x; s--) {
      // If we could make (s - x) before, then by taking x we can now make s.
      if (dp[s - x]) dp[s] = true;
    }

    // Early exit: if we can already make target, no need to continue.
    if (dp[target]) return true;
  }

  return dp[target];
};