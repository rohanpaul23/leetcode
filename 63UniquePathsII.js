/**
 * ===============================================
 * 🔷 Unique Paths II (LeetCode 63)
 * ===============================================
 *
 * 📌 Problem Statement:
 *
 * You are given an m x n grid called obstacleGrid.
 *
 * - obstacleGrid[r][c] = 1 → this cell is blocked (obstacle)
 * - obstacleGrid[r][c] = 0 → this cell is free
 *
 * You start at the top-left corner (0,0)
 * You want to reach the bottom-right corner (m-1,n-1)
 *
 * You can ONLY move:
 *   ➜ Right
 *   ➜ Down
 *
 * Return the total number of unique paths from start to end,
 * avoiding all obstacles.
 *
 *
 * ------------------------------------------------
 * 🧠 Core Idea (Dynamic Programming - 2D Grid)
 * ------------------------------------------------
 *
 * Let:
 *
 * dp[r][c] = number of ways to reach cell (r,c)
 *
 * If a cell is blocked:
 *     dp[r][c] = 0
 *
 * Otherwise:
 *     dp[r][c] = dp[r-1][c] + dp[r][c-1]
 *
 * Why?
 * Because you can only come from:
 *     • Top  (r-1, c)
 *     • Left (r, c-1)
 *
 *
 * ------------------------------------------------
 * ⚠️ Special Handling Required:
 * ------------------------------------------------
 *
 * 1) If start cell is blocked → return 0 immediately.
 *
 * 2) First row:
 *    You can ONLY move right.
 *    So:
 *       dp[0][c] = dp[0][c-1]
 *    UNTIL we hit an obstacle.
 *    After obstacle → all remaining cells become 0.
 *
 * 3) First column:
 *    You can ONLY move down.
 *    So:
 *       dp[r][0] = dp[r-1][0]
 *    UNTIL we hit an obstacle.
 *
 *
 * ------------------------------------------------
 * ⏱ Time Complexity:
 *    O(m × n)
 *
 * 📦 Space Complexity:
 *    O(m × n)
 * ------------------------------------------------
 */

var uniquePathsWithObstacles = function(obstacleGrid) {

    const m = obstacleGrid.length;
    const n = obstacleGrid[0].length;

    // If starting cell is blocked → no path exists
    if (obstacleGrid[0][0] === 1) return 0;

    // Create DP table initialized with 0
    const dp = Array.from({ length: m }, () => new Array(n).fill(0));

    // Base case: Start position has 1 way (if not blocked)
    dp[0][0] = 1;

    // ------------------------------------------------
    // Step 1: Fill First Row
    // ------------------------------------------------
    //
    // In first row, you can ONLY move right.
    //
    // If cell is not blocked:
    //   Ways to reach this cell = ways to reach left cell
    //
    // If blocked:
    //   It stays 0
    //   All cells after it will also remain 0
    //
    for (let c = 1; c < n; c++) {
        if (obstacleGrid[0][c] === 0) {
            dp[0][c] = dp[0][c - 1];
        }
        // If obstacle, dp[0][c] remains 0
    }

    // ------------------------------------------------
    // Step 2: Fill First Column
    // ------------------------------------------------
    //
    // In first column, you can ONLY move down.
    //
    // If cell is not blocked:
    //   Ways = ways from top
    //
    for (let r = 1; r < m; r++) {
        if (obstacleGrid[r][0] === 0) {
            dp[r][0] = dp[r - 1][0];
        }
        // If obstacle, remains 0
    }

    // ------------------------------------------------
    // Step 3: Fill Rest of Grid
    // ------------------------------------------------
    //
    // For each cell:
    //
    // If not blocked:
    //    dp[r][c] = dp[r-1][c] + dp[r][c-1]
    //
    // If blocked:
    //    dp[r][c] = 0
    //
    for (let r = 1; r < m; r++) {
        for (let c = 1; c < n; c++) {

            // If current cell is NOT an obstacle
            if (obstacleGrid[r][c] === 0) {

                // Ways from top + ways from left
                dp[r][c] =
                    dp[r - 1][c] +  // from top
                    dp[r][c - 1];   // from left
            }

            // If obstacle, dp[r][c] stays 0
        }
    }

    // Final answer: bottom-right cell
    return dp[m - 1][n - 1];
};