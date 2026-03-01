/**
 * ------------------------------------------------------------
 * PROBLEM: Coin Change (Minimum Coins)
 * ------------------------------------------------------------
 *
 * You are given:
 *  - An integer array `coins` representing different coin denominations.
 *  - An integer `amount` representing a target total.
 *
 * You have an unlimited supply of each coin.
 *
 * Your task:
 *  Return the minimum number of coins required to make up the given amount.
 *
 * If it is not possible to form the amount using any combination of coins,
 * return -1.
 *
 * Example:
 *  coins = [1, 2, 5], amount = 11
 *  Output: 3
 *  Explanation: 11 = 5 + 5 + 1
 *
 * ------------------------------------------------------------
 * APPROACH: Bottom-Up Dynamic Programming
 * ------------------------------------------------------------
 *
 * We define:
 *   dp[i] = minimum number of coins required to make amount i
 *
 * Base case:
 *   dp[0] = 0  (0 coins needed to make amount 0)
 *
 * Transition:
 *   For each amount i from 1 to amount:
 *      For each coin c:
 *          If i - c >= 0:
 *              dp[i] = min(dp[i], 1 + dp[i - c])
 *
 * Explanation:
 *   If we choose coin c,
 *   then remaining amount is (i - c),
 *   and we already know the best answer for that.
 *
 * Final answer:
 *   dp[amount]
 *
 * ------------------------------------------------------------
 */

var coinChange = function(coins, amount) {

    // Create DP array of size (amount + 1)
    // Initialize all values to Infinity (meaning not reachable yet)
    const dp = new Array(amount + 1).fill(Infinity);

    // Base case
    dp[0] = 0;  // 0 coins needed to make amount 0

    // Build solutions from 1 to amount
    for (let i = 1; i <= amount; i++) {

        // Try every coin
        for (let c of coins) {

            // Only proceed if coin can be used
            if (i - c >= 0) {

                // If we use coin c,
                // total coins = 1 (current coin) + best solution for remaining amount
                dp[i] = Math.min(dp[i], 1 + dp[i - c]);
            }
        }
    }

    // If dp[amount] is still Infinity,
    // it means the amount cannot be formed
    return dp[amount] === Infinity ? -1 : dp[amount];
};


/**
 * ------------------------------------------------------------
 * TIME COMPLEXITY
 * ------------------------------------------------------------
 *
 * Let:
 *   A = amount
 *   C = number of coin types
 *
 * Outer loop runs A times.
 * Inner loop runs C times.
 *
 * Therefore:
 *
 *   Time Complexity = O(A × C)
 *
 *
 * ------------------------------------------------------------
 * SPACE COMPLEXITY
 * ------------------------------------------------------------
 *
 * We use a DP array of size (amount + 1).
 *
 *   Space Complexity = O(A)
 *
 *
 * ------------------------------------------------------------
 * NOTE
 * ------------------------------------------------------------
 *
 * This is a pseudo-polynomial time algorithm because the
 * complexity depends on the numeric value of `amount`,
 * not the number of digits needed to represent it.
 *
 * ------------------------------------------------------------
 */