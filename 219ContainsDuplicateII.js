/**
 * Problem:
 * Given an integer array nums and an integer k, return true if there exist
 * two distinct indices i and j such that:
 *   nums[i] === nums[j] AND |i - j| <= k
 *
 * Approach (HashMap / Map):
 * - Track the last index where each number was seen.
 * - When a number repeats, check the distance between current index and last seen index.
 * - If distance <= k, we found a valid nearby duplicate.
 *
 * Time:  O(n)   (single pass)
 * Space: O(n)   (map can store up to all distinct values)
 */
function containsNearbyDuplicate(nums, k) {
  // Map<number, number>  => value -> last index where it appeared
  const lastSeen = new Map();

  for (let i = 0; i < nums.length; i++) {
    const val = nums[i];

    // If we've seen this value before, check index distance
    if (lastSeen.has(val)) {
      const prevIndex = lastSeen.get(val);

      // Since i > prevIndex during left-to-right scan, |i - prevIndex| = i - prevIndex
      if (i - prevIndex <= k) {
        return true;
      }
    }

    // Update last seen index for this value to the current index
    lastSeen.set(val, i);
  }

  // No duplicate found within k distance
  return false;
}
