/**
 * Search in Rotated Sorted Array II (duplicates allowed)
 * Returns true if target exists, else false.
 *
 * Key idea:
 * - If we can determine a sorted half, use it like normal binary search.
 * - If nums[left] == nums[mid] == nums[right], it's ambiguous => shrink bounds.
 *
 * Worst-case time with many duplicates: O(n)
 * Average: close to O(log n)
 */
function search(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    if (nums[mid] === target) return true;

    // Ambiguous case: cannot decide which half is sorted
    if (nums[left] === nums[mid] && nums[mid] === nums[right]) {
      left++;
      right--;
      continue;
    }

    // Left half is sorted
    if (nums[left] <= nums[mid]) {
      // Target lies in sorted left half
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
    // Right half is sorted
    else {
      // Target lies in sorted right half
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }

  return false;
}
