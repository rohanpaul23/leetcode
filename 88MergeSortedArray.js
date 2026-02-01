/**
 * =========================================
 * Problem: Merge Sorted Array (In-Place)
 * =========================================
 *
 * You are given two integer arrays:
 *   - nums1 of length (m + n)
 *   - nums2 of length n
 *
 * The first `m` elements of nums1 and the first `n` elements of nums2
 * are sorted in non-decreasing order.
 *
 * nums1 has extra space (filled with 0s) at the end to hold nums2.
 *
 * Your task:
 *   Merge nums2 into nums1 so that nums1 becomes a single
 *   sorted array in non-decreasing order.
 *
 * IMPORTANT:
 * - You must modify nums1 in-place
 * - You must NOT return anything
 *
 * Example:
 * nums1 = [1,2,3,0,0,0], m = 3
 * nums2 = [2,5,6],       n = 3
 *
 * Result:
 * nums1 becomes [1,2,2,3,5,6]
 *
 * -----------------------------------------
 * Key Insight (Three Pointers from the End)
 * -----------------------------------------
 *
 * Since nums1 already has extra space at the end,
 * we can safely merge from RIGHT → LEFT.
 *
 * Why from the end?
 * - If we merge from the start, we overwrite values in nums1
 * - From the end, the empty slots act as a buffer
 *
 * We use:
 *   i → last valid element of nums1 (m - 1)
 *   j → last element of nums2 (n - 1)
 *   k → last position of nums1 (m + n - 1)
 *
 * At each step:
 * - Place the larger of nums1[i] and nums2[j] at nums1[k]
 * - Move pointers accordingly
 *
 * Time Complexity: O(m + n)
 * Space Complexity: O(1)  (in-place)
 */

/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void}
 */
var merge = function(nums1, m, nums2, n) {
  // Pointer to the last valid element in nums1
  let i = m - 1;

  // Pointer to the last element in nums2
  let j = n - 1;

  // Pointer to the last position in nums1
  let k = m + n - 1;

  // Merge while both arrays still have elements
  while (i >= 0 && j >= 0) {
    // Place the larger element at the end
    if (nums1[i] > nums2[j]) {
      nums1[k] = nums1[i];
      i--;
    } else {
      nums1[k] = nums2[j];
      j--;
    }
    k--;
  }

  // If nums2 still has remaining elements,
  // copy them into nums1
  while (j >= 0) {
    nums1[k] = nums2[j];
    j--;
    k--;
  }

  // No need to copy remaining nums1 elements
  // because they are already in the correct position
};
