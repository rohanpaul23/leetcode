/**
 * Problem: Subsets II (Power Set with Duplicates)
 * ----------------------------------------------
 * Given an integer array `nums` that may contain duplicates,
 * return all possible subsets (the power set).
 *
 * The solution set must NOT contain duplicate subsets.
 * You may return the answer in any order.
 *
 * Example:
 *   nums = [1,2,2]
 *   Output:
 *   [
 *     [], [1], [2], [1,2], [2,2], [1,2,2]
 *   ]
 *
 * Approach: Backtracking + Sorting + Skip Duplicates
 * --------------------------------------------------
 * 1) Sort nums so duplicates are next to each other.
 * 2) At each recursion level (same "start"), if nums[i] equals nums[i-1],
 *    skip it (only when i > start). This prevents duplicate subsets.
 *
 * Time Complexity:
 * ---------------
 * O(n * 2^n)
 * - There are up to 2^n subsets.
 * - Copying each subset costs up to O(n) in the worst case.
 * Sorting adds O(n log n).
 *
 * Space Complexity:
 * ----------------
 * O(n) auxiliary recursion/path space (excluding output).
 */

var subsetsWithDup = function(nums) {
  nums.sort((a, b) => a - b); // group duplicates together

  const results = [];

  function backtrack(start, path) {
    // Every state is a valid subset
    results.push([...path]);

    for (let i = start; i < nums.length; i++) {
      // Skip duplicates at the same recursion depth
      // i > start ensures we only skip "siblings" duplicates, not deeper ones.
      if (i > start && nums[i] === nums[i - 1]) continue;

      // Choose
      path.push(nums[i]);

      // Explore
      backtrack(i + 1, path);

      // Undo (backtrack)
      path.pop();
    }
  }

  backtrack(0, []);
  return results;
};