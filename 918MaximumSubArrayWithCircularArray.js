/**
 * Problem: Maximum Sum Circular Subarray
 * --------------------------------------
 * Given a circular integer array `nums` of length n, return the maximum possible sum of a
 * NON-EMPTY subarray of `nums`.
 *
 * Circular array means:
 * - After the last element, you can continue to the first element.
 *   next index of i is (i + 1) % n
 *
 * Valid subarray rules:
 * - Subarray must be CONTIGUOUS (continuous elements).
 * - You may use each element at most once (you cannot wrap around more than once).
 *
 * Example:
 *   nums = [5, -3, 5]
 *   Possible best circular subarray is [5 (end), 5 (start)] => 10
 *
 * ------------------------------------------------------------
 * Solution Approach (Layman + Correct Logic)
 * ------------------------------------------------------------
 * In a circular array, the best subarray can only be of TWO types:
 *
 * 1) Non-wrapping subarray (normal case)
 *    - This subarray is fully inside the array without crossing the end to the beginning.
 *    - We can find it using the classic Kadane's Algorithm (Maximum Subarray Sum).
 *    - Call it: maxKadane
 *
 * 2) Wrapping subarray (circular case)
 *    - This subarray goes from the end of the array and continues from the start.
 *    - Example: nums = [5, -3, 5]
 *      Wrapping best is [5 (last), 5 (first)]
 *
 *    Key insight:
 *    If a subarray wraps, it means we are taking:
 *      [some tail part] + [some head part]
 *    Which is equivalent to:
 *      "Take the whole array, BUT SKIP one contiguous middle chunk."
 *
 *    So instead of finding the wrapping subarray directly, we do this:
 *      wrappingMax = totalSum - (minimum subarray sum)
 *
 *    Why?
 *    - totalSum = sum of all elements
 *    - minimum subarray sum is the "worst chunk" we want to remove
 *    - removing the worst chunk leaves the biggest possible sum of the remaining elements,
 *      which forms the best wrapping subarray.
 *
 * ------------------------------------------------------------
 * IMPORTANT Edge Case: All numbers are negative
 * ------------------------------------------------------------
 * Example: nums = [-3, -2, -5]
 *
 * maxKadane = -2 (best non-empty subarray is just [-2])
 * totalSum = -10
 * minKadane = -10 (minimum subarray is the whole array)
 *
 * wrappingMax = totalSum - minKadane = -10 - (-10) = 0
 *
 * But 0 would mean "choose nothing", which is NOT allowed (subarray must be non-empty).
 *
 * So if maxKadane < 0, we return maxKadane directly.
 *
 * ------------------------------------------------------------
 * Final Answer:
 * ------------------------------------------------------------
 * If maxKadane < 0:
 *    return maxKadane
 * else:
 *    return max(maxKadane, totalSum - minKadane)
 *
 * ------------------------------------------------------------
 * Time Complexity:
 * ------------------------------------------------------------
 * We scan the array once and do constant work each step.
 *   Time  = O(n)
 *   Space = O(1)
 */

function maxSubarraySumCircular(nums) {
  // totalSum tracks sum of entire array
  let totalSum = 0;

  // Kadane for maximum subarray sum (non-wrapping best)
  // currentMax = best sum of a subarray that MUST end at current index
  // maxKadane  = best sum found anywhere so far
  let currentMax = nums[0];
  let maxKadane = nums[0];

  // Kadane-like for minimum subarray sum (to compute wrapping best)
  // currentMin = minimum sum of a subarray that MUST end at current index
  // minKadane  = minimum sum found anywhere so far
  let currentMin = nums[0];
  let minKadane = nums[0];

  // Iterate through array once
  for (let i = 0; i < nums.length; i++) {
    const x = nums[i];
    totalSum += x;

    // Skip Kadane update for i=0 because we already initialized with nums[0]
    if (i === 0) continue;

    /**
     * 1) Update maxKadane (normal maximum subarray)
     *
     * At index i, for max subarray ending at i:
     * - Either start fresh at nums[i]
     * - Or extend the previous best-ending subarray
     */
    currentMax = Math.max(x, currentMax + x);
    maxKadane = Math.max(maxKadane, currentMax);

    /**
     * 2) Update minKadane (minimum subarray)
     *
     * Same Kadane logic but reversed for minimum:
     * - Either start fresh at nums[i]
     * - Or extend the previous minimum-ending subarray
     */
    currentMin = Math.min(x, currentMin + x);
    minKadane = Math.min(minKadane, currentMin);
  }

  /**
   * Edge case: If maxKadane is negative, all numbers are negative.
   * Then the best non-empty subarray is simply the largest (least negative) number.
   * We must NOT use wrapping formula because it can produce 0 (invalid empty subarray).
   */
  if (maxKadane < 0) return maxKadane;

  /**
   * Wrapping best is:
   *   totalSum - minKadane
   * meaning:
   *   "take everything except the worst chunk"
   */
  const wrappingMax = totalSum - minKadane;

  // Best answer is max of non-wrapping and wrapping
  return Math.max(maxKadane, wrappingMax);
}