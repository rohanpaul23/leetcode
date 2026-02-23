/**
 * Problem: House Robber (LeetCode 198)
 * ------------------------------------
 * You are given an integer array nums where:
 *    nums[i] represents the amount of money in the ith house.
 *
 * You are a robber planning to rob houses along a street.
 * The only constraint is:
 *    You cannot rob two adjacent houses.
 *
 * Return the maximum amount of money you can rob without
 * alerting the police.
 *
 * Example:
 *   Input:  nums = [2,7,9,3,1]
 *   Output: 12
 *   Explanation:
 *     Rob house 0 (2), house 2 (9), and house 4 (1)
 *     Total = 2 + 9 + 1 = 12
 *
 * Approach:
 * ----------
 * Dynamic Programming
 *
 * Let:
 *   dp[i] = maximum money we can rob from houses 0 to i
 *
 * For each house i, we have two choices:
 *
 * 1) Rob current house:
 *      If we rob house i, we cannot rob house i-1.
 *      So total = dp[i-2] + nums[i]
 *
 * 2) Skip current house:
 *      If we skip house i, we take previous maximum.
 *      So total = dp[i-1]
 *
 * Recurrence:
 *      dp[i] = max(dp[i-2] + nums[i], dp[i-1])
 *
 * Time Complexity: O(n)
 *   - We iterate through the array once.
 *
 * Space Complexity: O(n)
 *   - We use a DP array of size n.
 */

function rob(nums) {
    const n = nums.length;

    // Edge case: if only one house exists
    if (n === 1) return nums[0];

    // Create DP array
    const dp = new Array(n);

    // Base case 1:
    // If only first house exists, rob it
    dp[0] = nums[0];

    // Base case 2:
    // Choose the better of first or second house
    dp[1] = Math.max(nums[0], nums[1]);

    // Fill DP array starting from house 2
    for (let i = 2; i < n; i++) {

        // Option 1: Rob current house
        const robCurrent = dp[i - 2] + nums[i];

        // Option 2: Skip current house
        const skipCurrent = dp[i - 1];

        // Take the maximum of both choices
        dp[i] = Math.max(robCurrent, skipCurrent);
    }

    // Final answer: maximum money up to last house
    return dp[n - 1];
}