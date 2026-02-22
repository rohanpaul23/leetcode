/**
 * Problem: Word Search
 * -----------------------------------------
 * Given an m x n grid of characters `board` and a string `word`,
 * return true if `word` exists in the grid.
 *
 * Rules:
 * 1. The word must be constructed from sequentially adjacent cells.
 * 2. Adjacent cells are horizontally or vertically neighboring.
 * 3. The same letter cell may NOT be used more than once in a single path.
 *
 * Example:
 * board = [
 *   ['A','B','C','E'],
 *   ['S','F','C','S'],
 *   ['A','D','E','E']
 * ]
 * word = "ABCCED"
 *
 * Output: true
 *
 * Approach: DFS + Backtracking
 * -----------------------------------------
 * 1. Try starting from every cell in the grid.
 * 2. If the current cell matches word[0], start DFS.
 * 3. Recursively explore up, down, left, right.
 * 4. Mark a cell as visited before exploring neighbors.
 * 5. After exploring, unmark the cell (backtracking).
 * 6. If all characters are matched, return true.
 *
 * Why Backtracking?
 * -----------------------------------------
 * We must prevent reusing the same cell in the same path.
 * But after exploring one path, the cell should be available
 * again for other possible paths.
 *
 * Time Complexity:
 * -----------------------------------------
 * Let:
 *   m = number of rows
 *   n = number of columns
 *   L = length of the word
 *
 * Worst-case time complexity:
 *   O(m * n * 4^L)
 *
 * Explanation:
 * - We try starting from each cell → m * n
 * - At each step, we branch in up to 4 directions
 * - Depth of recursion is L
 *
 * Space Complexity:
 * -----------------------------------------
 * O(m * n) for visited array
 * O(L) recursion stack depth
 */

function exist(board, word) {
  const ROWS = board.length;
  const COLS = board[0].length;

  // Create a 2D visited matrix initialized with false
  // visited[r][c] = true means that cell is currently used in the path
  const visited = Array.from({ length: ROWS }, () =>
    Array(COLS).fill(false)
  );

  /**
   * DFS helper function
   * r = current row
   * c = current column
   * i = index of current character in word
   */
  const dfs = (r, c, i) => {

    // Base Case:
    // If we've matched all characters in the word
    if (i === word.length) return true;

    // Boundary and invalid checks:
    // 1. Out of bounds
    // 2. Character mismatch
    // 3. Already visited in this path
    if (
      r < 0 ||
      c < 0 ||
      r >= ROWS ||
      c >= COLS ||
      board[r][c] !== word[i] ||
      visited[r][c]
    ) {
      return false;
    }

    // Mark current cell as visited
    visited[r][c] = true;

    // Explore all 4 possible directions
    const found =
      dfs(r + 1, c, i + 1) || // down
      dfs(r - 1, c, i + 1) || // up
      dfs(r, c + 1, i + 1) || // right
      dfs(r, c - 1, i + 1);   // left

    // Backtrack:
    // Unmark the cell so other paths can use it
    visited[r][c] = false;

    return found;
  };

  // Try starting DFS from every cell
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (dfs(r, c, 0)) {
        return true;
      }
    }
  }

  // If no valid path found
  return false;
}