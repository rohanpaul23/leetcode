/**
 * Longest Increasing Path in a Matrix
 *
 * You are given an m x n integer matrix. From any cell, you may move:
 *   up, down, left, right
 * You may only move to a neighbor with a STRICTLY larger value.
 *
 * Return the length of the longest increasing path.
 *
 * Approach: DFS + Memoization (Top-Down DP)
 *
 * dp[r][c] = length of the longest increasing path starting from (r, c)
 * We compute dp[r][c] using DFS:
 *   dp[r][c] = 1 + max(dp[nr][nc]) for all neighbors (nr,nc) where matrix[nr][nc] > matrix[r][c]
 * If no such neighbors, dp[r][c] = 1.
 *
 * Time Complexity: O(m*n)
 *   Each cell's DFS is computed once (memoized), and we check 4 neighbors.
 * Space Complexity: O(m*n) for dp + O(m*n) worst-case recursion stack
 */

/**
 * @param {number[][]} matrix
 * @return {number}
 */
function longestIncreasingPath(matrix) {
  if (!matrix || matrix.length === 0 || matrix[0].length === 0) return 0;

  const m = matrix.length;
  const n = matrix[0].length;

  // dp[r][c] = answer for cell (r,c), 0 means "not computed yet"
  const dp = Array.from({ length: m }, () => Array(n).fill(0));

  // Directions: up, down, left, right
  const dirs = [
    [-1, 0],
    [ 1, 0],
    [ 0,-1],
    [ 0, 1],
  ];

  // DFS returns the longest increasing path starting from (r,c)
  function dfs(r, c) {
    // If already computed, reuse it (memoization)
    if (dp[r][c] !== 0) return dp[r][c];

    // At minimum, path length is 1 (the cell itself)
    let best = 1;

    // Try moving to all 4 neighbors
    for (const [dr, dc] of dirs) {
      const nr = r + dr;
      const nc = c + dc;

      // Check bounds
      if (nr < 0 || nr >= m || nc < 0 || nc >= n) continue;

      // Only move if strictly increasing
      if (matrix[nr][nc] > matrix[r][c]) {
        // If we move to (nr,nc), the path length becomes 1 + dfs(nr,nc)
        best = Math.max(best, 1 + dfs(nr, nc));
      }
    }

    // Store computed result
    dp[r][c] = best;
    return best;
  }

  // Compute best path starting from every cell and take the maximum
  let ans = 0;
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      ans = Math.max(ans, dfs(r, c));
    }
  }

  return ans;
}