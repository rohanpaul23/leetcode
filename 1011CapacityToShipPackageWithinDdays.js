/**
 * ================================================================
 * 🧩 Problem: Capacity To Ship Packages Within D Days
 * ================================================================
 * You are given an array weights[], where weights[i] is the weight
 * of the i-th package on a conveyor belt (must be shipped in order).
 *
 * Each day, you load packages in the given order until adding the
 * next package would exceed the ship's maximum weight capacity.
 * Then the ship departs and you continue the next day.
 *
 * Return the minimum ship capacity needed to ship all packages
 * within exactly (or at most) `days` days.
 *
 * ------------------------------------------------
 * ✅ Key Insight:
 * - If capacity is too small → need more than `days` days.
 * - If capacity is large enough → can ship within `days` days.
 *
 * This "works / doesn't work" behavior is monotonic:
 *   capacity ↑  => required days ↓ (never increases)
 *
 * So we can binary search the minimum capacity.
 *
 * Bounds:
 * - Minimum possible capacity = max(weights)
 *   (must fit the heaviest single package)
 * - Maximum possible capacity = sum(weights)
 *   (ship everything in one day)
 *
 * Time:  O(n log(sum(weights)))
 * Space: O(1)
 * ================================================================
 */

/**
 * Helper: Given a capacity, compute how many days are needed
 * to ship all packages while preserving order.
 *
 * @param {number[]} weights
 * @param {number} cap
 * @return {number} daysNeeded
 */
function daysNeeded(weights, cap) {
  let days = 1;     // start shipping on day 1
  let load = 0;     // current day's loaded weight

  for (const w of weights) {
    // If adding this package exceeds capacity, start a new day
    if (load + w > cap) {
      days++;
      load = w;     // first package of the new day
    } else {
      load += w;    // keep loading on the same day
    }
  }

  return days;
}

/**
 * @param {number[]} weights
 * @param {number} days
 * @return {number}
 */
var shipWithinDays = function (weights, days) {
  // Compute search bounds: [maxWeight, totalWeight]
  let left = 0;   // will become max(weights)
  let right = 0;  // will become sum(weights)

  for (const w of weights) {
    left = Math.max(left, w);
    right += w;
  }

  // Binary search for the minimum capacity that can ship within `days`
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2); // candidate capacity
    const need = daysNeeded(weights, mid);

    if (need <= days) {
      // mid is sufficient (can ship within allowed days)
      // try smaller capacity
      right = mid - 1;
    } else {
      // mid is too small (needs more days than allowed)
      // try bigger capacity
      left = mid + 1;
    }
  }

  // left is the smallest capacity that works
  return left;
};
