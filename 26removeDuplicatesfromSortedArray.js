/**
 * Problem Statement:
 * ------------------
 * You are given an integer array `nums` sorted in non-decreasing order.
 * Your task is to remove the duplicates **in-place** such that each unique
 * element appears only once.
 *
 * After removing duplicates:
 * - Return the number of unique elements `k`
 * - The first `k` elements of `nums` must contain all the unique elements
 * - The order of elements must remain unchanged
 * - Elements beyond index `k - 1` do not matter
 *
 * Constraints:
 * - 1 <= nums.length <= 30,000
 * - -100 <= nums[i] <= 100
 * - `nums` is sorted in non-decreasing order
 *
 * Example:
 * Input:  nums = [1, 1, 2, 3, 4]
 * Output: k = 4, nums = [1, 2, 3, 4, ...]
 */

/**
 * Removes duplicates from a sorted array in-place.
 *
 * @param {number[]} nums - Sorted input array
 * @return {number} k - Number of unique elements
 */
function removeDuplicates(nums) {
  // Edge case: if array is empty, no unique elements
  if (nums.length === 0) return 0;

  /**
   * `write` pointer represents the index where the next
   * unique element should be placed.
   *
   * The first element is always unique, so we start from index 1.
   */
  let write = 1;

  /**
   * `i` is the read pointer that scans the array
   * starting from the second element.
   */
  for (let i = 1; i < nums.length; i++) {
    /**
     * Since the array is sorted:
     * - If nums[i] === nums[i - 1], it's a duplicate → skip it
     * - If nums[i] !== nums[i - 1], it's a new unique element
     */
    if (nums[i] !== nums[i - 1]) {
      // Place the unique element at the `write` position
      nums[write] = nums[i];

      // Move write pointer forward for the next unique element
      write++;
    }
  }

  /**
   * At this point:
   * - The first `write` elements in `nums` are unique
   * - `write` itself represents the count of unique elements
   */
  return write;
}
