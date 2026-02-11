/**
 * Problem: Minimum Size Subarray Sum (LeetCode 209)
 *
 * Given an array of POSITIVE integers `nums` and a POSITIVE integer `target`,
 * return the minimal length of a CONTIGUOUS subarray of which the sum is
 * greater than or equal to `target`.
 *
 * If there is no such subarray, return 0.
 *
 * Important:
 * - "Subarray" means contiguous (elements must be next to each other in the original order).
 * - Because of contiguity, we must NOT sort the array.
 *
 * Example:
 * target = 7, nums = [2,3,1,2,4,3]
 * Output: 2
 * Explanation: [4,3] is a contiguous subarray with sum = 7 and length = 2 (minimum).
 *
 * Approach: Sliding Window (Two Pointers)
 *
 * Why it works:
 * - All numbers are positive, so:
 *   - Expanding the window (move `right`) always increases or keeps `sum` increasing.
 *   - Shrinking the window (move `left`) always decreases `sum`.
 *
 * Algorithm:
 * 1. Use two pointers: `left` (start of window) and `right` (end of window).
 * 2. Expand `right` and add nums[right] to `sum`.
 * 3. While `sum >= target`, update answer with window length (right - left + 1),
 *    then shrink from the left (subtract nums[left], left++) to try to minimize length.
 *
 * Time Complexity: O(n)  (each element enters/leaves the window at most once)
 * Space Complexity: O(1)
 */
var minSubArrayLen = function (target, nums) {
  let left = 0;          // start of the sliding window
  let sum = 0;           // sum of current window nums[left..right]
  let res = Infinity;    // best (minimum) length found so far

  // `right` expands the window one element at a time
  for (let right = 0; right < nums.length; right++) {
    sum += nums[right]; // include nums[right] in the window

    // If window sum is enough, try shrinking from the left
    while (sum >= target) {
      // Update answer with current valid window size
      res = Math.min(res, right - left + 1);

      // Shrink the window from the left to see if we can get a smaller valid window
      sum -= nums[left];
      left++;
    }
  }

  // If res never updated, no valid subarray was found
  return res === Infinity ? 0 : res;
};
