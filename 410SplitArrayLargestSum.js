/**
 * Problem: Split Array Largest Sum
 * --------------------------------
 * Given an integer array `nums` and an integer `k`, split `nums` into `k` non-empty
 * contiguous subarrays such that the *largest* subarray sum is as small as possible.
 *
 * Return that minimized largest subarray sum.
 *
 * What “minimized” means:
 * - Every split into k parts produces k sums (one per subarray).
 * - We care about the maximum of those k sums (the “largest load”).
 * - We want the split where this maximum is as small as possible.
 *
 * Key Insight: Binary Search on the Answer (Value), not on indices
 * ---------------------------------------------------------------
 * This is an optimization problem (minimize a value). We convert it into a decision problem:
 *
 *   "If we guess the answer is X (meaning: no subarray is allowed to exceed sum X),
 *    is it possible to split the array into <= k subarrays?"
 *
 * Define:
 *   isPossible(X) = can we split nums into <= k pieces so that each piece sum <= X ?
 *
 * Why this enables Binary Search:
 * - As X increases, the constraint becomes looser (more capacity allowed per subarray).
 * - Therefore, isPossible(X) is monotonic:
 *     If isPossible(X) is true, then isPossible(X+1), isPossible(X+2), ... are also true.
 *   The truth pattern looks like:
 *     false false false true true true ...
 * - For monotonic predicates, we can binary search for the smallest X that returns true.
 *
 * Search space bounds:
 * - Lower bound = max(nums)
 *   Because at least one subarray must contain the largest element, so the answer can't
 *   be smaller than it.
 * - Upper bound = sum(nums)
 *   Because putting everything into one subarray yields that sum.
 *
 * Feasibility check (Greedy):
 * ---------------------------
 * To test isPossible(X), we greedily create subarrays from left to right:
 * - Keep adding elements to the current subarray as long as the sum stays <= X.
 * - If adding the next element would exceed X, we "cut" before it and start a new subarray.
 *
 * Why greedy is correct for feasibility:
 * - This greedy strategy makes each subarray as large as possible (without violating X),
 *   which minimizes the number of subarrays needed for that X.
 * - If even this minimal number of pieces exceeds k, then no other splitting can do it
 *   with <= k pieces (so X is too small).
 *
 * Time Complexity:
 * - Let n = nums.length, and S = sum(nums).
 * - Each feasibility check is O(n).
 * - Binary search performs O(log(S - max(nums))) iterations.
 * - Total: O(n * log(S))   (often written this way for simplicity)
 *
 * Space Complexity:
 * - O(1) extra space (ignoring input storage).
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @returns {number}
 */
function splitArray(nums, k) {
  // ----- 1) Establish binary search bounds -----

  // left = smallest possible answer (must be at least the max element)
  // right = largest possible answer (sum of all elements)
  let left = 0;
  let right = 0;

  for (const x of nums) {
    left = Math.max(left, x);
    right += x;
  }

  // ----- 2) Decision function: can we split with max subarray sum <= maxAllowed? -----
  function canSplit(maxAllowed) {
    let pieces = 1;     // we start building the first subarray
    let runningSum = 0; // current subarray sum

    for (const x of nums) {
      // If adding x would exceed the allowed maximum, we must start a new subarray.
      if (runningSum + x > maxAllowed) {
        pieces++;       // we've created one more subarray
        runningSum = x; // new subarray starts with x

        // If we need more than k subarrays, this maxAllowed is too small => not feasible.
        if (pieces > k) return false;
      } else {
        // Safe to add x to the current subarray without exceeding maxAllowed.
        runningSum += x;
      }
    }

    // If we used k or fewer subarrays, then it's feasible under this maxAllowed.
    return true;
  }

  // ----- 3) Binary search for the smallest maxAllowed that is feasible -----
  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (canSplit(mid)) {
      // mid works (feasible), so try smaller to minimize the largest sum
      right = mid;
    } else {
      // mid doesn't work (too small), must increase the allowed maximum
      left = mid + 1;
    }
  }

  // left == right is the minimum feasible maximum subarray sum
  return left;
}
