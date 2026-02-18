/**
 * Problem: Median of Two Sorted Arrays (O(log(m+n)))
 * --------------------------------------------------
 * Given two sorted arrays nums1 and nums2 of size m and n,
 * return the median of the two sorted arrays.
 *
 * Approach: Binary Search on Partition (search on smaller array)
 * --------------------------------------------------------------
 * We choose a cut i in smaller array A, and j in larger array B such that:
 *   i + j = leftSize
 * where:
 *   leftSize = floor((m + n + 1) / 2)
 *
 * We want a valid partition:
 *   Aleft <= Bright  AND  Bleft <= Aright
 *
 * Where:
 *   Aleft  = (i==0) ? -Infinity : A[i-1]
 *   Aright = (i==m) ? +Infinity : A[i]
 *   Bleft  = (j==0) ? -Infinity : B[j-1]
 *   Bright = (j==n) ? +Infinity : B[j]
 *
 * Once valid:
 *   If total is odd:  median = max(Aleft, Bleft)
 *   If total is even: median = (max(Aleft,Bleft) + min(Aright,Bright)) / 2
 *
 * Time:  O(log(min(m,n)))
 * Space: O(1)
 */
function findMedianSortedArrays(nums1, nums2) {
  // Ensure nums1 is the smaller array for O(log(min(m,n)))
  let A = nums1;
  let B = nums2;
  if (A.length > B.length) {
    [A, B] = [B, A];
  }

  const m = A.length;
  const n = B.length;

  let lo = 0;
  let hi = m;

  // Left side should contain half the elements (and one extra if total is odd)
  const leftSize = Math.floor((m + n + 1) / 2);

  while (lo <= hi) {
    // i = number of elements from A in left partition
    const i = Math.floor((lo + hi) / 2);

    // j = number of elements from B in left partition
    const j = leftSize - i;

    // Border values around the partition
    const Aleft = (i === 0) ? -Infinity : A[i - 1];
    const Aright = (i === m) ? Infinity : A[i];

    const Bleft = (j === 0) ? -Infinity : B[j - 1];
    const Bright = (j === n) ? Infinity : B[j];

    // Check if partition is valid
    if (Aleft <= Bright && Bleft <= Aright) {
      const leftMax = Math.max(Aleft, Bleft);

      // Odd total length -> left side has the middle element
      if ((m + n) % 2 === 1) {
        return leftMax;
      }

      // Even total length -> average of two middle values
      const rightMin = Math.min(Aright, Bright);
      return (leftMax + rightMin) / 2;
    }

    // If Aleft is too big, move partition i left
    if (Aleft > Bright) {
      hi = i - 1;
    } else {
      // If Bleft is too big, move partition i right
      lo = i + 1;
    }
  }

  // Should never happen if inputs are sorted
  throw new Error("Invalid input: arrays must be sorted.");
}
