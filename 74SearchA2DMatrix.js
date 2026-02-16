/**
 * ================================================================
 * 🧩 Problem: Search a 2D Matrix
 * ================================================================
 * You are given an m x n integer matrix with:
 * 1) Each row is sorted in non-decreasing order.
 * 2) The first integer of each row is greater than the last integer
 *    of the previous row.
 *
 * Given a target, return true if target exists in the matrix,
 * otherwise return false.
 *
 * Constraint: Must run in O(log(m * n)) time.
 *
 * ------------------------------------------------
 * ✅ Key Insight:
 * Because each row is sorted AND every next row starts after the
 * previous row ends, the entire matrix is globally sorted if you
 * read it row-by-row.
 *
 * So we can treat the matrix as a 1D sorted array of length m*n:
 *
 *   index: 0 1 2 ... (m*n - 1)
 *
 * And map a 1D index -> (row, col) using:
 *   row = Math.floor(mid / n)
 *   col = mid % n
 *
 * Then do a standard binary search.
 *
 * Time:  O(log(m*n))
 * Space: O(1)
 * ================================================================
 */

/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
  // Edge case: empty matrix
  if (!matrix || matrix.length === 0 || matrix[0].length === 0) return false;

  const m = matrix.length;       // number of rows
  const n = matrix[0].length;    // number of columns

  // Binary search over the "virtual" 1D array [0 ... m*n - 1]
  let left = 0;
  let right = m * n - 1;

  while (left <= right) {
    // Middle index in the virtual 1D space
    const mid = left + Math.floor((right - left) / 2);

    // Convert mid -> 2D coordinates (row, col)
    const row = Math.floor(mid / n);
    const col = mid % n;

    const midVal = matrix[row][col];

    if (midVal === target) {
      return true; // found
    } else if (midVal < target) {
      // Target must be to the "right" in the virtual array
      left = mid + 1;
    } else {
      // Target must be to the "left" in the virtual array
      right = mid - 1;
    }
  }

  // Not found after binary search
  return false;
};
