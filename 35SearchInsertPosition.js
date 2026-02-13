/**
 * Problem: Search Insert Position
 * --------------------------------
 * Given a sorted array of DISTINCT integers and a target value,
 * return the index if the target is found.
 *
 * If the target is NOT found, return the index where it would be
 * inserted in order.
 *
 * You must write an algorithm with O(log n) runtime complexity.
 *
 * Examples:
 *   nums = [1,3,5,6], target = 5  → 2
 *   nums = [1,3,5,6], target = 2  → 1
 *   nums = [1,3,5,6], target = 7  → 4
 *   nums = [1,3,5,6], target = 0  → 0
 *
 * Key Insight:
 * - Since the array is sorted and O(log n) is required,
 *   we must use Binary Search.
 *
 * Important Concept:
 * - Even if the target is not found,
 *   the `left` pointer will end up at the correct
 *   insertion index when the loop finishes.
 *
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */

function searchInsert(nums, target) {
  // Initialize two pointers representing the current search range
  let left = 0;
  let right = nums.length - 1;

  // Continue searching while the range is valid
  while (left <= right) {
    // Find middle index (avoid overflow in other languages)
    const mid = Math.floor((left + right) / 2);

    // Case 1: Target found
    if (nums[mid] === target) {
      return mid;
    }

    // Case 2: Target is greater → search right half
    else if (nums[mid] < target) {
      left = mid + 1;
    }

    // Case 3: Target is smaller → search left half
    else {
      right = mid - 1;
    }
  }

  /**
   * If loop exits, target was not found.
   *
   * At this point:
   * - left is positioned at the smallest index
   *   where target could be inserted while maintaining order.
   *
   * Why?
   * Because left always moves forward when nums[mid] < target.
   * So it stops exactly where target should go.
   */

  return left;
}

// Example tests
console.log(searchInsert([1,3,5,6], 5)); // 2
console.log(searchInsert([1,3,5,6], 2)); // 1
console.log(searchInsert([1,3,5,6], 7)); // 4
console.log(searchInsert([1,3,5,6], 0)); // 0
