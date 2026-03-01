/**
 * Minimum Path Sum
 * dp[r][c] = minimum sum to reach cell (r,c) from (0,0)
 *
 * Transition:
 *   dp[r][c] = grid[r][c] + min(dp[r-1][c], dp[r][c-1])
 */
function minPathSum(grid) {
  const m = grid.length;
  const n = grid[0].length;

  const dp = Array.from({ length: m }, () => Array(n).fill(0));

  // Start
  dp[0][0] = grid[0][0];

  // First row: only can come from LEFT
  for (let c = 1; c < n; c++) {
    dp[0][c] = dp[0][c - 1] + grid[0][c];
  }

  // First column: only can come from TOP
  for (let r = 1; r < m; r++) {
    dp[r][0] = dp[r - 1][0] + grid[r][0];
  }

  // Rest: min(from top, from left)
  for (let r = 1; r < m; r++) {
    for (let c = 1; c < n; c++) {
      dp[r][c] = grid[r][c] + Math.min(dp[r - 1][c], dp[r][c - 1]);
    }
  }

  return dp[m - 1][n - 1];
}