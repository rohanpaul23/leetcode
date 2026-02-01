/**
 * ============================
 * Problem: Subarray Sum Equals K
 * ============================
 *
 * Given an integer array `nums` and an integer `k`,
 * return the total number of continuous subarrays whose sum equals `k`.
 *
 * A subarray is a contiguous part of the array.
 *
 * Example:
 * nums = [1, 1, 1], k = 2
 * Valid subarrays:
 *   [1, 1] (index 0 to 1)
 *   [1, 1] (index 1 to 2)
 * Output: 2
 *
 * --------------------------------
 * Key Idea (Prefix Sum + HashMap)
 * --------------------------------
 *
 * Let prefixSum[i] = sum of elements from index 0 to i.
 *
 * If we want a subarray sum to be exactly `k`,
 * then for two indices i and j (j < i):
 *
 *   prefixSum[i] - prefixSum[j] = k
 *   => prefixSum[j] = prefixSum[i] - k
 *
 * So while iterating, for the current prefix sum `total`,
 * we just need to know how many times `(total - k)`
 * has appeared before.
 *
 * We store frequencies of prefix sums in a Map.
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function(nums, k) {
  // `total` keeps track of the running prefix sum
  let total = 0;

  // `count` stores the number of valid subarrays found
  let count = 0;

  // Map to store prefixSum -> frequency
  const freq = new Map();

  // Base case:
  // A prefix sum of 0 occurs once (before processing any elements)
  // This allows subarrays starting from index 0 to be counted
  freq.set(0, 1);

  // Iterate through each number in the array
  for (const num of nums) {
    // Update the running prefix sum
    total += num;

    // We want: previousPrefixSum = total - k
    const need = total - k;

    // If `need` exists, it means there are subarrays
    // ending at the current index whose sum is k
    if (freq.has(need)) {
      count += freq.get(need);
    }

    // Record the current prefix sum in the map
    freq.set(total, (freq.get(total) || 0) + 1);
  }

  // Return the total count of valid subarrays
  return count;
};
