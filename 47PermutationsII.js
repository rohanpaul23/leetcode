/**
 * Problem: Permutations II (Unique Permutations with Duplicates)
 * --------------------------------------------------------------
 * Given an array nums that may contain duplicates, return all possible
 * unique permutations in any order.
 *
 * Approach: Backtracking + Sorting + Used[] + Duplicate-Skip Rule
 * ---------------------------------------------------------------
 * - Sort nums to bring duplicates together.
 * - At each position, try picking any unused index i.
 * - Skip duplicates:
 *     If nums[i] == nums[i-1] AND nums[i-1] is NOT used in the current path,
 *     then choosing nums[i] now would produce a duplicate permutation.
 *
 * Time Complexity:
 * ---------------
 * O(n * n!) in worst case (all distinct) because there are n! permutations
 * and copying each permutation costs O(n).
 * With duplicates, the number of unique permutations is smaller, but worst-case remains.
 *
 * Space Complexity:
 * -----------------
 * O(n) auxiliary for recursion depth + used[] (excluding output).
 */

var permuteUnique = function(nums) {
  nums.sort((a, b) => a - b);

  const results = [];
  const used = new Array(nums.length).fill(false);

  function backtrack(path) {
    // Base case: full permutation built
    if (path.length === nums.length) {
      results.push([...path]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      // Can't reuse same index in one permutation
      if (used[i]) continue;

      // Duplicate-skip rule (prevents generating the same permutation multiple times)
      // Only allow nums[i] if:
      // - it's not a duplicate, OR
      // - the previous identical number is already used in this path
      if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) continue;

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