/**
 * Problem:
 * Given a sorted integer array arr, and integers k and x,
 * return the k closest integers to x in the array (sorted ascending).
 *
 * Rules:
 * - a is closer than b if |a-x| < |b-x|
 * - if equal distance, smaller value wins
 *
 * Approach: Binary search the starting index of a size-k window
 * - The answer is always a contiguous window of length k.
 * - Search start index in [0, n-k].
 *
 * Time:  O(log(n-k) + k)
 * Space: O(1) extra (excluding output)
 */
function findClosestElements(arr, k, x) {
  let left = 0;
  let right = arr.length - k; // last valid start index

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    // Compare the element leaving (arr[mid]) vs the element entering (arr[mid+k])
    // If arr[mid] is farther from x than arr[mid+k], shift window right.
    // Use '>' (not '>=') so ties prefer smaller values (stay left).
    if (x - arr[mid] > arr[mid + k] - x) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return arr.slice(left, left + k);
}

// Examples
console.log(findClosestElements([1,2,3,4,5], 4, 3));      // [1,2,3,4]
console.log(findClosestElements([1,1,2,3,4,5], 4, -1));   // [1,1,2,3]
console.log(findClosestElements([1,2,3,4,5,6], 3, 5));    // [4,5,6]
