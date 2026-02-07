/**
 * Problem Statement:
 * ------------------
 * Given an integer array `nums`, rotate the array to the right by `k` steps,
 * where `k` is non-negative.
 *
 * You must modify the array in-place (do not return a new array).
 *
 * Example 1:
 * Input:  nums = [1,2,3,4,5,6,7], k = 3
 * Output: [5,6,7,1,2,3,4]
 *
 * Example 2:
 * Input:  nums = [-1,-100,3,99], k = 2
 * Output: [3,99,-1,-100]
 *
 * Constraints:
 * - 1 <= nums.length <= 100000 (typical)
 * - 0 <= k <= 100000
 */

/**
 * Rotate array to the right by k steps using the "3-reversals" technique.
 *
 * Key Idea:
 * ---------
 * Right rotation by k means:
 *   [a0 a1 ... a(n-k-1) | a(n-k) ... a(n-1)]
 * becomes
 *   [a(n-k) ... a(n-1) | a0 a1 ... a(n-k-1)]
 *
 * We can do this in-place using 3 reversals:
 * 1) Reverse the whole array
 * 2) Reverse the first k elements
 * 3) Reverse the remaining n-k elements
 *
 * Time:  O(n)
 * Space: O(1)
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
function rotate(nums, k) {
  const n = nums.length;

  // If array has 0 or 1 element, rotating changes nothing
  if (n <= 1) return;

  // k can be larger than n, so reduce it using modulo
  // Example: rotating by n or 2n gives the same array
  k = k % n;

  // If k becomes 0 after modulo, no rotation needed
  if (k === 0) return;

  // Helper: reverse elements in nums from index left to right (inclusive)
  function reverse(left, right) {
    while (left < right) {
      // Swap nums[left] and nums[right]
      [nums[left], nums[right]] = [nums[right], nums[left]];
      left++;
      right--;
    }
  }

  // Step 1: Reverse the entire array
  // [1,2,3,4,5,6,7] -> [7,6,5,4,3,2,1]
  reverse(0, n - 1);

  // Step 2: Reverse the first k elements
  // If k=3: [7,6,5,4,3,2,1] -> reverse first 3 -> [5,6,7,4,3,2,1]
  reverse(0, k - 1);

  // Step 3: Reverse the remaining elements (from k to end)
  // [5,6,7,4,3,2,1] -> reverse from index 3 -> [5,6,7,1,2,3,4]
  reverse(k, n - 1);
}
