/**
 * Problem: Permutations
 * ---------------------
 * Given an array `nums` of distinct integers, return all possible permutations.
 * A permutation is an ordering of all elements where order matters.
 *
 * Example:
 *   nums = [1,2,3]
 *   Output (any order):
 *   [
 *     [1,2,3],[1,3,2],
 *     [2,1,3],[2,3,1],
 *     [3,1,2],[3,2,1]
 *   ]
 *
 * Approach: Backtracking (Build permutations)
 * -------------------------------------------
 * We build a permutation one position at a time.
 * At each step, we try every number that hasn't been used yet.
 *
 * Base Case:
 *   If path.length === nums.length → one full permutation formed.
 *
 * Choices:
 *   Pick any unused number.
 *
 * Constraint:
 *   Each number can be used exactly once per permutation.
 *
 * Backtrack Step:
 *   Undo the choice (remove last number + mark it unused) and try next.
 *
 * Time Complexity:
 * ----------------
 * O(n * n!)
 *
 * Explanation:
 * - There are n! permutations.
 * - Copying each permutation into results costs O(n).
 *
 * Space Complexity:
 * -----------------
 * O(n) auxiliary (recursion stack + used array), excluding output.
 */

var permute = function(nums) {
  const results = [];
  const used = new Array(nums.length).fill(false);

  function backtrack(path) {
    // Base case: full permutation built
    if (path.length === nums.length) {
      results.push([...path]); // copy current permutation
      return;
    }

    // Try every possible next element
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue; // skip numbers already in path

      // Choose
      used[i] = true;
      path.push(nums[i]);

      // Explore
      backtrack(path);

      // Undo (backtrack)
      path.pop();
      used[i] = false;
    }
  }

  backtrack([]);
  return results;
};
