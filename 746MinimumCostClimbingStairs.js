/**
 * Problem: Min Cost Climbing Stairs (LeetCode 746)
 * ------------------------------------------------
 * You are given an array cost where cost[i] is the cost of step i.
 * You can climb either 1 or 2 steps.
 * You can start from index 0 or index 1.
 * Return the minimum cost to reach the top.
 *
 * Approach:
 * - Use Dynamic Programming array
 * - dp[i] represents minimum cost to reach step i
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */

var minCostClimbingStairs = function(cost) {
    const n = cost.length;
    
    // Step 1: Create DP array
    const dp = new Array(n);

    // Step 2: Base cases
    dp[0] = cost[0];  // cost to reach first stair
    dp[1] = cost[1];  // cost to reach second stair

    // Step 3: Fill DP table
    for (let i = 2; i < n; i++) {
        dp[i] = cost[i] + Math.min(dp[i - 1], dp[i - 2]);
    }

    // Step 4: Final answer
    // We can reach the top from either last or second last stair
    return Math.min(dp[n - 1], dp[n - 2]);
};