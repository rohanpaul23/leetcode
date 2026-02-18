/**
 * ------------------------------------------------------------
 * Problem: 4Sum
 * ------------------------------------------------------------
 * Given an integer array nums of length n and an integer target,
 * return all unique quadruplets [nums[a], nums[b], nums[c], nums[d]]
 * such that:
 *
 *  - 0 <= a, b, c, d < n
 *  - a, b, c, d are distinct indices
 *  - nums[a] + nums[b] + nums[c] + nums[d] == target
 *
 * The solution set must not contain duplicate quadruplets.
 *
 * Example:
 * Input:  nums = [1,0,-1,0,-2,2], target = 0
 * Output: [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
 *
 * ------------------------------------------------------------
 * Approach: Recursive k-Sum (Generalized Solution)
 * ------------------------------------------------------------
 *
 * Idea:
 * 4Sum can be reduced to 3Sum, which can be reduced to 2Sum.
 *
 * Instead of writing 3 nested loops manually,
 * we use recursion:
 *
 *   kSum(start, k, target)
 *
 * Meaning:
 *   "Find all unique combinations of k numbers starting
 *    from index `start` that sum to `target`."
 *
 * Base case:
 *   k === 2 → solve using Two Pointers (O(n))
 *
 * Recursive case:
 *   Pick one number nums[i]
 *   Recursively solve:
 *      kSum(i+1, k-1, target - nums[i])
 *
 * Why sorting?
 *  - Enables two pointer method for 2Sum
 *  - Allows easy duplicate skipping
 *
 * Time Complexity (4Sum):
 *   O(n³)
 *
 * Space Complexity:
 *   O(k) recursion depth (≈ constant for 4Sum)
 *   Output space excluded
 * ------------------------------------------------------------
 */

function fourSum(nums, target) {

  // Step 1: Sort the array
  // This allows two-pointer technique and duplicate skipping
  nums.sort((a, b) => a - b);

  /**
   * Recursive helper function
   *
   * @param {number} start  - index to start from
   * @param {number} k      - how many numbers we still need to pick
   * @param {number} target - remaining target sum
   *
   * @returns {number[][]}  - list of combinations of size k
   */
  function kSum(start, k, target) {
    const res = [];
    const n = nums.length;

    // ---------------------------------------------------------
    // BASE CASE: 2Sum
    // ---------------------------------------------------------
    // When k == 2, solve using two pointers in O(n)
    if (k === 2) {
      let left = start;
      let right = n - 1;

      while (left < right) {
        const sum = nums[left] + nums[right];

        if (sum < target) {
          left++;  // need bigger sum
        } else if (sum > target) {
          right--; // need smaller sum
        } else {
          // Found valid pair
          res.push([nums[left], nums[right]]);

          // Skip duplicates on left
          const leftVal = nums[left];
          while (left < right && nums[left] === leftVal) {
            left++;
          }

          // Skip duplicates on right
          const rightVal = nums[right];
          while (left < right && nums[right] === rightVal) {
            right--;
          }
        }
      }

      return res;
    }

    // ---------------------------------------------------------
    // RECURSIVE CASE (k > 2)
    // ---------------------------------------------------------

    /**
     * We need at least k numbers remaining.
     * So last valid i is n - k.
     */
    for (let i = start; i <= n - k; i++) {

      // Skip duplicates at this recursion level
      // Ensures uniqueness of combinations
      if (i > start && nums[i] === nums[i - 1]) continue;

      /**
       * Choose nums[i] as one element of the combination.
       * Now we must find k-1 numbers from the remaining array
       * that sum to (target - nums[i]).
       */
      const chosen = nums[i];

      // Recursive call
      const subsets = kSum(i + 1, k - 1, target - chosen);

      /**
       * Each subset is of size (k-1).
       * Prepend chosen element to form full k-length combination.
       */
      for (const subset of subsets) {
        res.push([chosen, ...subset]);
      }
    }

    return res;
  }

  // Start recursion for 4 numbers
  return kSum(0, 4, target);
}
